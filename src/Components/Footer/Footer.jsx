import React, { useEffect, useContext } from 'react';
import styles from './Footer.module.css';
import IconListar from '../../images/icons/listar.svg';
import IconSolicitar from '../../images/icons/solicitar.svg';
import IconPendencias from '../../images/icons/pendencias.svg';
import IconCriar from '../../images/icons/criar.svg';
import IconLiberar from '../../images/icons/liberar.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Components/Storage/UserContext';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import useSound from 'use-sound';
import messageSound from '../../assets/notify.mp3';

const Footer = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const { setRefresh, refresh, infoUser } = useContext(UserContext);
  //const liberRef = collection(db, 'liberacoes');

  useEffect(() => {
    setRefresh(!refresh);
    //console.log(infoUser[0].role);
    // console.log(auth.currentUser);
  }, [location]);

  useEffect(() => {
    if (!infoUser) {
      navigate('/');
    } else {
      let liberRef = null;
      //coordernador recebe alarme quando qualquer aluno mudar o status de pendente
      if (infoUser[0].role == 'coordenador') {
        liberRef = query(
          collection(db, 'liberacoes'),
          where('status', '==', 'pendente'),
        );
        //docente recebe alarme somente quando sua pendencia for alterada
      } else if (infoUser[0].role == 'docente') {
        liberRef = query(
          collection(db, 'liberacoes'),
          where('docente', '==', infoUser[0].nome),
        );
      }

      onSnapshot(liberRef, () => {
        console.log('mudou');

        setTimeout(() => {
          const sound = new Audio(messageSound);
          sound.play();
        }, 1000);
      });
    }
  }, [infoUser]);

  if (infoUser) {
    return (
      <div className={styles.footer}>
        <NavLink to={'/alunos-liberados'} className={styles.btMenu}>
          <img
            src={IconListar}
            alt="Listar Solicitações"
            title="Listar Solicitações"
          />
          <p className={styles.iconListar}>LISTAR</p>
        </NavLink>
        {infoUser[0].role == 'docente' && (
          <NavLink to={'/solicitar-liberacao'} className={styles.btMenu}>
            <img
              src={IconSolicitar}
              alt="Solicitar Liberação"
              title="Solicitar Liberação"
            />
            <p className={styles.iconSolicitar}>
              SOLICITAR
              <br />
              LIBERAÇÃO
            </p>
          </NavLink>
        )}
        {infoUser[0].role != 'docente' && (
          <NavLink to={'/liberar-aluno'} className={styles.btMenu}>
            <img src={IconLiberar} alt="Liberar Aluno" title="Liberar Aluno" />
            <p className={styles.iconLiberar}>
              LIBERAR
              <br />
              ALUNO
            </p>
          </NavLink>
        )}
        {infoUser[0].role != 'docente' && (
          <NavLink to={'/pendencias'} className={styles.btMenu}>
            <img
              src={IconPendencias}
              alt="Solicitações Pendentes"
              title="Solicitações Pendentes"
            />
            <p className={styles.iconPendencias}>PENDÊNCIAS</p>
          </NavLink>
        )}
        {infoUser[0].role != 'docente' && (
          <NavLink to={'/criar-usuarios'} className={styles.btMenu}>
            <img src={IconCriar} alt="Criar Usuário" title="Criar Usuário" />
            <p className={styles.iconCriarUsuario}>
              CRIAR <br />
              USUÁRIO
            </p>
          </NavLink>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.noLogin}>
        <p>
          Sistema para gerenciamento de entrada e saída de alunos.
          <br />
          Versão 1.0
        </p>
      </div>
    );
  }
};

export default Footer;
