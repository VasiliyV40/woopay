import React, {Component} from 'react';
import './App.css';
import {Card, Col, Row, Form, Checkbox, Space, Layout, ConfigProvider} from "antd";
import TextInput from "./components/ui/inputs/TextInput";
import MaskInput from "./components/ui/inputs/MaskInput";
import Select from "./components/ui/selects/Select";
import PrimaryButton from "./components/ui/buttons/PrimaryButton";
import axios from "axios";
import withRouter from "./hoc/withRouter";
import Loader from "./components/Loader/Loader";
import privacyPolicy from "./docs/privacy_policy.pdf"
import offerAgreement from "./docs/offer_agreement.pdf"
import visa from './images/visa_bottom_logo.png';
import visa2 from './images/visa2_bottom_logo.png';
import mastercard from "./images/mastercard_bottom_logo.png"
import mastercardsc from "./images/mastercard_sc_logo.png"
import maestro from "./images/maestro_bottom_logo.png"
import Header from "./components/Header";
import './fonts/fonts.css';
import BlockOne from "./components/BlockOne";
import BlockTwo from "./components/BlockTwo";
import BlockThree from "./components/BlockThree";
import BlockFore from "./components/BlockFore";
import BlockFive from "./components/BlockFive";
import BlockSix from "./components/BlockSix";
import BlockSeven from "./components/BlockSeven";
import Footer from "./components/Footer";
import FloatForm from "./components/FloatForm";
import gradient from "./images/bottom-circle-gradient.png";
import classes from "./components/BlockSeven/seven.module.scss";



class App extends Component{

  sendingForm = React.createRef();

  state = {
    loading: false,
    checked: false
  }

  componentDidMount() {

  }

  render() {

    const formValidateRules = (id, val) => {
      switch (id) {
        case "required":
          return [
            {
              required: true,
              message: 'Обязательное поле'
            }
          ];
        case "minLength":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              type: 'string',
              min: val ? val : 2,
              message: val ? `Должно содержать больше ${val} символов` : 'Слишком мало символов',
            }
          ];
        case "length":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              min: val,
              message: `Должно содержать ${val} цифр`,
            }
          ];
        case "phone":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              len: val,
              message: `Должно содержать ${val} цифр`,
            }
          ];
        case "date":
          return [
            {
              required: true, message: 'Необходимо указать дату'
            }
          ];
        case "latitude":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              pattern: `-?\\d{1,3}\\.\\d+`,
              message: "Не соответствует формату широты"
            }
          ];
        case "longitude":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              pattern: `-?\\d{1,3}\\.\\d+`,
              message: "Не соответствует формату долготы"
            }
          ];
        case "email":
          return [
            {
              required: true,
              message: 'Обязательное поле',
            },
            {
              pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Не соответствует формату e-mail"
            }
          ];
        default: return []
      }
    }

    const sendData = () => {

      this.sendingForm?.current.validateFields().then((data) => {
        this.setState({
          loading: true
        })
        const dataReplace = {BankId: Number(data.BankId), Sum: Number(data.Sum.replace(/\s/g, "")), Iin: data.Iin.replace(/-/g, "")}
        axios.post("https://api.proidea.tech/exchange/test_woopay", dataReplace).then(({data}) => {
          if(data.isSuccess) {
            window.location.href = data.redirectionUrl;
          } else {
            this.setState({
              loading: false
            })
          }
          return null;
        })
      }).catch(error => {
        this.setState({
          loading: false
        })
      })
    }

    const changeField = (name, val) => {
      this.sendingForm.current.setFieldValue(name, val)
    }

    const onChange = () => {
      const prewCheck = this.state.checked
      this.setState({
        checked: !prewCheck
      })
    }

    return (

        <div className="App">
          {
            this.state.loading && <Loader/>
          }
          <div className="page">
              <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center"}}>
                {/*<Header/>*/}
                <BlockOne/>
                <FloatForm/>
                <BlockTwo/>
                <BlockThree/>
                <BlockFore/>
               {/* <BlockFive/>*/}
                <BlockSix/>
                {/*<BlockSeven/>*/}
                <Footer/>
                <img src={gradient} className="gradient"/>

                {/*<div className="formWrap">
                  <Form
                    ref={this.sendingForm}
                    layout="vertical"
                  >
                    <Card className="card">
                      <div className="pay-sys"/>
                      <Form.Item
                        name="BankId"
                        label="Банк"
                        rules={formValidateRules("required")}
                      >
                        <Select
                          data={[
                            { value: '1', label: 'BTБ' },
                            { value: '2', label: 'HALYK' },
                            { value: '3', label: 'KASPI' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        name="Iin"
                        label="ИИН"
                        rules={formValidateRules("length", 12)}
                      >
                        <MaskInput
                          name={"Iin"}
                          mask={"000000-0-0000-0"}
                          inputMode="tel"
                          onChange={(e) => {
                            changeField("Iin", e.unmaskedValue)
                          }}

                        />
                      </Form.Item>
                    </Card>
                    <Form.Item
                      name="Sum"
                      label="Сумма"
                      rules={formValidateRules("required")}
                      style={{marginTop: 20}}
                    >
                      <TextInput type="number" onChange={e => {
                        const value = e.target.value;
                        const changeVal = value
                          .replace(/,/, '.')
                          .replace(/[^.\d]+/g,"")
                          .replace( /^([^\.]*\.)|\./g, '$1' )
                        function numberWithSpaces(x) {
                          var parts = x.toString().split(".");
                          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                          return parts.join(".");
                        }
                        changeField("Sum", numberWithSpaces(changeVal))}
                      }/>
                    </Form.Item>
                    <div style={{marginTop: 30}}>
                      <PrimaryButton
                        title="Отправить"
                        onClick={sendData}
                        disabled={!this.state.checked}
                      />
                    </div>
                  </Form>
                  <div style={{textAlign:"left", marginTop: 30}}>
                    <Checkbox onChange={onChange}>Я согласен с договором оферты</Checkbox>
                  </div>
                </div>*/}
                {/*<div style={{marginTop: "auto"}}>
                  <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <div style={{marginTop: 50}}>
                      <Row>
                        <Col span={24} style={{padding:"6px 0"}}>
                          <a href={privacyPolicy} className="link">Политика конфиденциальности</a>
                        </Col>
                        <Col span={24} style={{padding:"6px 0"}}>
                          <a href={offerAgreement} className="link">Договор оферты</a>
                        </Col>
                      </Row>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", maxWidth: 460, margin: "30px auto 0 auto", width: "100%", opacity: 0.6}}>
                      <div className="icon"><img src={visa} className="bottom-logo" alt="logo" /></div>
                      <div className="icon"><img src={visa2} className="bottom-logo" alt="logo" /></div>
                      <div className="icon"><img src={mastercard} className="bottom-logo" alt="logo" /></div>
                      <div className="icon"><img src={maestro} className="bottom-logo" alt="logo" /></div>
                      <div className="icon"><img src={mastercardsc} className="bottom-logo" alt="logo" /></div>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
        </div>


    );
  }
}

export default withRouter(App);
