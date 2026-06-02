import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/chamados';

function App() {
  const [chamados, setChamados] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '', descricao: '', responsavel: '', prioridade: 'BAIXA'
  });

  // A função foi movida para cá, antes de ser chamada no useEffect
  const carregarChamados = async () => {
    const res = await axios.get(API_URL);
    setChamados(res.data);
  };

  useEffect(() => { 
    carregarChamados(); 
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const criarChamado = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, formData);
    setFormData({ titulo: '', descricao: '', responsavel: '', prioridade: 'BAIXA' });
    carregarChamados();
  };

  const alterarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'ABERTO' ? 'FINALIZADO' : 'ABERTO';
    await axios.patch(`${API_URL}/${id}/status`, { status: novoStatus });
    carregarChamados();
  };

  const excluirChamado = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    carregarChamados();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>LabDesk Help Desk</h1>
      <form onSubmit={criarChamado} style={{ marginBottom: '20px' }}>
        <input name="titulo" placeholder="Título" value={formData.titulo} onChange={handleInputChange} required />
        <input name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleInputChange} required />
        <input name="responsavel" placeholder="Responsável" value={formData.responsavel} onChange={handleInputChange} required />
        <select name="prioridade" value={formData.prioridade} onChange={handleInputChange}>
          <option value="BAIXA">BAIXA</option>
          <option value="MEDIA">MÉDIA</option>
          <option value="ALTA">ALTA</option>
        </select>
        <button type="submit">Cadastrar Chamado</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th><th>Título</th><th>Descrição</th><th>Responsável</th><th>Prioridade</th><th>Status</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.titulo}</td><td>{c.descricao}</td><td>{c.responsavel}</td><td>{c.prioridade}</td><td>{c.status}</td>
              <td>
                <button onClick={() => alterarStatus(c.id, c.status)}>
                  {c.status === 'ABERTO' ? 'Finalizar' : 'Reabrir'}
                </button>
                <button onClick={() => excluirChamado(c.id)} style={{ marginLeft: '5px' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;