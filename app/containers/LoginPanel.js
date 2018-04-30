import React, {Component, PropTypes} from "react";


class LoginPanel extends Component {


    handleEnter(e) {
        console.log(e);
        if (e.keyCode === 13) {
            this.handlePhoneNumber();
        }
    }

    handlePhoneNumber() {
        let a = document.getElementById("login.input");
        let value = a.value;
        // TODO add more validation
        let isPoland = (value.length === 12 && value.substring(0, 3) === "+48");
        let isUK = (value.length === 14 && value.substring(0, 4) === "+440");
        if (isPoland || isUK) {
            this.props.onChange(value)
        }
        if (value.length === 9) {
            value = "+48" + value;
            this.props.onChange(value)
        }
        if (value.length === 11 && value.substring(0, 3) !== "48" && value[0] === "0") {
            value = "+44" + value;
            this.props.onChange(value)
        }
    };

    register() {
        let name = document.getElementById("register.name").value;
        let surname = document.getElementById("register.surname").value;
        let pin = document.getElementById("register.pin").value;
        let phone = document.getElementById("register.phone").value;
        let email = document.getElementById("register.email").value;
        if (name.length > 1 && surname.length > 1 && pin.length === 4 && email.length > 4 && [9, 12].indexOf(phone.length) >= 0) {
            this.props.onRegister(name, surname, pin, phone, email)
        }
    }

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
                    <input id="login.input" type="text" onKeyUp={this.handleEnter.bind(this)}/>
                    <button onClick={this.handlePhoneNumber.bind(this)}>Login!</button>
                </div>
                <hr/>
                <div>
                    <h2>Register</h2>
                    <text>Name:</text>
                    <input id="register.name" type="text"/><br/>
                    <text>Surname:</text>
                    <input id="register.surname" type="text"/><br/>
                    <text>PIN:</text>
                    <input id="register.pin" type="password"/><br/>
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
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
};

export default LoginPanel