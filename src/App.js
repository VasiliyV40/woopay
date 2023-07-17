import React, {Component} from 'react';
import './App.css';
import {Card, Form} from "antd";
import TextInput from "./components/ui/inputs/TextInput";
import MaskInput from "./components/ui/inputs/MaskInput";
import Select from "./components/ui/selects/Select";
import PrimaryButton from "./components/ui/buttons/PrimaryButton";
import axios from "axios";
import withRouter from "./hoc/withRouter";
import Loader from "./components/Loader/Loader";



class App extends Component{

  sendingForm = React.createRef();

  state = {
    loading: false
  }

  render() {

    const sendData = () => {

      this.sendingForm.current.validateFields().then((data) => {
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
      })
    }

    const changeField = (name, val) => {
      this.sendingForm.current.setFieldValue(name, val)
    }

    return (
      <div className="App">
        {
          this.state.loading && <Loader/>
        }
        <Card style={{}}>
          <Form
            ref={this.sendingForm}
            layout="vertical"
          >
            <Form.Item
              name="BankId"
              label="Банк"
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
            >
              <MaskInput
                name={"Iin"}
                mask={"000000-0-0000-0"}
                inputMode="tel"
              />
            </Form.Item>
            <Form.Item
              name="Sum"
              label="Сумма"
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
            <H1>dfdfdfd</H1>
            <div>
              <PrimaryButton
                title="Отправить"
                onClick={sendData}
              />
            </div>
          </Form>
        </Card>

      </div>
    );
  }
}

export default withRouter(App);
