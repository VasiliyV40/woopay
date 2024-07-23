import React, {Component} from 'react';
import classes from "./header.module.scss";
import {Anchor, Menu, Row} from "antd";
import logo from "../../images/logo.svg"
import withRouter from "../../hoc/withRouter";



class Header extends Component {

  state = {
    current: "",
    width: 0
  }

  resize() {
    this.setState({width: window.innerWidth});
  }


  componentDidMount() {

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {

      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        console.log("!!!!!!!!!!! " , anchor)
        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }


  render() {
    const {current} = this.state
    const items = [
      {
        label: 'Как это работает?',
        title: 'Как это работает?',
        key: 'how',
        href: "#how",
      },
      /*{
        label: 'Наши тарифы',
        key: 'rate',
      },*/
      /*{
        label: 'Вопросы и ответы',
        title: 'Вопросы и ответы',
        key: 'question',
        href: "#question",
      },*/
      {
        label: 'Контакты',
        title: 'Контакты',
        key: 'contacts',
        href: "#contacts",
      },
    ]
    const onClick = (val) => {
      this.setState({current: val})

    }
    return (

      <div className={classes.header}>

        <div className={classes.logoWrapper}><img alt="PayHub" src={logo} className={classes.logo}/></div>
        <div style={{width:"100%", maxWidth: 240}}>
          {/*<Anchor
            direction="horizontal"
            items={items}
          />*/}
          <div className={classes.menu}>
            {
              items.map(el => {
                return <a href={el.href} className={classes.link}>{el.label}</a>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);