require("dotenv").config();
const router = require("express").Router();
const passportService = require("../services/passport");
const passport = require("passport");
const Authentication = require('../controllers/authentication');
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// const generateFakeData = require('')//import funciton from somewhere

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate('jwt', { session: false})

router.post('/auth/login', requireSignin, Authentication.signin);
router.get('/auth/current_user', requireAuth, async (req, res) => {
  res.send({name: req.user.name, email: req.user.email});
})

router.get("/api/user/:userId", async (req, res) => {
  const org = await prisma.user.findFirst({
    where: { id: req.params.userId },
    include: {
      org: { include: { boards: true } },
    },
  });
  res.json(org);
});
//GET a user based on userId with an "org" property with a list of "boards"

router.post("/api/user/:userId", async (req, res) => {
  const board = await prisma.board.create({
    data: {
      title: req.body.title,
      Organization: { connect: { id: "d147c263-ec28-4af9-b3f6-38f905bd2a5b" } },
    },
  });
  res.json(board);
});
//ADD a board to org associated with user

router.get("/api/boards/:boardId", async (req, res) => {
  const board = await prisma.board.findFirst({
    where: { id: req.params.boardId },
    include: {
      lists: {
        include: { cards: { include: { comments: true } } },
      },
    },
  });
  res.json(board);
});
//GET a board based on url param with an array of "lists", where each list has an array of "cards"

router.put("/api/boards/:boardId", async (req, res) => {
  const board = await prisma.board.update({
    where: { id: req.params.boardId },
    data: req.body,
  });
  res.json(board);
});
//UPDATE a board

router.post("/api/boards/:boardId", async (req, res) => {
  const list = await prisma.list.create({
    data: {
      description: req.body.description,
      Board: { connect: { id: req.params.boardId } },
    },
  });
  res.json(list);
});
//ADD a list to a board

router.delete("/api/boards/:boardId", async (req, res) => {
  const board = await prisma.board.delete({
    where: { id: req.params.boardId },
  });
  res.json(board);
});
//DELETE board (should be removed from the org its associated with as well)

// router.put("/api/boards/:boardId", async (req, res) => {
//   const lists = await prisma.list.updateMany({
//     where: {
//       boardId: req.params .boardId
//     },
//     data:
//   })
//   res.json(lists)
// })

router.post("/api/lists/:listId", async (req, res) => {
  const card = await prisma.card.create({
    data: {
      title: req.body.title,
      List: {
        connect: { id: req.params.listId },
      },
    },
  });
  res.json(card);
});
///ADD a card to a list

router.put("/api/lists/:listId", async (req, res) => {
  const list = await prisma.list.update({
    where: { id: req.params.listId },
    data: req.body,
  });
  res.json(list);
});
//UPDATE a list

router.delete("/api/lists/:listId", async (req, res) => {
  const list = await prisma.list.delete({
    where: { id: req.params.listId },
  });
  res.json(list);
});
//DELETE list

router.get("/api/cards/:cardId", async (req, res) => {
  const card = await prisma.card.findFirst({
    where: { id: req.params.cardId },
    include: { comments: true},
  });
  res.json(card);
});
//GET a card with an array of "comments"

router.put("/api/cards/:cardId", async (req, res) => {
  const card = await prisma.card.update({
    where: { id: req.params.cardId },
    data: req.body,
  });
  res.json(card);
});
//UPDATE a Card

router.delete("/api/cards/:cardId", async (req, res) => {
  const list = await prisma.card.delete({
    where: { id: req.params.cardId },
  });
  res.json(list);
});
//DELETE card

router.post("/api/cards/:cardId", async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      text: req.body.text,
      user: { connect: { id: req.body.userId } },
      Card: { connect: { id: req.params.cardId } },
    },
  });
  res.json(comment);
});
///create a new comment for card with id

router.put("/api/comments/:commentId", async (req, res) => {
  const comment = await prisma.comment.update({
    where: { id: req.params.commentId },
    data: req.body,
  });
  res.json(comment);
});
//UPDATE a comment with id

router.delete("/api/comments/:commentId", async (req, res) => {
  const comment = await prisma.comment.delete({
    where: { id: req.params.commentId },
  });
  res.json(comment);
});
//DELETE a comment with id

module.exports = router;
