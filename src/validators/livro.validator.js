const { body } = require('express-validator');

const livroValidationRules = [
  body('titulo').notEmpty().withMessage('O título é obrigatório.'),
  body('autor').notEmpty().withMessage('O autor é obrigatório.'),
  body('ano_publicacao')
    .isInt({ min: 1 }).withMessage('Ano de publicação deve ser um número maior que 0.'),
  body('status')
    .isIn(['lido', 'lendo', 'não lido'])
    .withMessage('Status inválido. Use: lido, lendo ou não lido.')
];

module.exports = livroValidationRules;
