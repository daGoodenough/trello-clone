require("dotenv").config();
const router = require("express").Router();
const passportService = require("../services/passport");
const passport = require("passport");
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// const generateFakeData = require('')//import funciton from somewhere

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleRedirect = passport.authenticate("google", {
  successRedirect: "http://localhost:3000/",
  failureRedirect: "http://localhost:3000/login",
});

// router.get("/generate-fake-data", generateFakeData);
//   ///Populates DataBase with sample data

router.get("/auth/google", googleAuth);
//sign a user in.

router.get("/oauth2/redirect/google", googleRedirect);

router.get("/api/user/:userId", async (req, res) => {
  const org = await prisma.user.findFirst({
    where: { id: req.params.userId },
    include: {
      org: { include: { boards: true } },
    },
  });
  res.json(org);
});
// check for session then return all boards of user
// should also return org info... or seperate route?

//returns a user based on userId with an "org" property with a list of "boards"

router.post("/api/user/:userId", async (req, res) => {
  const board = await prisma.board.create({
    title: req.body.title,
    Organization: { connect: { id: "d147c263-ec28-4af9-b3f6-38f905bd2a5b" } },
  });
  res.json(board);
});
// add a board to org associated with user

router.get("/api/boards/:boardId", async (req, res) => {
  const board = await prisma.board.findFirst({
    where: { id: req.params.boardId },
    include: {
      lists: {
        include: { cards: { include: { comments: true } } },
      },
    }
});
  res.json(board);
});
//get all the lists of a certain board (lists should contain cards title and id)

//returns a board based on url param with an array of "lists", where each list has an array of "cards"

router.post("/api/boards/:boardId", async (req, res) => {
  const list = await prisma.lists.create({
    data: {
      descibtion: req.body.descibtion,
      Board: { connect: { id: req.params.boardId } },
    },
  });
  res.json(list);
});
//add a list to a board

router.delete("/api/boards/:boardId", async (req, res) => {
  const board = await prisma.board.delete({
    where: { id: req.params.boardId },
  });
  res.json(board);
});
//delete board (should be removed from the org its associated with as well)

router.get("/api/cards/:cardId", async (req, res) => {
  const card = await prisma.card.findFirst({
    where: { id: req.params.cardId },
    include: { comments: true },
  });
  res.json(card);
});
//returns a card with an array of "comments"

router.post("/api/lists/:listId");
///post a card to a list

router.post("/api/cards/:cardId");
///create a new comment for card with id

router.put("/api/cards/:cardId");
//update title, description, and labels

router.delete("/api/cards/:cardId");
///delete comment for card with id

module.exports = router;
