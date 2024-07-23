import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./footer.module.scss"
import {Col, Menu, Row, Space} from "antd";
import gradient from "../../images/bottom-circle-gradient.png"
import offer from "../../docs/offer_agreement.pdf"
import privacy from "../../docs/privacy_policy.pdf"


class Footer extends Component {
  state = {
    current: ""
  }
  componentDidMount() {
    var anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
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
        key: 'how',
        href: '#how'
      },
      /*{
        label: 'Наши тарифы',
        key: 'rate',
      },*/
      /*{
        label: 'Вопросы и ответы',
        key: 'question',
        href: '#question'
      },*/
      {
        label: 'Публичная оферта',
        key: 'offer',
        href: offer,
        target: "_blank"
      },
      {
        label: 'Политика безопасности',
        key: 'security',
        href: privacy,
        target: "_blank"
      },
    ]
    const onClick = (val) => {
      this.setState({current: val})
    }
    return (
      <div className={classes.footer} id="contacts">
        <div className={classes.wrapper}>
          <Row>
            <Col xs={24} lg={12}>
              <h2 className={classes.title} >
                Сделать
                перевод
              </h2>
              <p>
                Что бы совершить перевод
                пожалуйста, заполните поля
              </p>
            </Col>

          </Row>
          <Row>
            <Col xs={24} lg={12} className={classes.contact}>
              <Space size={[8, 16]} wrap>
                <div className={classes.item}>
                  <div>Пишите</div>
                  <a href="mailto:hello@payhub.kz">hello@payhub.kz</a>
                </div>
                <div className={classes.item} style={{marginRight:0}}>
                  <div>Наш адрес:</div>
                  <span>Казахстан, Алматы,<br/> Микрорайон АКСАЙ-2, дом 73, кв/офис 88</span>
                </div>
                {/*<div className={classes.item} style={{marginRight:0}}>
                  <div>Звоните</div>
                  <a href="tel:+70000000000">+7 (000) 000-00-00</a>
                </div>*/}
              </Space>
            </Col>
          </Row>
        </div>
        <div className={classes.copy}>
          <div className={classes.wrapper}>
            <Row gutter={[8, 16]} className={classes.copyCol}>
              <Col xs={24} md={12}>
                <p>© 2023 payhub.kz – ведущая компания в сфере финансовых технологий, предоставляющая передовые решения для совершения мгновенных переводов.</p>
              </Col>
              <Col xs={24} md={12}>
                <div className={classes.menu}>
                  {items.map(el => <a key={el.key} href={el.href} target={el?.target} className={classes.menuItem}>{el.label}</a>)}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);