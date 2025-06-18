const express = require('express');
const router = express.Router();

const { criarLivro } = require('../controllers/livro.controller');

router.post('/', criarLivro); 

module.exports = router;
