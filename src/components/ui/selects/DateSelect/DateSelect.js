import React from 'react';

import {ConfigProvider, DatePicker} from "antd";
import classes from "./dateSelect.module.scss";

import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';

const DateSelect = (props) => {
  return (
      <DatePicker
        style={{width: "100%"}}
        className={classes.select}
        locale={locale}
        onChange={(data, dateString) => {
          props.onChange(props.name, dateString)
          return data
        }}
      />
  );
};

export default DateSelect;