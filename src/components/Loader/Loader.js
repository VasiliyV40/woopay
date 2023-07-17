import React from 'react';
import {Space, Spin} from "antd";
import classes from './loader.module.scss'

const Index = () => {
  return (
    <div className={classes.loader}>
      <Space>
        <Spin size="large">
          <div className="content" />
        </Spin>
      </Space>

    </div>

  );
};

export default Index;