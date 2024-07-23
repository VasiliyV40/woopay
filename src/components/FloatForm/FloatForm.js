import React, {Component} from 'react';
import withRouter from "../../hoc/withRouter";
import classes from "./form.module.scss";
import {Col, Form, Popover, Row, Tabs, Tooltip} from "antd";
import Card from "antd/es/card/Card";
import Select from "../ui/selects/Select";
import MaskInput from "../ui/inputs/MaskInput";
import TextInput from "../ui/inputs/TextInput";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import axios from "axios";
import Halyk from "../../images/bank-logo/halyk.svg"
import Forte from "../../images/bank-logo/forte.svg"
import ATF from "../../images/bank-logo/atf.svg"
import BCC from "../../images/bank-logo/bcc.svg"
import VTB from "../../images/bank-logo/vtb2.svg"
import InputNumber from "../ui/inputs/InputNumber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import { faCircleInfoStroke} from "@fortawesome/free-solid-svg-icons";
import help from '../../images/help-icon.svg';
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";


class FloatForm extends Component {

  sendingForm = React.createRef();
  sendingFormTwo = React.createRef();

  state = {
    loading: false,
    checked: true,
    exchange: [],
    payment: "KZT",
    receive: "KZT",
    got: "",
    tabs: 1
  }

  componentDidMount() {
    /*axios.get('https://api.proidea.tech/exchange/get_rates').then(({data}) => {
      this.setState({
        loading: false,
        exchange: data.item
      })
    })*/
  }

  render() {
    const {loading, exchange, payment, receive} = this.state
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
        default:
          return []
      }
    }

    const hasVal = () => {
      return this.sendingForm?.current.getFieldValue("payment") !== null
        && this.sendingForm?.current.getFieldValue("payment") !== undefined
        && this.sendingForm?.current.getFieldValue("payment") !== 0;
    }

    const numberWithSpaces = (x) => {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }

    const changeField = (name, val, form) => {
      form.current.setFieldValue(name, val)
      if (hasVal() && name === "payment"){
        const got = this.state.exchange?.find(el => el.title === receive)
          ? (Number(val.replace(/\s/g, "")) / exchange.find(el => el.title === receive).description).toFixed(5)
          : Number(val.replace(/\s/g, ""))
        form?.current.setFieldValue("receive", numberWithSpaces(got) )
      } else if(name === "payment") {form?.current.setFieldValue("receive", 0 )}

    }

    const changeSelect = (name, val) => {
      this.setState({
        [name]: val,

      },() => {
        const r = this.state.receive
        console.log("!!!!!!!!!!!! ", this.sendingForm?.current.getFieldValue("payment"))
        if(hasVal()){
          const got = this.state.exchange?.find(el => el.title === r)
            ? (Number(this.sendingForm?.current.getFieldValue("payment").replace(/\s/g, "")) / exchange.find(el => el.title === r).description).toFixed(5)
            : Number(this.sendingForm?.current.getFieldValue("payment").replace(/\s/g, ""))
          this.sendingForm?.current.setFieldValue("receive", got )
        } else this.sendingForm?.current.setFieldValue("receive", 0 )

      })
    }

    const setExchange = () => {
      return this.state.exchange?.find(el => el.title === receive) ?
        (1 / exchange.find(el => el.title === receive).description).toFixed(5) :
        "1 KZT"
    }

    const formatData = (data) => {
      if(this.state.tabs === 1){
        return {
          BankId: Number(data.BankId),
          payment: Number(data.payment.replace(/\s/g, "")),
          iin: data.iin.replace(/-/g, "")
        }
      } else {
        return {
          recipientPhoneNumber: Number(data.recipientPhoneNumber),
          recipientCard: Number(data.recipientCard.replace(/-/g, "")),
          withdrawalAmount: data.withdrawalAmount.replace(/\s/g, "")
        }
      }
    }

    const sendData = (form) => {
      form.current.validateFields().then((formData) => {
        this.setState({
          loading: true
        })
        axios.post("https://api.proidea.tech/exchange/test_woopay", formatData(formData)).then(({data}) => {
          if (data.isSuccess) {
            window.location.href = data.redirectionUrl;
          } else {

            this.setState({
              loading: false
            })
          }
          return null;
        })
      }).catch(error => {
        console.log("ERROR", error)
        this.setState({
          loading: false
        })
      })
    }

    const replenishmentForm = <Form
      ref={this.sendingForm}
      layout="vertical"
    >
      <Form.Item
        name="bankId"
        label="Выберите банк"
        rules={formValidateRules("required")}
      >
        <Select
          data={[
            {value: '1', label: 'VTB Bank', logo: VTB},
            {value: '2', label: 'Halyk Bank', logo: Halyk},
            {value: '3', label: 'Forte Bank', logo: Forte},
            {value: '4', label: 'ATF Bank', logo: ATF},
            {value: '5', label: 'Банк ЦентрКредит', logo: BCC},
          ]}
        />
      </Form.Item>
      <Form.Item
        name="iin"
        label="Ваш ИИН"
        rules={formValidateRules("length", 12)}
      >
        <MaskInput
          name={"iin"}
          mask={"000-000-000-000"}
          inputMode="tel"
          onChange={(e) => {
            changeField("iin", e.unmaskedValue, this.sendingForm)
          }}

        />
      </Form.Item>
      <Form.Item
        name="payment"
        label="Вы отправляете"
        rules={formValidateRules("required")}
      >
        <InputNumber
          payment
          defaultValue={0}
          onChange={e => {
            const value = e.target.value;
            const changeVal = value
              .replace(/,/, '.')
              .replace(/[^.\d]+/g,"")
              .replace( /^([^\.]*\.)|\./g, '$1' )


            changeField("payment", numberWithSpaces(changeVal), this.sendingForm)
          }}
          changeSelect={changeSelect}
        />
        {/*<TextInput type="number" onChange={e => {
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
            }/>*/}
      </Form.Item>
      <Form.Item
        name="receive"
        label="Получатель получит"
        //rules={formValidateRules("required")}
        style={{marginTop: 20}}

      >
        <InputNumber
          readOnly
          payment
          name="receive"
          changeSelect={changeSelect}
          defaultValue={0}
        />
      </Form.Item>
      <div className={classes.info}>
        <div className={classes.item}>
              <span>
                Курс валют:
              </span>
          <div className={classes.exchange}>
            1 KZT = {setExchange()}
          </div>
        </div>
        <div className={classes.item}>
              <span>
                Комиссия за перевод:
              </span>
          <div>
            0 KZT
            <Tooltip title="Подсказка">
              <img src={help} style={{marginLeft: 8}}/>
            </Tooltip>

          </div>
        </div>
      </div>
      <div style={{marginTop: 16}}>
        <PrimaryButton
          title="Отправить"
          onClick={() => sendData(this.sendingForm)}
          disabled={!this.state.checked}
        />
      </div>
      <div className={classes.subInfo}>
        <FontAwesomeIcon icon={faCircleInfo} color="#A2A9B5" />
        <span>
              Мы обработаем ваш перевод моментально, но, в зависимости от банка-получателя
              и его скорости обработки операций, зачисление может занять до трёх рабочих дней.
            </span>
      </div>
    </Form>

    const withdrawalForm = <
      Form
      ref={this.sendingFormTwo}
      layout="vertical"

    >
      <Form.Item
        name="recipientPhoneNumber"
        label="Номер телефона получателя"
        rules={formValidateRules("length", 10)}
      >
        <MaskInput
          name={"recipientPhoneNumber"}
          mask={"8 (000) 000-00-00"}
          inputMode="tel"
          onChange={(e) => {
            changeField("recipientPhoneNumber", e.unmaskedValue, this.sendingFormTwo)
          }}

        />
      </Form.Item>
      <Form.Item
        name="recipientCard"
        label="Номер карты получателя"
        rules={formValidateRules("length", 12)}
      >
        <MaskInput
          name={"recipientCard"}
          mask={"0000-0000-0000-0000"}
          inputMode="tel"
          onChange={(e) => {
            changeField("recipientCard", e.unmaskedValue, this.sendingFormTwo)
          }}

        />
      </Form.Item>
      <Form.Item
        name="withdrawalAmount"
        label="Сумма вывода"
        rules={formValidateRules("required")}
      >
        <InputNumber
          payment
          defaultValue={0}
          onChange={e => {
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
            changeField("withdrawalAmount", numberWithSpaces(changeVal), this.sendingFormTwo)
          }}
          changeSelect={changeSelect}
        />
        {/*<TextInput type="number" onChange={e => {
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
            }/>*/}
      </Form.Item>

      <div className={classes.subInfo}>
        <FontAwesomeIcon icon={faCircleInfo} color="#A2A9B5" />
        <span>Перевод собственных средства на&nbsp;своей&nbsp;счёт в другом банке</span>
      </div>
      <div style={{marginTop: 16}}>
        <PrimaryButton
          title="Отправить"
          onClick={() => sendData(this.sendingFormTwo)}
          disabled={!this.state.checked}
        />
      </div>


    </Form>

    const onChangeTabs = (key) => {
      console.log(key);
      this.setState({
        tabs: key
      })
    };

    const items = [
      {
        key: '1',
        label: 'Пополнение',
        children: replenishmentForm,
      },
      {
        key: '2',
        label: 'Вывод',
        children: withdrawalForm,
      },
    ];
    console.log("STATE ", this.state)

    return (
      !loading ?
      <div className={classes.form}>

        <Tabs
          tabBarStyle={{fontSize: 20}}
          size={"large"}
          popupClassName={classes.tab}
          defaultActiveKey="1" items={items} onChange={onChangeTabs} />


      </div> : <Loader/>
    );
  }
}

export default withRouter(FloatForm);