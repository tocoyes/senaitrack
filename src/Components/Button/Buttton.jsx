import React from 'react';
import styles from './Button.module.css';

const Buttton = (props) => {
  return (
    <div>
      {!props.loading ? (
        <div
          className={styles.button}
          style={{ backgroundColor: props.backcolor, color: props.color }}
          onClick={() => props.funcao()}
        >
          {props.children}
        </div>
      ) : (
        <div
          className={styles.button}
          style={{ backgroundColor: 'silver', color: 'black' }}
        >
          Carregando...
        </div>
      )}
    </div>
  );
};

export default Buttton;
