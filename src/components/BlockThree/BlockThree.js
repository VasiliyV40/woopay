import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./three.module.scss";
import {Col, Row} from "antd";
import icon1 from "../../images/block-2-icon1.svg";
import {faChevronRight, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class BlockThree extends Component {
  render() {
    return (
      <div className={classes.three}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>
            Простой и понятный метод
            для перевода денег.
          </h2>
          <p>
            Найдите свой банк в списке, заполните поля с информацией о карте и ИНН, и деньги моментально поступят на ваш счёт.
            Быстрый и простой процесс, разработанный для вашего удобства.
          </p>
          <Row gutter={32}>
            <Col span={8} xs={24} sm={8} className={classes.item}>
              <img src={icon1}/>
              Найдите свой<br/>
              банк в списке
            </Col>
            <Col span={8} xs={24} sm={8} className={classes.item}>
              <img src={icon1}/>
              Заполните<br/>
              поля
            </Col>
            <Col span={8} xs={24} sm={8} className={classes.item}>
              <img src={icon1}/>
              Деньги моментально*<br/> поступят на ваш счёт
            </Col>
          </Row>
          <div className={classes.subText}>
            <FontAwesomeIcon icon={faCircleInfo} color="#A2A9B5" />
            <span>
            Мы обработаем ваш перевод моментально, но, в зависимости от банка-получателя и его скорости обработки операций, зачисление может занять до трёх рабочих дней.
          </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockThree);