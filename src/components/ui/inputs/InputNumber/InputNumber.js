import React from 'react';
import {InputNumber as InputNumberNTD, Select} from "antd";
import classes from './input.module.scss'
import {Option} from "antd/es/mentions";
import KZT from "../../../../images/flags/kzt.svg"
import RUB from "../../../../images/flags/rub.svg"
import EUR from "../../../../images/flags/eur.svg"
import USD from "../../../../images/flags/usd.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import TextInput from "../TextInput";

const InputNumber = (props) => {
  const country = [
    {
      value: "KZT",
      label: "KZT",
      icon: KZT
    }
  ]

  const country2 = [
    {
      value: "KZT",
      label: "KZT",
      icon: KZT
    },
    {
      value: "RUB",
      label: "RUB",
      icon: RUB
    },
    {
      value: "EUR",
      label: "EUR",
      icon: EUR
    },
    {
      value: "USD",
      label: "USD",
      icon: USD
    },
  ]

  const data = props.payment? country : country2

  const selectBefore = (
    <Select
      defaultValue="KZT"
      suffixIcon={<FontAwesomeIcon icon={faChevronDown} color="#212D42" fontSize={"14px"}/>}
      className="currSelect"
      onChange={val => props.changeSelect(props.name, val)}
    >
      {data.map((el,ind)=>{
        return <Option key={ind} value={el.value}>
          {el?.icon && <img alt={el.label} src={el?.icon}/>}
          {el.label}
        </Option>
      })}
    </Select>
  );
  return (
    <div>
      <TextInput
        {...props}
        addonBefore={selectBefore}
        className={classes.input}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputNumber;