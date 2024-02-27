import React, { useState, useEffect, useContext } from 'react';
import styles from './CriarUsuario.module.css';
import Field from '../../Components/Fields/Field';
import Buttton from '../../Components/Button/Buttton';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CriarUsuario = () => {
  const [nome, setNome] = useState('');
  const [whats, setWhats] = useState('');
  const [role, setRole] = useState('docente');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('123456');

  const create = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, senha);
      alert('Novo usuário criado com sucesso!');
      addDoc(collection(db, 'usuarios'), {
        nome: nome,
        role: role,
        email: email.toLowerCase(),
        whatsapp: whats,
      });
      setNome('');
      setEmail('');
      setWhats('');
    } catch (error) {
      console.error('Erro ao criar novo usuário:', error);
      Alert.alert('Erro ao criar novo usuário:', error);
    }
  };

  return (
    <div className={'containerFull'}>
      <div className={'contents'}>
        <div className={'leftContent'}>
          <div className={styles.criarUsuario}>
            <h1 className={styles.title}>
              Criar
              <br />
              Usuário
            </h1>
            <label>
              Tipo de usuário:
              <select
                className={styles.role}
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value={'docente'}>Docente</option>
                <option value={'coordenador'}>Coordenação</option>
              </select>
            </label>
          </div>
        </div>
        <div className={'rightContent'}>
          <div className={styles.criarUsuario}>
            <Field
              type="text"
              backColor="#f4f4f4"
              color="black"
              label="Nome"
              value={nome}
              setValue={setNome}
            />
            <Field
              type="text"
              backColor="#f4f4f4"
              color="black"
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <Field
              type="text"
              backColor="#f4f4f4"
              color="black"
              label="Whatsapp"
              value={whats}
              setValue={setWhats}
            />
            <Buttton
              backcolor={'red'}
              color={'white'}
              funcao={create}
              loading={false}
            >
              Criar Usuário
            </Buttton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarUsuario;
