import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';

import './style.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post('ongs', {
        name,
        email,
        whatsapp,
        city,
        uf
      });
      console.log(response.data)
      history.push('/');
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Logon
          </Link>

        </section>
        <form onSubmit={handleRegister}>
          <input
            value={name}
            placeholder="Nome da ONG"
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            value={whatsapp}
            placeholder="WhatsApp"
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
