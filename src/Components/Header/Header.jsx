import React, { useContext, useEffect } from 'react';
import styles from './Header.module.css';
import logo from '../../images/logo-senai.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Components/Storage/UserContext';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import LogOut from '../../images/icons/log-out.svg';

const Header = () => {
  const { infoUser, setInfoUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      setInfoUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
    //console.log(auth?.currentUser?.email);
  };

  useEffect(() => {}, [infoUser]);

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.barraTop}>
          <img src={logo} width={200} />
          {!infoUser ? (
            <div>Bem-vindo ao Senai Track!</div>
          ) : (
            <div className={styles.logOut}>
              <p>Olá, {infoUser && infoUser[0].nome}</p>
              <img onClick={logOut} src={LogOut} alt="LogOut" title="Log Out" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
