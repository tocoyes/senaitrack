import React from 'react';
import styles from './Field.module.css';

const Field = ({ value, setValue, ...props }) => {
  return (
    <label>
      {props.label}
      <input
        name={props.label}
        className={styles.inputs}
        type={props.type}
        style={{ backgroundColor: props.backColor, color: props.color }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </label>
  );
};

export default Field;
