const Livro = require('../models/livro.model');
const livroRepository = require('../repositories/livro.repository');

class LivroService {
  async criarLivro(data) {
    const livro = new Livro(
      data.titulo,
      data.autor,
      data.genero,
      data.ano_publicacao,
      data.status
    );

    const livroCriado = await livroRepository.inserirLivro(livro);
    return livroCriado;
  }

  async listarlivros(filtros) {
    return await livroRepository.listarLivros(filtros)
  }

  async atualizarLivro(id, data) {
    return await livroRepository.atualizarLivro(id, data);
  }

  async deletarLivro(id) {
    return await livroRepository.deletarLivro(id);
  }
}

module.exports = new LivroService();
