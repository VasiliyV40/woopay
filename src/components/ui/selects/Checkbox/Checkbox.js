import React from 'react';
import {Checkbox as Checker} from "antd";
import classes from './checkbox.module.scss'

const Checkbox = (props) => {
  return (
    <Checker className={classes.checkbox} onChange={e => props.onChange(props.name, e.target.checked === true ? true : undefined)}>
      {props.title}
      {props.required ? <span style={{color: "#ff4d4f"}}>*</span>: null}
    </Checker>
  );
};

export default Checkbox;