import React from 'react';
import {InputNumber as InputNumberNTD} from "antd";
import classes from './input.module.scss'

const InputNumber = (props) => {
  return (
    <div>
      <InputNumberNTD
        {...props}
        className={classes.input}
      />
    </div>
  );
};

export default InputNumber;