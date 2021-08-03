import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
//import sequelize from 'sequelize';
//import expressLayouts from 'express-ejs-layouts';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./db/models/User";
import {router} from "./routes/index"; //imports ./routes/index module here, in app.js



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//app.use(expressLayouts);

app.get('/', (req, res) => {
  res.render('layout');
});

// app.get('/a', (req, res) => {
//   res.render('forgotpassword');
// });

app.use('/practice', router);

// app.get('/forgotpassword', (req, res) => {
//   res.render('forgotpassword');
// });

app.post('/myaction', function(req, res) {
  // var userName1 = req.body.username;
  // var password1 = req.body.password;
  res.send('You sent the username "' + req.body.username + '" and password "' + req.body.password + '" ');
  createConnection().then(async connection => {               //<--------------

    console.log("Inserting a new user into the database..."); //<-------------
    const user = new User();                                  //<-------------
    user.userName = req.body.username;                                //<-------------
    user.password = req.body.password;                                    //<-------------
    // user.age = 28;                                            //<-------------
    await connection.manager.save(user);                      //<-------------
    console.log("Saved a new user with id: " + user.id);      //<-------------
  
    console.log("Loading users from the database...");         //<-------------
    const users = await connection.manager.find(User);        //<-------------
    console.log("Loaded users: ", users);                     //<-------------
  
    console.log("Here you can setup and run express/koa/any other framework.");//<-------------
    connection.close();
  }).catch(error => console.log(error));
});

app.post('/myaction1', function(req, res) {
  var userName1 = req.body.username1;
  // var password1 = req.body.password;
  res.send('You sent the username "' + req.body.username1 + '" new password "' + req.body.newPassword + '" and confirm new password as "' + req.body.confirmNewPassword + '" .If, both passwords entered are same only then the password will be reseted successfully, if not the password reset is failed');
  createConnection().then(async connection => {               //<--------------

    console.log("Updating or adding a new user into the database..."); //<-------------
    const user = new User();                                  //<-------------
    let userNamedb = await user.findOne({
      plain: true, //ignores any extra information returned by Sequelize ORM
      where: {
        userName: userName1
      }
    });
    if( req.body.newPassword == req.body.confirmNewPassword){
    user.userName = req.body.username1;                                //<-------------
    user.password = req.body.newPassword;                                    //<-------------
    // user.age = 28;                                            //<-------------
    await connection.manager.save(user);                      //<-------------
    }
    else{
      console.log('The new password does not match with the confirm new password ');
    }

    //console.log("Saved a new user with id: " + user.id);      //<-------------
  
    console.log("Loading users from the database...");         //<-------------
    const users = await connection.manager.find(User);        //<-------------
    console.log("Loaded users: ", users);                     //<-------------
  
    console.log("Here you can setup and run express/koa/any other framework.");//<-------------
    connection.close();
  }).catch(error => console.log(error));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// createConnection().then(async connection => {               //<--------------

//   console.log("Inserting a new user into the database..."); //<-------------
//   const user = new User();                                  //<-------------
//   user.userName = ;                                //<-------------
//   user.password = ;                                    //<-------------
//   // user.age = 28;                                            //<-------------
//   await connection.manager.save(user);                      //<-------------
//   console.log("Saved a new user with id: " + user.id);      //<-------------

//   console.log("Loading users from the database...");         //<-------------
//   const users = await connection.manager.find(User);        //<-------------
//   console.log("Loaded users: ", users);                     //<-------------

//   console.log("Here you can setup and run express/koa/any other framework.");//<-------------
//   connection.close();
// }).catch(error => console.log(error));    //<-------------
