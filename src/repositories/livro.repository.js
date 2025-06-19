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
    livro.status
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const listarLivros = async (filtros) => {
  let query = 'SELECT * FROM livros';
  const values = [];
  const condicoes = [];

  if (filtros.status) {
    values.push(filtros.status);
    condicoes.push(`status = $${values.length}`);
  }

  if (filtros.genero) {
    values.push(filtros.genero);
    condicoes.push(`genero ILIKE $${values.length}`);
  }

  if (condicoes.length > 0) {
    query += ' WHERE ' + condicoes.join(' AND ');
  }

  const { rows } = await db.query(query, values);
  return rows;
};
const atualizarLivro = async (id, data) => {
  const query = `
    UPDATE livros
    SET titulo = $1,
        autor = $2,
        genero = $3,
        ano_publicacao = $4,
        status = $5
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    data.titulo,
    data.autor,
    data.genero,
    data.ano_publicacao,
    data.status,
    id
  ];

  const result = await db.query(query, values);
  console.log('Resultado da query:', result.rows);
  return result.rows[0]; 
  };

  const deletarLivro = async (id) => {
    const query = 'DELETE FROM livros WHERE id = $1 RETURNING *;';
    const values = [id];
  
    const result = await db.query(query, values);
    return result.rows.length > 0;
  };


module.exports = {
  inserirLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro
};
