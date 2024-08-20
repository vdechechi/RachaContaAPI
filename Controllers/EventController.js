const SqlString = require("mysql/lib/protocol/SqlString");
var connection = require("../database/database");

class EventController {

    async consulta_evento(req, res) {

        connection.query("SELECT * FROM EVENTO", (err, result) => {

            if (err) {
                console.error('Erro na consulta: ', err);
                res.status(500).json({ "Mensagem": "Erro interno do servidor" })
            } else {
                res.json(result).status(200);
            }
        });
    }

    async cria_evento(req, res) {

        var body = req.body;

        var sql = `insert into evento (title, data_inicial, data_final, valor_total, dias) values ('${body.title}', '${body.data_inicial}', '${body.data_final}', 0, ${body.dias})`;

        await connection.query(sql, (err) => {

            if (err) {
                console.log(err);
                res.json({ "Erro": err }).status(400)

            } else {
                res.json({ "Mensagem": "Evento criado com sucesso" }).status(200)
            }
        })
    }

    async consulta_eventoId(req, res) {
        var id = req.params.id

        var sql = `select * from evento where id = ${id}`

        await connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                res.json(err).status(400)
            } else {
                res.json(result).status(200)
            }
        })
    }

    async altera_evento(req, res) {

        var body = req.body;

        var sql = `UPDATE evento SET title = '${body.title}', data_inicial = '${body.data_inicial}', data_final = '${body.data_final}', dias = ${body.dias} where id = ${body.id};`

        await connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.json(err).status(400)
            } else {
                res.json({ "Mensagem": "Evento atualizado com sucesso" }).status(200)
            }
        })
    }

    async deleta_evento(req, res) {

        var id = req.params.id

        var sql = `delete from evento where id = ?`

        connection.query(sql, id, (err) => {

            if (err) {
                res.json(err).status(400)
            }
            else {
                res.json({ "Mensagem": "Evento deletado com sucesso" }).status(200)
            }
        })

    }

}

module.exports = new EventController();
