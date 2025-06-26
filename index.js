const express = require('express');
const app = express();
const port = 3001;


app.use(express.json());

// Banco de dados em memória
let livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  { id: 3, titulo: '1984', autor: 'George Orwell' }
];

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  res.status(200).json(livro);
});

app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ mensagem: "Título e autor são obrigatórios" });
  }

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  livro.titulo = titulo || livro.titulo;
  livro.autor = autor || livro.autor;

  res.status(200).json(livro);
});


app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  livros.splice(index, 1);
  res.status(200).json({ mensagem: "Livro deletado com sucesso" });
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

