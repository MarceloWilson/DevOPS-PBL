const request = require('supertest');
const app = require('../index');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.chamado.deleteMany(); // Limpa banco antes dos testes
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testes API Chamados', () => {
  let chamadoId;

  it('Deve criar um novo chamado', async () => {
    const res = await request(app).post('/api/chamados').send({
      titulo: 'Erro no Projetor',
      descricao: 'O projetor do lab 3 não liga',
      responsavel: 'João',
      prioridade: 'ALTA'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    chamadoId = res.body.id;
  });

  it('Deve listar os chamados', async () => {
    const res = await request(app).get('/api/chamados');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve alterar o status do chamado', async () => {
    const res = await request(app)
      .patch(`/api/chamados/${chamadoId}/status`)
      .send({ status: 'FINALIZADO' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('FINALIZADO');
  });

  it('Deve excluir o chamado', async () => {
    const res = await request(app).delete(`/api/chamados/${chamadoId}`);
    expect(res.statusCode).toEqual(204);
  });
});