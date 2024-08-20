
var connection = require("../database/database");


class PersonController {


    async consulta_pessoa(req, res) {

        var sql = `select * from pessoa`


        await connection.query(sql, (err, result) => {

            if (err) {
                res.json({ "ERRO": "Erro ao consultar pessoas" }).status(400);
                console.log(err)
            } else {
                res.json(result).status(200)
            }
        })
    }

    async consulta_pessoaId(req, res) {

        var params = req.params

        var sql = `select * from pessoa where id = ${params.id}`

        await connection.query(sql, (err, result) => {

            if (err) {
                res.json({ "ERRO": "Erro ao consultar pessoas" }).status(400);
                console.log(err)
            } else {
                res.json(result).status(200)
            }
        })
    }

    async cria_pessoa(req, res) {

        var body = req.body;

        var sql = `INSERT INTO pessoa (name) values ('${body.name}')`

        await connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.json({ "ERRO": "Erro ao criar nova pessoa" }).status(400)
            }
            else {
                res.json({ "Mensagem": "Pessoa criada com sucesso" }).status(200)
            }

        })
    }

    async altera_pessoa(req, res) {

        var body = req.body;

        var sql = `UPDATE pessoa SET name = '${body.name}' where id = ${body.id};`

        await connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.json(err).status(400)
            } else {
                res.json({ "Mensagem": "Pessoa atualizada com sucesso" }).status(200)
            }
        })
    }

    async deleta_pessoa(req, res) {
        var sql = `delete from pessoa where id = ${req.params.id}`

        await connection.query(sql, (err) => {
            if (err) {
                console.log(err)
                res.json({ "Erro": "Erro ao excluir pessoa" }).status(400)
            } else {
                res.json({ "Mensagem": "Pessoa deletada com sucesso" }).status(200)
            }
        })
    }

    async consulta_pessoa_compra(req, res) {

        var sql = "select * from pessoa_compra"

        connection.query(sql, (err, result) => {

            if (err) {
                console.log(err)
                res.json(err).status(400)
            }

            else {
                res.json(result).status(200)
            }
        })
    }

    async cria_pessoa_compra(req, res) {

        var body = req.body
        var sql = `insert into pessoa_compra(id_compra, id_pessoa) values (${body.id_compra},${body.id_pessoa} )`

        connection.query(sql, (err) => {
            if (err) {
                console.log(err)

                res.json(err).status(400)
            } else {
                res.send("Compra associada a pessoa com sucesso!").status(200)
            }
        })
    }

    async consulta_total(req, res) {
        var sql = `
            SELECT 
                e.id AS evento_id, 
                e.title, 
                e.data_inicial, 
                e.data_final, 
                e.valor_total,
                c.id AS compra_id,
                c.descricao, 
                c.valor,
                p.id AS pessoa_id,
                p.name
            FROM 
                evento e
            JOIN 
                compra c ON e.id = c.id_evento
            JOIN 
                pessoa_compra pc ON c.id = pc.id_compra
            JOIN 
                pessoa p ON pc.id_pessoa = p.id
        `;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }

    async deleta_pessoa_compra(req, res) {
        var sql = `DELETE FROM pessoa_compra WHERE id = ${req.params.id}`;
        await connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "Erro": "Erro ao excluir pessoa_compra" });
            } else {
                res.status(200).json({ "Mensagem": "Pessoa_compra deletada com sucesso" });
            }
        });
    }

    async altera_pessoa_compra(req, res) {
        var body = req.body;
        var sql = `UPDATE pessoa_compra SET id_compra = ${body.id_compra}, id_pessoa = ${body.id_pessoa} WHERE id = ${body.id}`;
        await connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "Erro": "Erro ao atualizar pessoa_compra" });
            } else {
                res.status(200).json({ "Mensagem": "Pessoa_compra atualizada com sucesso" });
            }
        });
    }

}

module.exports = new PersonController();