const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mensagens = errors.array().map(err => err.msg);
    return res.status(400).json({ erros: mensagens });
  }
  next();
};

module.exports = handleValidation;
