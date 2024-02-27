import React, { useEffect } from 'react';
import styles from './ItemPendencia.module.css';
import { IconBt } from '../../Components/IconBt/IconBt';

const ItemPendencia = ({ ...props }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{props.nome}</p>
      <p className={styles.curso}>{props.curso}</p>
      <p className={styles.desc}>{props.desc}</p>
      {props.menor && (
        <p className={styles.curso}>
          Aluno Menor
          <br />
          Resonsável: {props.contato}
        </p>
      )}
      {props.obs != '' && (
        <p className={styles.curso}>Observações: {props.obs}</p>
      )}

      <p className={styles.desc}>{props.inOut + ' - ' + props.data}</p>
      <p className={styles.hora}>{props.hora}</p>
      <IconBt
        icon="x"
        bcolor="red"
        fcolor="white"
        funcao={() => props.funcao1(props.id)}
      />
      <IconBt
        icon="check"
        bcolor="green"
        fcolor="white"
        funcao={() => props.funcao2(props.id)}
      />
    </div>
  );
};

export default ItemPendencia;
