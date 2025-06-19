const express = require('express');
const router = express.Router();

const { criarLivro, listarLivros, atualizarLivro, deletarLivro, gerarRelatorioExcel } = require('../controllers/livro.controller');
const livroValidationRules = require('../validators/livro.validator');
const handleValidation = require('../middlewares/handleValidation');

router.post('/', livroValidationRules, handleValidation, criarLivro);
router.get('/', listarLivros);
router.put('/:id', livroValidationRules, handleValidation, atualizarLivro);
router.delete('/:id', deletarLivro);
router.get('/relatorio', gerarRelatorioExcel);

module.exports = router;
