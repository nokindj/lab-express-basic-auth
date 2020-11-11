const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
  });

router.post("/signup", (req, res) => {
    const {username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    if(username === "" || password === "") { // Front-end validations, this is for requirement of username and password
        res.render("auth/signup", {errorMessage: "Indicate username and password"})
      }
      User.findOne({"username": username})
      .then((user) => {
        if(user){ // user !== undefined
          res.render("auth/signup", {
            errorMessage: "The username already exists"
          });
          return;
        }
        User.create({ username, password: hashPassword})
        .then(() => {
          res.redirect("/");
        })
      })
      .catch((error) => {
        if(error.code === 11000) {
          res.render("auth/signup", {
            errorMessage: "Username and email needs to be unique"
          })
        }
      })
})

router.get("/login", (req, res) => {
  res.render("auth/login")
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both username and password"
    });
    return; // o return aqui pára a função se o if statement for verificado.
            // se o if for verificado ele continua e segue para a função de baixo 
            // neste caso é o User.findOne()
  }
  User.findOne({"username": username})
  .then((user) => {
    if(!user) {
      res.render("auth/login", {
        errorMessage: "Invalid login"
      }) // user doesnt exist in the mongoDB
      return;
    }
    if (bcrypt.compareSync(password, user.password)) { // the user.password is the text written in the input form and its comparing to the password chosen by the user.
      // Logged in sucessfully
      req.session.currentUser = user; // this is for implementing the sessions if Im logged in 
      res.redirect("/")
     // res.render("index", {user});

    } else {
      // Passwords don't match
      res.render("auth/login", {
        errorMessage: "Invalid login"
      })
    }
  })
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})


  module.exports = router;