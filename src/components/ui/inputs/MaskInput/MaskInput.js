import React from 'react';
import {MaskedInput} from 'antd-mask-input';
import classes from './maskInput.module.scss'

const MaskInput = (props) => {
  return (
    <>
      <MaskedInput
        {...props}
        className={classes.input}
        //value={"______-_-____-_"}
      />
    </>
  );
};

export default MaskInput;