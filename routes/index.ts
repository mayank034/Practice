import express from "express";
var router = express.Router();
// import { deleteUser } from "../controllers/userController";


/* GET home page. */
router.get('/forgotpassword', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('forgotpassword');
});

// router.put('/delete:id', deleteUser
//   //function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   //res.send("hello");
// );

export {router};
