const PrismaClient = require("@prisma/client").PrismaClient;;
const router = require("express").Router();
// const generateFakeData = require(""); //import funciton from somewhere
const prisma = new PrismaClient();

router.post("/auth/signin");
//sign a user in.




router.get("/api/user/:userId", async (req, res) => {
  const org = await prisma.user.findFirst({where: {id: req.params.userId},
    include: {
      org: { include: { boards: true } }
    }
})
  res.json(org)
});
// check for session then return all boards of user
// should also return org info... or seperate route?

//returns a user based on userId with an "org" property with a list of "boards"



router.post("/api/user/:userId");
// add a board to org associated with user





router.get("/api/boards/:boardId", async (req, res) => { 
  const board = await prisma.board.findFirst({
    where: { id: req.params.boardId },
    include: {
      lists: {include: {cards: true}},
    }, 
  })
  res.json(board)
});
//get all the lists of a certain board (lists should contain cards title and id)

//returns a board based on url param with an array of "lists", where each list has an array of "cards"




router.post("/api/boards/:boardId");
//add a list to a board

router.delete("/api/boards/:boardId");
//delete board (should be removed from the org its associated with as well)





router.get("/api/cards/:cardId", async (req, res) => {
  const card = await prisma.card.findFirst({
    where: { id: req.params.cardId }, include: {comments: true}
  });
  res.json(card)
})
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

// router.get("/boards", (req, res) => {
//   ///return all boards
// })

// router.post("/boards", (req, res) => {
//   ///Check for session, create a new board
// })

// router.delete("/boards", (req, res) => {
//   ///Check for session, delete board
// });

// router.get("/boards/:boardId", (req, res) => {
//   ///return all lists of board with id
// })

// router.post("/boards/:boardId", (req, res) => {
//   ///Check for session, create a new list item for board with id
// })

// router.post("/boards/:boardId", (req, res) => {
//   ///Check for session, create a new list item for board with id
// });

// router.delete("/boards/:boardId", (req, res) => {
//   ///Check for session, delete list item for board with id
// });

// router.get("/boards/:boardId/cards/:cardId", (req, res) => {
//   ///return all comments for card with id
// })

// router.post("/boards/:boardId/cards", (req, res) => {
//   ///Check for session, create a new card item for new list item in board with id
// });

// router.post("/boards/:boardId/cards/:cardId", (req, res) => {
//   ///Check for session, create a new comment for card with id
// });

// router.delete("/boards/:boardId/:cardId", (req, res) => {
//   ///Check for session, delete comment for card with id
// });
