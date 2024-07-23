import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./seven.module.scss"
import {Collapse} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown, faXmark} from "@fortawesome/free-solid-svg-icons";
import gradient from "../../images/bottom-circle-gradient.png";


class BlockSeven extends Component {
  render() {

    const text = `3-х значный код, который расположен на обратной стороне карты, необходимый для дополнительной аутентификации владельца карты. При наличии данного кода карта пригодна для оплаты в Интернете.`
    const items = [
      {
        key: 1,
        label: 'Как это работает?',
        children: <p>{text}</p>,
      },
      {
        key: 2,
        label: 'Что такое CVV2, CVC2?',
        children: <p>{text}</p>,
      },
      {
        key: 3,
        label: 'Какой лимит перевода?',
        children: <p>{text}</p>,
      },
      {
        key: 4,
        label: 'Что делать в случае возникновения ошибки «SORRY, AN INTERNAL ERROR OCCURRED»?',
        children: <p>{text}</p>,
      },
      {
        key: 5,
        label: 'Гарантирована ли безопасность данных моей платежной карты?',
        children: <p>{text}</p>,
      },
    ];

    return (
      <div className={classes.seven} id="question">
        <div className={classes.wrapper}>
          <h2 className={classes.title}>
            Ответы на часто
            задаваемые вопросы
          </h2>
          <Collapse
            accordion
            bordered={false}
            expandIconPosition="end"
            items={items}
            className={classes.accordion}
            expandIcon={({ isActive }) => !isActive
              ? <FontAwesomeIcon icon={faChevronDown} color="#212D42" fontSize={"21px"}/>
              : <FontAwesomeIcon icon={faXmark} color="#212D42" fontSize={"21px"}/>
            }
          />
        </div>

      </div>

    );
  }
}

export default withRouter(BlockSeven);