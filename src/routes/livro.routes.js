const express = require('express');
const router = express.Router();

const { criarLivro, listarLivros, atualizarLivro, deletarLivro } = require('../controllers/livro.controller');

router.post('/', criarLivro);
router.get('/', listarLivros);
router.put('/:id', atualizarLivro); 
router.delete('/:id', deletarLivro); 

module.exports = router;
