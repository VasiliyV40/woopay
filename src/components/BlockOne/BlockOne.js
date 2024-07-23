import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./one.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner, faCircleNotch, faChevronUp, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import halyk from "../../images/bank-logo/halyk.svg"
import forte from "../../images/bank-logo/forte.svg"
import atf from "../../images/bank-logo/atf.svg"
import bcc from "../../images/bank-logo/bcc.svg"
import vtb from "../../images/bank-logo/vtb2.svg"
import Header from "../Header/Header";



class BlockOne extends Component {
  render() {
    return (
      <div className={classes.one}>
        <Header/>
        <div className={classes.wrapper}>
          <div className={classes.block}>
            <h1 className={classes.title}>
              Быстрые переводы
              на&nbsp;счет в&nbsp;банке
            </h1>
            <p>
              PayHub — это быстрый и надежный способ пополнить свой банковский счет с карты другого банка:
            </p>
            <div className={classes.logo}>
              <div className={classes.items}>
                <img src={vtb}/>
                <img src={halyk}/>
                <img src={forte}/>
                <img src={atf}/>
                <img src={bcc}/>
              </div>
              <div className={classes.text}>
                <FontAwesomeIcon icon={faChevronRight} color="#A2A9B5" />
                <span>и другие банки Казахстана</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockOne);