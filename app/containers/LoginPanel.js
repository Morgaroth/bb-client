import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";

class LoginPanel extends Component {

  handleEnterInNumber(e) {
    if (e.keyCode === 13) {
      this.handlePhoneNumber();
    }
  };

  handleSmsCodeEnter(e) {
    if (e.keyCode === 13) {
      this.handleSmsCode();
    }
  };

  getValidatedPhoneNumber() {
    console.log("getting validated phone number");
    let a = document.getElementById("login.input");
    let value = a.value;
    // TODO add more validation
    let isPoland = (value.length === 12 && value.substring(0, 3) === "+48");
    let isUK = (value.length === 14 && value.substring(0, 4) === "+440");
    if (isPoland || isUK) {
      return value
    }
    if (value.length === 9) {
      value = "+48" + value;
      return value
    }
    if (value.length === 11 && value.substring(0, 3) !== "48" && value[0] === "0") {
      value = "+44" + value;
      return value
    }
    return undefined;
  };

  handlePhoneNumber() {
    let phoneNumber = this.getValidatedPhoneNumber();
    if (phoneNumber !== undefined) {
      this.props.actions.tryLogin(phoneNumber)
    }
  };

  getValidatedSmsCode() {
    let a = document.getElementById("login.smscode");
    let value = a.value;
    if (value.length === 4) {
      return value
    }
    return undefined
  };

  handleSmsCode() {
    let phoneNumber = this.getValidatedPhoneNumber();
    let smsCode = this.getValidatedSmsCode();
    if (phoneNumber !== undefined && smsCode !== undefined) {
      this.props.actions.proceedLogin(phoneNumber, smsCode)
    }
  };

  register() {
    let name = document.getElementById("register.name").value;
    let surname = document.getElementById("register.surname").value;
    let phone = document.getElementById("register.phone").value;
    let email = document.getElementById("register.email").value;
    if (name.length > 1 && surname.length > 1 && email.length > 4 && [9, 12].indexOf(phone.length) >= 0) {
      this.props.onRegister(name, surname, phone, email)
    }
  };

  render() {
    const {serviceUrl} = this.props;
    return (
      <div>
        <div>
          <a>Current url to service is {serviceUrl}</a><br/>
        </div>
        <div>
          <h2>Login</h2>
          <p>Possible values here:</p>
          <ul>
            <li>* UK number in format: +4401123123123 (country code, 0 and 10 digits)</li>
            <li>* UK number in format: 01123123123 (0 and 10 digits are inferred as UK number)</li>
            <li>* PL number in format: +48123123123 (country code and 9 digits)</li>
            <li>* PL number in format: 11123123123 (only 9 digits are inferred as PL number)</li>
          </ul>
          <p>No spaces allowed at this moment :/</p>
          <p>First put phone number, click 'Send sms!' button, next write received sms code and click 'Login!'</p>
          <input id="login.input" type="text" onKeyUp={this.handleEnterInNumber.bind(this)}/>
          <button onClick={this.handlePhoneNumber.bind(this)}>Send sms!</button>
          <br/>
          <input id="login.smscode" type="text" onKeyUp={this.handleSmsCodeEnter.bind(this)}/>
          <button onClick={this.handleSmsCode.bind(this)}>Login!</button>
        </div>
        <hr/>
        <div>
          <h2>Register</h2>
          <text>Name:</text>
          <input id="register.name" type="text"/><br/>
          <text>Surname:</text>
          <input id="register.surname" type="text"/><br/>
          <text>Phone:</text>
          <input id="register.phone" type="text"/><br/>
          <text>Email:</text>
          <input id="register.email" type="text"/><br/>
          <button onClick={this.register.bind(this)}>Register me!</button>
        </div>
      </div>
    )
  }
}

LoginPanel.propTypes = {
  actions: PropTypes.object.isRequired,
  serviceUrl: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    serviceUrl: state.auth.url
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPanel)