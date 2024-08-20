var bodyParser = require('body-parser')
var express = require("express")
var router = require("./routes/routes")
var cors = require('cors')
var connection = require("./database/database")
const app = express();


connection.connect ((err)=> {
    if (err) {
        console.error('Erro ao conectar banco de dados');
        return;
    }
    console.log("Conexão com banco de dados feita com sucesso");
});


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/", router);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});

