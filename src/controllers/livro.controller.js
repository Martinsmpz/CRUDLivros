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

module.exports = { criarLivro };
