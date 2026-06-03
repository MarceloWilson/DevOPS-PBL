# Modelagem — LabDesk Help Desk

# Objetivo

O sistema LabDesk Help Desk foi criado para controlar chamados de laboratório de forma simples e organizada.

O sistema permite:

* cadastrar chamados
* listar chamados
* alterar status
* excluir chamados

---

# Requisitos Funcionais

## RF01 — Cadastro de Chamados

O usuário pode cadastrar chamados contendo:

* título
* descrição
* responsável
* prioridade

---

## RF02 — Listagem de Chamados

O sistema deve exibir todos os chamados cadastrados.

---

## RF03 — Alteração de Status

O sistema deve permitir alterar o status do chamado.

Status utilizados:

* ABERTO
* FINALIZADO

---

## RF04 — Exclusão de Chamados

O sistema deve permitir excluir chamados.

---

# Requisitos Não Funcionais

* utilização de Docker
* utilização de Docker Compose
* banco MySQL 8.0
* pipeline CI/CD
* testes automatizados

---

# Entidade Principal

## Chamado

| Campo       | Tipo     |
| ----------- | -------- |
| id          | Int      |
| titulo      | String   |
| descricao   | String   |
| responsavel | String   |
| prioridade  | String   |
| status      | String   |
| createdAt   | DateTime |

---

# Modelagem do Banco

```sql id="4p8jpx"
CREATE TABLE Chamado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    responsavel VARCHAR(255),
    prioridade VARCHAR(50),
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Arquitetura

```text id="80htyu"
Frontend React
↓
Backend Node.js
↓
MySQL 8.0
```

---

# Rotas da API

## Listar chamados

```text id="i2q1ne"
GET /api/chamados
```

---

## Criar chamado

```text id="xt1h9f"
POST /api/chamados
```

---

## Alterar status

```text id="w2gt67"
PATCH /api/chamados/:id/status
```

---

## Excluir chamado

```text id="v8od6m"
DELETE /api/chamados/:id
```

---

# Tecnologias Utilizadas

* React
* Node.js
* Express
* MySQL 8.0
* Prisma
* Docker
* Docker Compose
* GitHub Actions

---

# Pipeline CI/CD

A pipeline executa:

* instalação de dependências
* testes automatizados
* validação Docker Compose
* build frontend
* build backend

---

# Considerações Finais

O projeto foi desenvolvido de forma simples para atender às exigências da disciplina, utilizando conceitos DevOps com Docker, CI/CD e integração entre frontend, backend e banco de dados.