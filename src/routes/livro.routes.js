const express = require('express');
const router = express.Router();

const { criarLivro, listarLivros } = require('../controllers/livro.controller');

router.post('/', criarLivro);
router.get('/', listarLivros);

module.exports = router;
