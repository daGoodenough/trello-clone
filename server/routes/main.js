const router = require("express").Router();


router.get("/generate-fake-data", (req, res) => {
///Populates DataBase with sample data
});

router.get("/boards", (req, res) => { 
  ///return all boards
})

router.post("/boards", (req, res) => { 
  ///Check for session, create a new board
})

router.delete("/boards", (req, res) => {
  ///Check for session, delete board
});

router.get("/boards/:boardId", (req, res) => { 
  ///return all lists of board with id 
})

router.post("/boards/:boardId", (req, res) => {
  ///Check for session, create a new list item for board with id
})

router.post("/boards/:boardId", (req, res) => {
  ///Check for session, create a new list item for board with id
});

router.delete("/boards/:boardId", (req, res) => {
  ///Check for session, delete list item for board with id
});

router.get("/boards/:boardId/cards/:cardId", (req, res) => { 
  ///return all comments for card with id 
})

router.post("/boards/:boardId/cards", (req, res) => {
  ///Check for session, create a new card item for new list item in board with id
});

router.post("/boards/:boardId/cards/:cardId", (req, res) => {
  ///Check for session, create a new comment for card with id
});

router.delete("/boards/:boardId/:cardId", (req, res) => {
  ///Check for session, delete comment for card with id
});

