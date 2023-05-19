const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "there is not have token",
      });
    }
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es válido",
    });
  }
};

module.exports = {
  validarJWT,
};
