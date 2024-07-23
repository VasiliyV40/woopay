import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./fore.module.scss";
import {Col, Row} from "antd";
import img from "../../images/block-4-img.svg"

class BlockFore extends Component {
  render() {
    return (
      <div className={classes.fore}>
        <div className={classes.wrapper}>
          <Row gutter={20}>
            <Col md={12} xs={24}>
              <img src={img} className={classes.image}/>
            </Col>
            <Col md={12} xs={24}>
              <h2 className={classes.title}>
                Технологии и инновации,
                меняющие традиционные способы предоставления финансовых услуг
              </h2>
              <p>
                PayHub - это ведущая компания в сфере финансовых технологий, предоставляющая передовые решения
                для облегчения финансовых операций и совершения мгновенных переводов. Мы стремимся изменить
                традиционные способы предоставления финансовых услуг, делая их более доступными, удобными
                и безопасными для наших клиентов.
              </p>
              <div className={classes.subText}>
                <h4>У вас возникли вопросы?</h4>
                <div>
                  Напишите нам на <a href="mailteo:help@payhub.kz">help@payhub.kz</a><br/>
                  и мы в кратчайшие сроки свяжемся с вами!
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockFore);