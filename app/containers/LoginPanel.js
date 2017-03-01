import React, {Component, PropTypes} from "react";


class LoginPanel extends Component {


  handleEnter(e) {
    console.log(e);
    if (e.keyCode === 13) {
      this.setUrl();
    }
  }

  setUrl() {
    let a = document.getElementById("login.input");
    let value = a.value;
    // TODO add more validation
    if (value.length == 12) {
      this.props.onChange(value)
    }
    if (value.length == 9) {
      value = "+48" + value;
      this.props.onChange(value)
    }
  };

  register() {
    let name = document.getElementById("register.name").value;
    let surname = document.getElementById("register.surname").value;
    let pin = document.getElementById("register.pin").value;
    let phone = document.getElementById("register.phone").value;
    let email = document.getElementById("register.email").value;
    if (name.length > 1 && surname.length > 1 && pin.length == 4 && email.length > 4 && [9, 12].indexOf(phone.length) >= 0) {
      this.props.onRegister(name, surname, pin, phone, email)
    }
  }

  render() {
    const {serviceUrl} = this.props;
    return (
      <div>
        <div>
          <a>Current url to service is {serviceUrl}</a><br/>
          <input id="login.input" type="text" onKeyUp={this.handleEnter.bind(this)}/>
          <button onClick={this.setUrl.bind(this)}>Login!</button>
        </div>
        <hr/>
        <div>
          <text>Name:    </text><input id="register.name" type="text"/><br/>
          <text>Surname: </text><input id="register.surname" type="text"/><br/>
          <text>PIN:     </text><input id="register.pin" type="password"/><br/>
          <text>Phone:   </text><input id="register.phone" type="text"/><br/>
          <text>Email:   </text><input id="register.email" type="text"/><br/>
          <button onClick={this.register.bind(this)}>Register me!</button>
        </div>
      </div>
    )
  }
}

LoginPanel.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginPanel