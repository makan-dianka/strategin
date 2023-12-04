var express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/User')
var router = express.Router()


let SECRET = "secret"

let options = { 
  expiresIn: 60*60*60, 
  algorithm : 'HS256'
}



// HTTP GET METHOD, page html pour s'authentifié
router.get('/', (req, res) => {
    res.render('login');
  });


// HTTP POST METHOD, authentifié l'utilisateur et assigner un token
router.post("/", async (req, res) => {
    try {
        //   vérifier si l'utilisateur existe
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // comparer le mot de passe saisi et celui dans la db
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // assigner un token
                const token = await jwt.sign({ email: user.email }, SECRET);
                res.json({ token });
              } else {
                res.status(400).json({ error: "Mot de passe incorrect" });
              }
        } else {
            res.status(400).json({ error: "Cette adresse email n'existe pas" });
        }
    } catch (error) {
      res.status(400).json({ error });
    }
  });


module.exports = router