import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import heroesImg from '../../assets/images/heroes.png';

import './style.css';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      await Promise.resolve().then(() => {
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
      });

      history.push('/profile');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho Cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
