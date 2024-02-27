import React, { useState, useContext, useEffect } from 'react';
import styles from './Login.module.css';
import Field from '../../Components/Fields/Field';
import Buttton from '../../Components/Button/Buttton';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Components/Storage/UserContext';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const { setInfoUser, infoUser } = useContext(UserContext);

  /*   useEffect(() => {
    if (auth.currentUser) {
      navigate('/alunos-liberados');
    }
    //console.log(auth.currentUser);
  }, [auth.currentUser]);
 */

  //É necessário deslogar antes de tentar um novo login para eliminar logins pendentes anteriores
  const logOut = async () => {
    try {
      await signOut(auth);
      setInfoUser(null);
    } catch (err) {
      console.error(err);
    }
    //console.log(auth?.currentUser?.email);
  };

  //função de click acessar--------------
  const logIn = async () => {
    setLoading(true);
    setWarning('');
    logOut();
    try {
      await signInWithEmailAndPassword(auth, email.toLowerCase(), pass);
      navigate('/alunos-liberados');
    } catch (err) {
      //console.error(err);
      console.log(err.code);
      setWarning('Usuário ou senha inválidos');
    } finally {
      setLoading(false);

      //checa se existe o user cadastrado
      if (auth.currentUser) {
        const userRef = collection(db, 'usuarios');
        const q = query(userRef, where('email', '==', email));
        const docRefs = await getDocs(q);
        setInfoUser(docRefs.docs.map((doc) => doc.data()));
        console.log(docRefs.docs.map((doc) => doc.data()));
      } else {
        console.log('Nenhum dado encontrado na coleção.');
      }
    }
    //console.log(auth?.currentUser?.email);
    //
  };

  return (
    <div className={'containerFull'}>
      <div className={styles.login}>
        <div className={styles.forms}>
          <h1 className={styles.title}>Login</h1>
          <Field
            label="Usuário"
            type="text"
            color="darkgray"
            backColor="#f1f1f1"
            value={email}
            setValue={setEmail}
          />
          <Field
            label="Senha"
            type="password"
            color="darkgray"
            backColor="#f1f1f1"
            value={pass}
            setValue={setPass}
          />
          <Buttton
            backcolor={'red'}
            color={'white'}
            funcao={logIn}
            loading={loading}
          >
            Acessar
          </Buttton>
          <p className={styles.warning}>{warning}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
