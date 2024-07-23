import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./five.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";


class BlockFive extends Component {
  render() {
    return (
      <div className={classes.five}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>
            Мы установили гибкие ежедневные лимиты
            на&nbsp;суммы переводов:
          </h2>
          <p>
            Максимальная сумма перевода в тенге, рассчитанная по текущему курсу, составляет:
          </p>
          <ul>
            <li>• <b>2,500</b> $ за одну транзакцию.</li>
            <li>• <b>5,000</b> $ в день.</li>
            <li>• <b>10,000</b> $ в течение трех дней.</li>
          </ul>
          {/*<p>
          Кроме того, сумма перевода с карты Halyk Bank на карту любого банка в Республике Казахстан не может превышать 250,000 тенге.
        </p>
        <div className={classes.subText}>
          Наши клиенты имеют возможность совершать до 8 переводов в день. Также, отправители могут установить собственное ограничение на сумму перевода с использованием своей карты.
        </div>*/}
        </div>
      </div>

    );
  }
}

export default withRouter(BlockFive);