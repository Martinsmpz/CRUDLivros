const { body } = require('express-validator');

const generosPermitidos = [
    'Romance',
    'Ficção',
    'Fantasia',
    'Suspense',
    'Aventura',
    'Drama',
    'Terror'
  ];

  const statusPermitidos = ['lido', 'lendo', 'nao lido'];


const livroValidationRules = [
    body('titulo')
      .notEmpty().withMessage('O título é obrigatório.'),
  
    body('autor')
      .notEmpty().withMessage('O autor é obrigatório.'),
  
    body('genero')
      .notEmpty().withMessage('O gênero é obrigatório.')
      .isIn(generosPermitidos).withMessage(`Gênero inválido. Use: ${generosPermitidos.join(', ')}.`),
  
    body('ano_publicacao')
      .notEmpty().withMessage('O ano de publicação é obrigatório.')
      .isInt({ min: 1 }).withMessage('Ano de publicação deve ser um número maior que 0.'),
  
    body('status')
      .notEmpty().withMessage('O status é obrigatório.')
      .isIn(statusPermitidos).withMessage('Status inválido. Use: lido, lendo ou não lido.')
  ];
  

module.exports = livroValidationRules;
