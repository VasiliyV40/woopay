import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./six.module.scss";
import {Col, Row} from "antd";
import icon1 from "../../images/block-6-icon1.svg"
import icon2 from "../../images/block-6-icon2.svg"
import icon3 from "../../images/block-6-icon3.svg"
import icon4 from "../../images/block-6-icon4.svg"



class BlockSix extends Component {
  render() {
    return (
      <div className={classes.six}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>
            Гарантии безопасности
            и прозрачности
          </h2>
          <p>
            С PayHub, вы можете быть уверены, что каждая финансовая операция выполняется с максимальной ответственностью
            и в соответствии с высокими стандартами безопасности. Ваше финансовое благополучие - это наша забота.
          </p>
          <Row gutter={[24,24]}>
            <Col xs={24} sm={12} lg={6} className={classes.item}>
              <img src={icon1}/>
              <h4>
                Гарантированный<br/>
                возврат средств
              </h4>
              <p>
                В случае возникновения каких-либо проблем или ошибок в процессе перевода,
                мы обеспечиваем гарантированный возврат ваших средств. Ваша уверенность в нас - наша обязанность.
              </p>
            </Col>
            <Col xs={24} sm={12} lg={6} className={classes.item}>
              <img src={icon2}/>
              <h4>
                Защита ваших<br/>
                данных
              </h4>
              <p>
                Мы используем передовые методы шифрования и защиты данных, чтобы обеспечить полную конфиденциальность вашей информации.
                Ваши личные и финансовые данные надежно защищены.
              </p>
            </Col>
            <Col xs={24} sm={12} lg={6} className={classes.item}>
              <img src={icon3}/>
              <h4>
                Прозрачность<br/>
                транзакций
              </h4>
              <p>
                Вы всегда будете в курсе каждой транзакции благодаря нашей прозрачной отчетности. Вы можете отслеживать статус ваших переводов и операций в режиме реального времени.
              </p>
            </Col>
            <Col xs={24} sm={12} lg={6} className={classes.item}>
              <img src={icon4}/>
              <h4>
                Ответственность<br/>
                за операцию
              </h4>
              <p>
                Мы несем ответственность за каждую сделку и операцию. Наша команда поддержки всегда готова помочь вам в случае вопросов или затруднений.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockSix);