import React, {Component} from 'react';
import './App.css';
import {Button, Card, Form} from "antd";
import TextInput from "./components/ui/inputs/TextInput";
import MaskInput from "./components/ui/inputs/MaskInput";
import Select from "./components/ui/selects/Select";
import PrimaryButton from "./components/ui/buttons/PrimaryButton";
import axios from "axios";



class App extends Component{

  sendingForm = React.createRef();


  render() {

    const sendData = () => {
      const data = this.sendingForm.current.getFieldsValue()
      const dataReplace = {...data, Sum: data.Sum.replace(/\s/g, ""), Iin: data.Iin.replace(/-/g, "")}
      console.log("Sending6767676наа", dataReplace)

      this.sendingForm.current.validateFields().then((data) => {
        const dataReplace = {...data, Sum: data.Sum.replace(/\s/g, ""), Iin: data.Iin.replace(/-/g, "")}
        axios.post("https://api.proidea.tech/exchange/test_woopay", dataReplace).then((resp) => {
          console.log("Resp", resp)
        })
      })

    }

    const changeField = (name, val) => {
      this.sendingForm.current.setFieldValue(name, val)
    }

    return (
      <div className="App">
        <Card style={{}}>
          <Form
            ref={this.sendingForm}
          >
            <Form.Item
              name="BankId"
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
            >
              <MaskInput
                name={"Iin"}
                mask={"000000-0-0000-0"}
                inputMode="tel"
              />
            </Form.Item>
            <Form.Item
              name="Sum"
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

export default App;
