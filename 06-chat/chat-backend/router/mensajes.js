const { Router } = require("express");
const { validarJWT } = require("../middlewares/validate-jwt");
const mensajes = require("../controllers/mensajes");

const router = Router();

router.get("/:de", validarJWT, mensajes.obtenerChat);

module.exports = router;
