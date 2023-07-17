import React from 'react';
import {Input} from "antd";
import classes from "./textInput.module.scss"

const TextInput = (props) => {
  return (
    <>
      <Input className={classes.input} {...props}/>
    </>
  );
};

export default TextInput;