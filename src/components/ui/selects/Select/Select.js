import React from 'react';
import {Select as ANTSelect} from "antd"
import classes from "./select.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown, faXmark} from "@fortawesome/free-solid-svg-icons";

const { Option } = ANTSelect;

const Select = (props) => {
  return (
    <div className={classes.wrapper} id="bank-select">
      <ANTSelect

        className={classes.select}
        onChange={props.onChange}
        defaultValue={props.setDefault ? props.data[props.setDefault] : ""}
        suffixIcon={<FontAwesomeIcon icon={faChevronDown} color="#212D42" fontSize={"14px"}/>}
        getPopupContainer={() => document.getElementById("bank-select")}
      >
        {props.data.map((el,ind)=>{
          return <Option key={ind} value={el.value}>
            {el?.logo && <img alt={el.label} src={el?.logo}/>}
            {el.label}
          </Option>
        })}
      </ANTSelect>
    </div>
  );
};

export default Select;