import React from 'react';
import {Input} from 'antd';
import classes from './input.module.scss'

const PasswordInput = (props) => {
  return (
    <Input.Password
      {...props}
      placeholder="Введите пароль"
      className={classes.input}
    />
  );
};

export default PasswordInput;