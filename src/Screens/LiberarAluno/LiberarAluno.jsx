import React, { useState, useEffect } from 'react';
import styles from './LiberarAluno.module.css';
import Field from '../../Components/Fields/Field';
import Buttton from '../../Components/Button/Buttton';
import { db } from '../../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import AsyncSelect from 'react-select/async';
import { UserContext } from '../../Components/Storage/UserContext';
//teste cxom json externo
import listalunoRef from '../../dados/alunos24.json';

const LiberarAluno = () => {
  const [alunoSelected, setAlunoSelected] = useState(null);
  const [motivo, setMotivo] = useState('Tratamento de Saúde');
  let dataAtual = new Date();
  const [data, setData] = useState(dataAtual.toLocaleDateString());
  const [hora, setHora] = useState(dataAtual.toLocaleTimeString());
  const [menor, setMenor] = useState(true);
  const [contato, setContato] = useState('');
  const [inOut, setInOut] = useState('Saída');
  const [obs, setObs] = useState('');

  const { infoUser } = React.useContext(UserContext);
  //console.log(infoUser);

  /*-----------------------------*/
  const loadOptions = async (inputValue, callback) => {
    //TROCANDO O IMPORT NO BANCO PELO ARQUIVO JSON
    //try {
    //  const listalunoRef = collection(db, 'alunos');
    // const querySnapshot = await getDocs(listalunoRef);
    // const options = querySnapshot.docs.map((doc) => {
    //   return {
    //     matricula: doc.data().id,
    //     label: doc.data().name,
    //     curso: doc.data().curso,
    //     turma: doc.data().turma,
    //     tipo: doc.data().tipo,
    //   };
    // });

    try {
      const options = listalunoRef.map((doc) => {
        return {
          matricula: doc.id,
          label: doc.name,
          curso: doc.curso,
          turma: doc.turma,
          tipo: doc.tipo,
        };
      });

      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );

      callback(filteredOptions);
      //console.log(filteredOptions);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      callback([]);
    }
  };

  /*------------------------------*/

  useEffect(() => {
    //console.log(hora);
  }, [hora]);

  const changeValue = (e) => {
    //console.log(e);
    setAlunoSelected(e);
  };

  async function solicitarLiberacao() {
    try {
      addDoc(collection(db, 'liberacoes'), {
        aluno: alunoSelected,
        data: data.split(' ')[0].split('-').reverse().join('/'),
        hora: hora,
        docente: infoUser[0].nome,
        motivo: motivo,
        menor: menor,
        contato: contato,
        inOut: inOut,
        obs: obs,
        status: 'aprovada',
      });

      alert('Solicitação concluída.');
      console.log('Documento adicionado');
      setAlunoSelected(null);
    } catch (error) {
      alert('Ocorreu um erro, contact o suporte.');
      console.error('Erro ao adicionar documento:', error);
    } finally {
    }
  }

  return (
    <div className={'containerFull'}>
      <div className={'contents'}>
        <div className={'leftContent'}>
          <div className={styles.liberarAluno}>
            <h1 className={styles.title}>
              Solicitar
              <br />
              Liberação
            </h1>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onChange={changeValue}
              placeholder={'Digite o nome do aluno'}
              className={styles.fieldSearch}
              styles={{
                control: (base) => ({
                  ...base,
                  border: 0,
                  boxShadow: 'none',
                  width: '20rem',
                  fontSize: '1rem',
                  padding: '.5rem',
                  borderRadius: '1rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: 'black', // Custom colour
                }),
              }}
            />
          </div>
        </div>
        <div className={'rightContent'}>
          {alunoSelected ? (
            <div className={styles.contentSolicitar}>
              <div className={styles.dadosAlunos}>
                <h2>Nome:</h2>
                <p>{alunoSelected.label}</p>
                <h2>Matrícula:</h2>
                <p>{alunoSelected.matricula}</p>
                <h2>Curso:</h2>
                <p>{alunoSelected.curso}</p>
                <h2>Turma:</h2>
                <p>{alunoSelected.turma}</p>
                <h2>Tipo:</h2>
                <p>{alunoSelected.tipo}</p>
              </div>
              <div className={styles.fields}>
                <Field
                  label="Data"
                  type="date"
                  color="darkgray"
                  backColor="#f1f1f1"
                  value={data}
                  setValue={setData}
                />
                <Field
                  label="Hora"
                  type="time"
                  color="darkgray"
                  backColor="#f1f1f1"
                  value={hora}
                  setValue={setHora}
                />
                <label>
                  Motivo
                  <select
                    className={styles.motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    value={motivo}
                  >
                    <option value={'Tratamento de Saúde'}>
                      Tratamento de Saúde
                    </option>
                    <option value={'Luto'}>Luto</option>
                    <option value={'Acidente de trabalho'}>
                      Acidente de trabalho
                    </option>
                    <option value={'Outros'}>Motivos pessoais</option>
                  </select>
                </label>
                <label>
                  Entrada / Saída
                  <select
                    className={styles.motivo}
                    onChange={(e) => setInOut(e.target.value)}
                    value={inOut}
                  >
                    <option value={'Saída'}>Saída</option>
                    <option value={'Entrada'}>Entrada</option>
                  </select>
                </label>
                <div className={styles.idade}>
                  <input
                    type="checkbox"
                    checked={menor}
                    onChange={() => setMenor(!menor)}
                  />
                  <p>Menor de idade?</p>
                </div>
                {menor && (
                  <Field
                    label="Contato do responsável"
                    type="text"
                    color="darkgray"
                    backColor="#f1f1f1"
                    value={contato}
                    setValue={setContato}
                  />
                )}
                <label>
                  Observações
                  <textarea
                    onChange={(e) => setObs(e.target.value)}
                    value={obs}
                    className={styles.obs}
                  ></textarea>
                </label>
                <Buttton
                  backcolor={'red'}
                  color={'white'}
                  funcao={solicitarLiberacao}
                  loading={false}
                >
                  Solicitar
                </Buttton>
              </div>
            </div>
          ) : (
            <p className={styles.noFound}>Selecione o aluno.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiberarAluno;
