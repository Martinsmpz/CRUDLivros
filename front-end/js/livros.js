let livrosData = [];           
let paginaAtual = 1;           
const livrosPorPagina = 10;    

async function listarLivros() {
  try {
    const resposta = await fetch('http://localhost:3000/livros');
    const dados = await resposta.json();
    livrosData = dados.livros;

    paginaAtual = 1;
    renderTabelaLivros(); 

  } catch (erro) {
    console.error('Erro ao listar livros:', erro);
    alert('Erro ao carregar livros.');
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'lido':
      return `<span class="inline-block px-2 py-1 bg-green-700 text-white rounded text-sm">✅ Lido</span>`;
    case 'lendo':
      return `<span class="inline-block px-2 py-1 bg-yellow-600 text-white rounded text-sm">📖 Lendo</span>`;
    case 'nao lido':
      return `<span class="inline-block px-2 py-1 bg-gray-600 text-white rounded text-sm">🕓 Não Lido</span>`;
    default:
      return `<span class="inline-block px-2 py-1 bg-gray-700 text-white rounded text-sm">-</span>`;
  }
}


function getStatusComEmoji(status) {
  switch (status) {
    case 'lido':
      return '✅ Lido';
    case 'lendo':
      return '📖 Lendo';
    case 'nao lido':
      return '🕓 Não Lido';
    default:
      return '-';
  }
}

function renderPaginacao() {
  const container = document.getElementById('paginacao');
  container.innerHTML = '';

  const totalPaginas = Math.ceil(livrosData.length / livrosPorPagina);
  if (totalPaginas <= 1) return;

  const criarBotao = (label, pagina, isActive = false, isDisabled = false) => {
    const botao = document.createElement('button');
    botao.textContent = label;
    botao.className = `px-3 py-1 mx-1 rounded text-white transition ${
      isActive
        ? 'bg-soft-blue font-bold'
        : 'bg-gray-700 hover:bg-gray-600'
    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;
    if (!isDisabled) {
      botao.addEventListener('click', () => {
        paginaAtual = pagina;
        renderTabelaLivros();
      });
    }
    return botao;
  };

  container.appendChild(criarBotao('«', paginaAtual - 1, false, paginaAtual === 1));

  const maxBotoes = 5;
  let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
  let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);
  if (fim - inicio < maxBotoes - 1) {
    inicio = Math.max(1, fim - maxBotoes + 1);
  }

  if (inicio > 1) {
    container.appendChild(criarBotao('1', 1));
    if (inicio > 2) {
      const pontos = document.createElement('span');
      pontos.textContent = '...';
      pontos.className = 'text-gray-400 px-1';
      container.appendChild(pontos);
    }
  }

  for (let i = inicio; i <= fim; i++) {
    container.appendChild(criarBotao(i, i, i === paginaAtual));
  }

  if (fim < totalPaginas) {
    if (fim < totalPaginas - 1) {
      const pontos = document.createElement('span');
      pontos.textContent = '...';
      pontos.className = 'text-gray-400 px-1';
      container.appendChild(pontos);
    }
    container.appendChild(criarBotao(totalPaginas, totalPaginas));
  }

  container.appendChild(criarBotao('»', paginaAtual + 1, false, paginaAtual === totalPaginas));
}

function renderTabelaLivros() {
  const tabela = document.getElementById('tabela-livros');
  const mensagemVazia = document.getElementById('mensagem-vazia');
  tabela.innerHTML = '';

  const inicio = (paginaAtual - 1) * livrosPorPagina;
  const fim = inicio + livrosPorPagina;
  const livrosPagina = livrosData.slice(inicio, fim);

  if (livrosPagina.length === 0) {
    mensagemVazia.classList.remove('hidden');
    return;
  } else {
    mensagemVazia.classList.add('hidden');
  }

  livrosPagina.forEach(livro => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
    <td>${livro.titulo}</td>
    <td>${livro.autor}</td>
    <td>${livro.genero || '-'}</td>
    <td>${livro.ano_publicacao}</td>
    <td>${getStatusBadge(livro.status)}</td>
    <td class="space-x-2">
      <button class="px-2 py-1 bg-gray-700 hover:bg-gray-500 text-white rounded transition">Editar</button>
      <button class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition">Deletar</button>
    </td>
  `;
    tabela.appendChild(linha);
  });

  renderPaginacao();
}

