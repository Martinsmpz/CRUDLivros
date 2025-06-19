const livroService = require('../services/livro.service');


const ExcelJS = require('exceljs');


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

    if (livros.length === 0) {
      return res.status(200).json({
        mensagem: 'Nenhum livro encontrado',
        livros: []
      });
    }

    res.status(200).json({ livros });
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


const gerarRelatorioExcel = async (req, res) => {
  try {
    const filtros = {
      status: req.query.status,
      genero: req.query.genero,
    };

    const livros = await livroService.gerarRelatorio(filtros);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Livros');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Título', key: 'titulo', width: 30 },
      { header: 'Autor', key: 'autor', width: 25 },
      { header: 'Gênero', key: 'genero', width: 20 },
      { header: 'Ano Publicação', key: 'ano_publicacao', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    livros.forEach(livro => worksheet.addRow(livro));

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}-${mes}-${ano}`;

    let nomeArquivo = 'relatorio_livros';

    if (filtros.status) {
      nomeArquivo += `_${filtros.status.toLowerCase().replace(/\s+/g, '_')}`;
    }

    if (filtros.genero) {
      nomeArquivo += `_${filtros.genero.toLowerCase().replace(/\s+/g, '_')}`;
    }

    nomeArquivo += `_${dataFormatada}.xlsx`;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ mensagem: 'Erro ao gerar relatório' });
  }
};


module.exports = {
  criarLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro,
  gerarRelatorioExcel
};

