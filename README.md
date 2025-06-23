# 📚 Catálogo de Livros – Teste Técnico

Este projeto é um sistema **CRUD completo** (Create, Read, Update, Delete) de gerenciamento de livros, desenvolvido como parte de um teste técnico para vaga de desenvolvedor. A aplicação permite cadastrar, editar, deletar e filtrar livros, além de exportar relatórios em formato Excel.

---

## 🚀 Tecnologias Utilizadas

- **Back-end:**
  - Node.js
  - Express
  - PostgreSQL
  - Biblioteca `exceljs` (para geração de planilhas Excel)

- **Front-end:**
  - HTML5 + JavaScript puro (sem frameworks)
  - Tailwind CSS (tema escuro com azul)
  - Responsividade básica (mobile/desktop)

---

## ✨ Funcionalidades

### 📖 CRUD de Livros
- Cadastro de novos livros com validação de campos
- Edição de livros com dados preenchidos automaticamente
- Deleção com confirmação de exclusão
- Validação de ano de publicação (não permite anos no futuro ou <= 0)

### 🔎 Filtros Inteligentes
- Filtro por **gênero**
- Filtro por **status** (lido, lendo, não lido)
- Filtros podem ser usados juntos ou separadamente

### 📤 Exportação para Excel
- Exporta os livros da tabela atual em formato `.xlsx`
- Permite exportar todos os livros ou apenas os filtrados
- Nome do arquivo é dinâmico (com data e filtros)

### 🧑‍💻 Interface amigável
- Modal animado para criação e edição
- Feedback visual de sucesso e erro
- Mensagem se nenhum livro for encontrado

---

## 🔌 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
2. Configure o back-end
Configure o .env com suas credenciais do PostgreSQL
## 🗄 Importando o Banco de Dados

Se você estiver usando PostgreSQL localmente, siga os passos:

1. Crie o banco de dados:

```bash
createdb nome_do_banco
2. Importe o dump:psql -U seu_usuario -d nome_do_banco -f ./database/dump.sql
Pronto! Agora você pode rodar o back-end normalmente.


---

### ✅ Alternativa opcional (recomendado se tiver tempo)

Você também poderia:
- Criar as tabelas via script `schema.sql` + `seed.sql`
- Ou implementar Flyway, por exemplo, e rodar as migrations automaticamente

Mas se for só para entrega de teste técnico simples, **o dump `.sql` é o suficiente**.

Se quiser, posso revisar seu dump depois que você gerar, e até escrever os comandos no `README.md` já ajustados ao seu projeto. Deseja isso?



🤝 Autor
Desenvolvido por Gabriel Martins – como parte de um teste técnico.
Contato: gabrielmartinsalmeida25@gmail.com | GitHub: martinsmpz
