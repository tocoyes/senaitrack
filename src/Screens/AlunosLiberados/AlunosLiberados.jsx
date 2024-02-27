import React, { useState, useEffect, useContext } from 'react';
import styles from './AlunosLiberados.module.css';
import Field from '../../Components/Fields/Field';
import Buttton from '../../Components/Button/Buttton';
import { db } from '../../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import ItemLiberacao from '../../Components/ItemLiberacao/ItemLiberacao';
import { UserContext } from '../../Components/Storage/UserContext';

const AlunosLiberados = () => {
  const [liberacoes, setLiberacoes] = useState([]);
  let dataAtual = new Date();
  const [data, setData] = useState(dataAtual.toLocaleDateString());

  const { refresh } = useContext(UserContext);

  //faz a busca de liberações de acordo com o input date
  const searchData = async () => {
    const userRef = collection(db, 'liberacoes');
    const q = query(
      userRef,
      where('data', '==', data.split(' ')[0].split('-').reverse().join('/')),
    );
    const docRefs = await getDocs(q);
    setLiberacoes(docRefs.docs.map((doc) => doc.data()));
    //console.log(docRefs.docs.map((doc) => doc.data()));
    //console.log(data);
  };

  useEffect(() => {
    searchData();
  }, [refresh]);

  return (
    <div className={'containerFull'}>
      <div className={'contents'}>
        <div className={'leftContent'}>
          <div className={styles.alunosLiberados}>
            <h1 className={styles.title}>
              Alunos
              <br />
              Liberados
            </h1>
            <Field
              type="date"
              backColor="white"
              color="black"
              value={data}
              setValue={setData}
            />
            <Buttton backcolor={'red'} color={'white'} funcao={searchData}>
              BUSCAR
            </Buttton>
          </div>
        </div>
        <div className={'rightContent'}>
          {liberacoes.length > 0 ? (
            liberacoes.map((item, key) => (
              <ItemLiberacao
                key={key}
                nome={item.aluno.label}
                curso={item.aluno.curso}
                desc={item.motivo}
                hora={item.hora}
                inOut={item.inOut}
                status={item.status}
              ></ItemLiberacao>
            ))
          ) : (
            <p className={styles.noFound}>Nenhum registro encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlunosLiberados;
