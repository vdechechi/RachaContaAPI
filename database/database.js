const mysql = require("mysql");

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '123456',
    database: "racha_conta"
})

module.exports = connection;