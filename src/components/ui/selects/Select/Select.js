import React from 'react';
import {Select as ANTSelect} from "antd"
import classes from "./select.module.scss"

const { Option } = ANTSelect;

const Select = (props) => {
  return (
    <div className={classes.wrapper}>
      <ANTSelect
        className={classes.select}
        onChange={props.onChange}
        defaultValue={props.setDefault ? props.data[props.setDefault] : ""}
      >
        {props.data.map((el,ind)=>{
          return <Option key={ind} value={el.value}>{el.label}</Option>
        })}
      </ANTSelect>
    </div>
  );
};

export default Select;