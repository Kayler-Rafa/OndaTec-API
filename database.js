require('dotenv').config()
const mongoose = require("mongoose");
const uri = "mongodb+srv://rafael:batata@cluster0.yvctm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {})
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB', err);
    });

module.exports = mongoose;
