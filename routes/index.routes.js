const express = require('express');
const router = express.Router();

function requireLogin(req, res, next) {
    if(req.session.currentUser) {
      next(); // allow the next route to run
    } else {
      res.redirect("/login");
    }
  }

/* GET home page */
router.get('/', (req, res, next) => {
     res.render('index', {user: req.session.currentUser});
   });

router.get("/private", requireLogin, (req, res) => {
    res.render("private"); // the requireLogin is to access the private page but I have to be logged in.
  });

module.exports = router;
