var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router()

// HTTP GET METHOD, page html pour s'inscrire
router.get('/', async (req, res) => {
    if (req.headers.authorization){
        let authToken = req.headers.authorization.split(" ")[1]
        const checkToken = jwt.verify(authToken, 'secret', (err, tokenValide) =>{
            if(err){
                console.log("Votre Token n'est pas valide")
            }else
            console.log('Token est valide')
        });
        res.json({ 'user' : 'makan', 'mdp':'1234' });
        console.log(checkToken)

    }else{
        res.json({'TokenError' : "Token non fourni. Si vous n'avez pas un token, connectez-vous pour obtenir un. chemin de connexion  /login"})
    }
  });


module.exports = router