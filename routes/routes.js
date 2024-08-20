var express = require("express")
var app = express();
var router = express.Router();
var EventController = require("../Controllers/EventController")
var PersonController = require("../Controllers/PersonController");
const PurchaseController = require("../Controllers/PurchaseController");

/* Event Controller ----------------------------*/


router.get("/consulta_evento", EventController.consulta_evento)
router.get("/consulta_eventoId/:id", EventController.consulta_eventoId);
router.post("/cria_evento", EventController.cria_evento);
router.put("/altera_evento", EventController.altera_evento);
router.delete("/deleta_evento/:id", EventController.deleta_evento);

/* Person Controller ----------------------------*/

router.get("/consulta_pessoa", PersonController.consulta_pessoa)
router.get("/consulta_pessoaId/:id", PersonController.consulta_pessoaId)
router.post("/cria_pessoa", PersonController.cria_pessoa)
router.put("/altera_pessoa", PersonController.altera_pessoa)
router.delete("/deleta_pessoa/:id", PersonController.deleta_pessoa)

// Purchase Controller \\

router.get("/consulta_compra", PurchaseController.consulta_compra)
router.post("/cria_compra", PurchaseController.cria_compra)
router.put("/altera_compra", PurchaseController.altera_compra)
router.delete("/deleta_compra/:id", PurchaseController.deleta_compra)


//Pessoa Compra


router.get("/consulta_pessoa_compra", PersonController.consulta_pessoa_compra)
router.post('/cria_pessoa_compra', PersonController.cria_pessoa_compra)
router.delete('/deleta_pessoa_compra/:id', PersonController.deleta_pessoa_compra)
router.put('/altera_pessoa_compra', PersonController.altera_pessoa_compra)

router.get('/consulta_total', PersonController.consulta_total)

module.exports = router;


