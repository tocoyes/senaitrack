import React from 'react';
import styles from './IconBt.module.css';
import iconX from '../../images/icons/x.svg';
import iconCheck from '../../images/icons/check.svg';

export const IconBt = ({ ...props }) => {
  return (
    <div
      className={styles.botao}
      style={{ backgroundColor: props.bcolor }}
      onClick={() => props.funcao()}
    >
      {props.icon == 'x' ? <img src={iconX} /> : <img src={iconCheck} />}
    </div>
  );
};
