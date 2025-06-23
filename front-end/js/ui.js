document.getElementById('btn-novo-livro').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.remove('hidden'); 
  document.getElementById('form-livro').reset();
  document.getElementById('titulo-formulario').textContent = 'Adicionar Livro';
  limparMensagensErro();
});
  
document.getElementById('btn-cancelar').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.add('hidden'); 
  document.getElementById('form-livro').reset();
  limparMensagensErro();
});
  

function validarFormulario() {
  let valido = true;

  const campos = ['titulo', 'autor', 'genero', 'ano_publicacao', 'status'];

  campos.forEach(campo => {
    const input = document.getElementById(campo);
    const erro = document.getElementById(`erro-${campo}`);

    
    if (!input.value.trim()) {
      erro.textContent = `O campo ${campo.replace('_', ' ')} é obrigatório.`;
      erro.classList.remove('hidden');
      valido = false;
      return; 
    }

    if (campo === 'ano_publicacao') {
      const ano = parseInt(input.value.trim());
      const anoAtual = new Date().getFullYear();

      if (isNaN(ano) || ano <= 0) {
        erro.textContent = 'O ano deve ser maior que 0.';
        erro.classList.remove('hidden');
        valido = false;
        return;
      }

      if (ano > anoAtual) {
        erro.textContent = `O ano não pode ser maior que ${anoAtual}.`;
        erro.classList.remove('hidden');
        valido = false;
        return;
      }
    }

    erro.textContent = '';
    erro.classList.add('hidden');
  });

  return valido;
}
  
  function limparMensagensErro() {
    const camposErro = document.querySelectorAll('[id^="erro-"]');
    camposErro.forEach(e => {
      e.textContent = '';
      e.classList.add('hidden');
    });
  }

  document.getElementById('form-livro').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (!validarFormulario()) return;
  
    const btnSalvar = document.getElementById('btn-salvar');
    btnSalvar.textContent = 'Salvando...';
    btnSalvar.disabled = true;

    
    const livroId = document.getElementById('livro-id').value;

    const novoLivro = {
      titulo: document.getElementById('titulo').value.trim(),
      autor: document.getElementById('autor').value.trim(),
      genero: document.getElementById('genero').value,
      ano_publicacao: parseInt(document.getElementById('ano_publicacao').value),
      status: document.getElementById('status').value
    };
    
  
    try {
      const livroId = document.getElementById('livro-id').value;
      const url = livroId
        ? `http://localhost:3000/livros/${livroId}`
        : 'http://localhost:3000/livros';
      const metodo = livroId ? 'PUT' : 'POST';
    
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoLivro)
      });
    
      if (!resposta.ok) {
        throw new Error(livroId ? 'Erro ao atualizar livro' : 'Erro ao criar livro');
      }
    
      const msg = document.getElementById('mensagem-sucesso');
      msg.classList.remove('hidden');
      msg.textContent = livroId
        ? '📘 Livro atualizado com sucesso!'
        : '📚 Livro criado com sucesso!';
    
      setTimeout(() => {
        msg.classList.add('hidden');
      }, 3000);
    
      document.getElementById('modal-overlay').classList.add('hidden');
      document.getElementById('form-livro').reset();
      document.getElementById('livro-id').value = ''; 
    
      await listarLivros();
      paginaAtual = Math.ceil(livrosData.length / livrosPorPagina);
      renderTabelaLivros();
    
    } catch (erro) {
      console.error(erro);
      alert('❌ Não foi possível salvar o livro.');
    } finally {
      btnSalvar.textContent = 'Salvar';
      btnSalvar.disabled = false;
    }    
  });
    
  