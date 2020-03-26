import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';

import './style.css';

export default function NewIncident() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleCreateNewIncident(e) {
    e.preventDefault();
    try {
      await api.post('incidents', {
        title,
        description,
        value
      }, {
        headers: {
          "Authorization": ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo Caso</h1>

          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>

        </section>
        <form onSubmit={handleCreateNewIncident}>
          <input
            placeholder="Titulo do Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em Reais R$"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
