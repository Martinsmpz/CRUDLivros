const db = require('../config/db');

const inserirLivro = async (livro) => {
  const query = `
    INSERT INTO livros (titulo, autor, genero, ano_publicacao, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    livro.titulo,
    livro.autor,
    livro.genero,
    livro.ano_publicacao,
    livro.status,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

module.exports = { inserirLivro };
