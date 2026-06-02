require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Listar chamados
app.get('/api/chamados', async (req, res) => {
  try {
    const chamados = await prisma.chamado.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(chamados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar chamados' });
  }
});

// Criar chamado
app.post('/api/chamados', async (req, res) => {
  try {
    const { titulo, descricao, responsavel, prioridade } = req.body;
    const chamado = await prisma.chamado.create({
      data: { titulo, descricao, responsavel, prioridade, status: 'ABERTO' }
    });
    res.status(201).json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado' });
  }
});

// Alterar status
// Alterar status
app.patch('/api/chamados/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const chamado = await prisma.chamado.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(chamado);
  } catch (error) {
    console.error("ERRO NO PATCH:", error); // <-- ADICIONE ESTA LINHA
    res.status(500).json({ error: 'Erro ao alterar status', detalhes: error.message });
  }
});

// Excluir chamado
app.delete('/api/chamados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.chamado.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir chamado' });
  }
});

// Inicialização do servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;