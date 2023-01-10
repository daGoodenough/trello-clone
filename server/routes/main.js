const router = require("express").Router();
const generateFakeData = require('')//import funciton from somewhere

router.get("/generate-fake-data", generateFakeData);
///Populates DataBase with sample data

//auth routes VVVVVVVV

router.post('auth/signin', requireSignin, Authentication.signin)
//sign a user in

// router.post('auth/signup', Authentication.signup)
// //sign a user up and register them in the database

// router.get('auth/current_user', requireAuth)
// //get info about current user


//user routes VVVVVVVV

router.get('user/:userId/boards', requireAuth, );
// check for session then return all boards of user

router.post('/user/:userId', requireAuth, );
// check for session then add a board


// board routes VVVV
router.get('/boards/:boardId', requireAuth, );
//get all the lists of a certain board (lists should contain cards)

router.post('/boards/:boardId', requrieAuth, );
//add a list to a board

router.delete('/boards/:boardId', requireAuth, );
//delete board (should be removed from the org its associated with as well)

router.post('/lists/:boardId', requireAuth, );
// add a list to a board

router.get('/boards/:boardId/cards/:cardId', requireAuth,);
//get all metadata for card (comments, title, )

// // these three I think should have some concept of what list they are posting to VVV

// router.post("/boards/:boardId/cards", requireAuth, );
//   ///Check for session, create a new card item for new list item in board with id

// router.post("/boards/:boardId/cards/:cardId", requireAuth);
//   ///Check for session, create a new comment for card with id

// router.delete("/boards/:boardId/:cardId", requrieAuth, );
//   ///Check for session, delete comment for card with id

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

router.post("/boards/:boardId/cards", (req, res) => {
  ///Check for session, create a new card item for new list item in board with id
});

router.post("/boards/:boardId/cards/:cardId", (req, res) => {
  ///Check for session, create a new comment for card with id
});

router.delete("/boards/:boardId/:cardId", (req, res) => {
  ///Check for session, delete comment for card with id
});

module.exports = function(app) {
  app.get("/generate-fake-data", generateFakeData);
    ///Populates DataBase with sample data
  app.get("/orgs/:orgId/boards", requireAuth, Organizations.getBoards);
      ///return all boards of an organization
    
    app.post("/boards", (req, res) => { 
      ///Check for session, create a new board
    })
    
    app.delete("/boards", (req, res) => {
      ///Check for session, delete board
    });
    
    app.get("/boards/:boardId", (req, res) => { 
      ///return all lists of board with id 
    })
    
    app.post("/boards/:boardId", (req, res) => {
      ///Check for session, create a new list item for board with id
    })
    
    app.post("/boards/:boardId", (req, res) => {
      ///Check for session, create a new list item for board with id
    });
    
    app.delete("/boards/:boardId", (req, res) => {
      ///Check for session, delete list item for board with id
    });
    
    app.get("/boards/:boardId/cards/:cardId", (req, res) => { 
      ///return all comments for card with id 
    })
    
    app.post("/boards/:boardId/cards", (req, res) => {
      ///Check for session, create a new card item for new list item in board with id
    });
    
    app.post("/boards/:boardId/cards/:cardId", (req, res) => {
      ///Check for session, create a new comment for card with id
    });
    
    app.delete("/boards/:boardId/:cardId", (req, res) => {
      ///Check for session, delete comment for card with id
    });
}