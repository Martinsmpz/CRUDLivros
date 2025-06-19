const livroService = require('../services/livro.service');

const criarLivro = async (req, res) => {
  try {
    const livroCriado = await livroService.criarLivro(req.body);
    res.status(201).json(livroCriado);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ mensagem: 'Erro ao criar livro' });
  }
};

const listarLivros = async (req, res) => {
  try {
    const filtros = {
      status: req.query.status,
      genero: req.query.genero,
    };

    const livros = await livroService.listarlivros(filtros);
    res.status(200).json(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    res.status(500).json({ mensagem: 'Erro ao listar livros' });
  }
};

module.exports = {
  criarLivro,
  listarLivros,
};

