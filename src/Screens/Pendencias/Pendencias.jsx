import React, { useState, useEffect, useContext } from 'react';
import styles from './Pendencias.module.css';
import { db } from '../../config/firebase';
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import ItemPendencia from '../../Components/ItemPendencia/ItemPendencia';
import { UserContext } from '../../Components/Storage/UserContext';

const Pendencias = () => {
  const [liberacoes, setLiberacoes] = useState([]);

  const { setRefresh, refresh } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userRef = collection(db, 'liberacoes');
      const q = query(userRef, where('status', '==', 'pendente'));
      const docRefs = await getDocs(q);

      let pen = [];
      if (!docRefs.empty) {
        docRefs.forEach((doc) => {
          const dadosDaLiberacao = doc.data();
          const idDaLiberacao = doc.id;
          pen.push({ dados: dadosDaLiberacao, id: idDaLiberacao });
        });
      }
      setLiberacoes(pen);
    })();
  }, [refresh]);

  //Função altera o status do registro para aprovado
  const libAprov = async (id) => {
    const userRef = doc(db, 'liberacoes', id);
    await updateDoc(userRef, {
      status: 'aprovada',
    });
    setRefresh(!refresh);
  };

  //Função altera o status do registro para rejeitado
  const libReject = async (id) => {
    const userRef = doc(db, 'liberacoes', id);
    await updateDoc(userRef, {
      status: 'reprovada',
    });
    setRefresh(!refresh);
  };

  return (
    <div className={'containerFull'}>
      <div className={styles.pendencias}>
        {liberacoes.length > 0 ? (
          liberacoes.map((item, key) => (
            <ItemPendencia
              key={key}
              nome={item.dados.aluno.label}
              curso={item.dados.aluno.curso}
              desc={item.dados.motivo}
              hora={item.dados.hora}
              data={item.dados.data}
              contato={item.dados.contato}
              obs={item.dados.obs}
              menor={item.dados.menor}
              inOut={item.dados.inOut}
              id={item.id}
              funcao1={libReject}
              funcao2={libAprov}
            ></ItemPendencia>
          ))
        ) : (
          <p className={styles.noFound}>Nenhum registro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Pendencias;
