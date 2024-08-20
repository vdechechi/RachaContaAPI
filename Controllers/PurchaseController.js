

var connection = require("../database/database");

class PurchaseController {

    async consulta_compra(req, res) {

        var sql = "select * from compra"

        await connection.query(sql, (err, result) => {

            if (err) {
                console.log(err)
                res.json(err).status(400)
            }
            else {
                res.json(result).status(200)
            }
        })
    }


    async cria_compra(req, res) {
        var body = req.body;

        var sql = `insert into compra(id_evento, descricao, valor) values (${body.id_evento}, '${body.descricao}', ${body.valor})`

        await connection.query(sql, (err) => {
            if (err) {
                console.log(err)
                res.json(err).status(400)
            }
            else {
                res.send("Compra criada com sucesso").status(200)
            }
        })
    }


    async altera_compra(req, res) {

        var body = req.body;

        var sql = `UPDATE compra set descricao = '${body.descricao}', valor = ${body.valor} where id = ${body.id};`

        connection.query(sql, (err) => {
            if (err) {
                console.log(err)
                res.json(err).status(200)
            }
            res.send("Compra alterada com sucesso").status(200)
        })
    }

    async deleta_compra(req, res) {
        var params = req.params
        var sql = `delete from compra where id = ${params.id}`

        connection.query(sql, (err) => {
            if (err) {
                console.log(err)
                res.json(err).status(400)
            }
            else {
                res.send("Compra deletada com sucesso").status(200)
            }
        })
    }



}

module.exports = new PurchaseController()