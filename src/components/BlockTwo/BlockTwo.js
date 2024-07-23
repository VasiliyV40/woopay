import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./two.module.scss";
import {Col, Row} from "antd";
import icon1 from "../../images/block-2-icon1.svg";



class BlockTwo extends Component {
  render() {
    return (
      <div className={classes.two} id="how">
        <div className={classes.wrapper}>
          <div className={classes.block}>
            <h2 className={classes.title}>
              Вам необходимо срочно погасить кредит, но&nbsp;средства находятся в&nbsp;другом банке?
            </h2>
            <p>
              PayHub приходит на&nbsp;помощь. С нашим сервисом вы можете мгновенно пополнить счёт в&nbsp;любом банке,
              не&nbsp;зависимо от времени суток. Таким образом, вы избежите неприятных последствий в&nbsp;виде просроченных платежей.
            </p>
            <Row gutter={[16, 56]} className={classes.advantages}>
              <Col xl={12} lg={12} sm={12} xs={24} className={classes.item}>
                <img src={icon1}/>
                Гарантия безопасности транзакций
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24} className={classes.item}>
                <img src={icon1}/>
                Гарантия безопасности транзакций
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24} className={classes.item}>
                <img src={icon1}/>
                Гарантия безопасности транзакций
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24} className={classes.item}>
                <img src={icon1}/>
                Гарантия безопасности транзакций
              </Col>
            </Row>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(BlockTwo);