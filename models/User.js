const mongoose = require('mongoose')
const schema = mongoose.Schema

mongoose.connect('mongodb://root:root@192.168.64.2:27017')
.then(()=>{
  console.log('Connexion établie')
})
.catch(() =>{
  console.log('Connexion echoué')
})


const STRATEGIN = new schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('user', STRATEGIN)
module.exports = User