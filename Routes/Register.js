var express = require('express');
const bcrypt = require("bcrypt");

var user = require('../models/User')
var router = express.Router()


// HTTP GET METHOD, page html pour s'inscrire
router.get('/', (req, res) => {
    res.render('register');
  });


// HTTP  POST METHOD, inscription de l'utilisateur
router.post('/', async (req, res) => {
    let email = req.body.email
    let password1 = req.body.password1
    let password2 = req.body.password2

    try {
        // vérifier si email existe déjà 
        const userExist = await user.findOne({ email: email });
        if (userExist){
            return res
            .status(422)
            .json({ error: "Cette adresse email existe déjà" });
        }

        // vérifier si les 2 mot de passe sont identique
        if (password1 !== password2){
            return res
            .status(422)
            .json({ error: "Les mot de passe ne sont pas identique" });
        }

        // finalement hashé le mdp et enregistrer l'utilisateur
        pwdHash = await bcrypt.hash(req.body.password1, 10);
        const data = {email: email, password: pwdHash}
        let userRegister = await user.insertMany([data])
        if (userRegister){
            res.status(201).json({ message: "Vous êtes inscrit, connectez-vous à /login pour obtenir un token" });
        }

    } catch (err) {
        console.log(err);
        }
});


module.exports = router