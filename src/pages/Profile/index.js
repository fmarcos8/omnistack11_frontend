import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';

import './style.css';

const MySwal = withReactContent(Swal);

export default function Profile() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          "Authorization": ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function confirmDeleteIncident({ title, id }) {
    MySwal.fire({
      icon: 'warning',
      title: <p>Ops!</p>,
      text: `Tem certeza que quer deletar o ${title} ?`,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(result => {
      if (result.value) {
        handleDeleteIncident(id);
      }
    });
  }

  async function handleGetIncidents() {
    await api.get('profile', {
      headers: {
        "Authorization": ongId
      }
    }).then(({ data }) => {
      setIncidents(data);
    });
  }

  useEffect(() => {
    handleGetIncidents();
  }, [])

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="" />
        <span>Bem Vinda - {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => confirmDeleteIncident(incident)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        )) ?? "Nenhum Caso Cadastrado"}
      </ul>
    </div>
  )
}
