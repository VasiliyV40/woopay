import React from 'react';
import {Button, Space} from 'antd';
import classes from './button.module.scss'
import {Link} from "react-router-dom";

const PrimaryButton = (props) => {
  const {title, link, size, type} = props
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      {link ?
        <Link to={`${link}`}>
          <Button
            {...props}
            size={size ? size : "large"}
            type="primary"
            block
            className={classes.button}
          >
            {title}
          </Button>
        </Link> :
        <Button
          {...props}
          size={size ? size : "large"}
          type="primary"
          block
          className={`${classes.button} ${type ? classes.default : null} `}
          onClick={props?.onClick}
        >
          {title}
        </Button>
      }
    </Space>
  );
};

export default PrimaryButton;