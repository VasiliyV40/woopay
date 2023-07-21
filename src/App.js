import React, {Component} from 'react';
import './App.css';
import {Card, Col, Row, Form, Checkbox} from "antd";
import TextInput from "./components/ui/inputs/TextInput";
import MaskInput from "./components/ui/inputs/MaskInput";
import Select from "./components/ui/selects/Select";
import PrimaryButton from "./components/ui/buttons/PrimaryButton";
import axios from "axios";
import withRouter from "./hoc/withRouter";
import Loader from "./components/Loader/Loader";
import privacyPolicy from "./docs/privacy_policy.docx"
import offerAgreement from "./docs/offer_agreement.doc"



class App extends Component{

  sendingForm = React.createRef();

  state = {
    loading: false,
    checked: false
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
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
          <Card>
            <Form
              ref={this.sendingForm}
              layout="vertical"
            >
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
                    console.log("dfdsff", e.unmaskedValue)
                    changeField("Iin", e.unmaskedValue)
                  }}

                />
              </Form.Item>
              <Form.Item
                name="Sum"
                label="Сумма"
                rules={formValidateRules("required")}
              >
                <TextInput onChange={e => {
                  const value = e.target.value;
                  const changeVal = value
                    .replace(/,/, '.')
                    .replace(/[^.\d]+/g,"")
                    .replace( /^([^\.]*\.)|\./g, '$1' )

                  console.log("1werwerer", changeVal, typeof changeVal )

                  function numberWithSpaces(x) {
                    var parts = x.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    return parts.join(".");
                  }

                  changeField("Sum", numberWithSpaces(changeVal))}
                }/>
              </Form.Item>
              <div style={{marginTop: 40}}>
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

          </Card>
          <div style={{marginTop: "auto"}}>
            <Row>
              <Col span={24} style={{padding:"10px 0"}}>
                <a href={privacyPolicy} className="link">Политика конфиденциальности</a>
              </Col>
              <Col span={24} style={{padding:"10px 0"}}>
                <a href={offerAgreement} className="link">Договор оферты</a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
