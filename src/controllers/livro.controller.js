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

const atualizarLivro = async (req, res) => {
  try {
    const id = req.params.id;
    const livroAtualizado = await livroService.atualizarLivro(id, req.body);

    if (!livroAtualizado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    console.log('Livro atualizado:', livroAtualizado); // 👈 Verifica se é um objeto ou algo estranho


    res.status(200).json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar livro' });
  }
};
const deletarLivro = async (req, res) => {
  try {
    const id = req.params.id;
    const foiDeletado = await livroService.deletarLivro(id);

    if (!foiDeletado) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    res.status(200).json({ mensagem: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ mensagem: 'Erro ao deletar livro' });
  }
};

module.exports = {
  criarLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro
};

