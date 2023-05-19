const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

const userConnect = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario;
};

const userDisconnect = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();
  return usuario;
};

const getUsers = async () => {
  const users = await Usuario.find().sort("-online");
  return users;
};

const recordMessage = async (payload) => {
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return mensaje;
  } catch (error) {
    return false;
  }
};

module.exports = {
  userConnect,
  userDisconnect,
  getUsers,
  recordMessage,
};
