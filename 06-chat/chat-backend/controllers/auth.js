const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationEmail = await Usuario.findOne({ email });
    if (validationEmail) {
      return res.status(400).json({
        ok: false,
        msg: "the email is already exists",
      });
    }

    const usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    const token = await generateJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email not found",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Password incorrect",
      });
    }
    const token = await generateJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};

const revalidateToken = async (req, res) => {
  const uid = req.uid;

  const token = await generateJWT(uid);
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token,
  });
};

module.exports = {
  register,
  login,
  revalidateToken,
};
