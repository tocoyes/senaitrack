import React, { useEffect } from 'react';
import styles from './ItemLiberacao.module.css';

const ItemLiberacao = ({ ...props }) => {
  const [backcolor, setBackColor] = React.useState('#CBCBCB');

  useEffect(() => {
    if (props.status == 'aprovada') {
      setBackColor('#b0ffc5');
    } else if (props.status == 'reprovada') {
      setBackColor('#fccfca');
    } else {
      setBackColor('#CBCBCB');
    }
  }, [backcolor, props.status]);

  return (
    <div className={styles.item} style={{ backgroundColor: backcolor }}>
      <p className={styles.title}>{props.nome}</p>
      <p className={styles.curso}>{props.curso}</p>
      <p className={styles.inOut}>{props.inOut}</p>
      <p className={styles.desc}>{props.desc}</p>
      <p className={styles.hora}>{props.hora}</p>
    </div>
  );
};

export default ItemLiberacao;
