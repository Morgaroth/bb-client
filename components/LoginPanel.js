import React, {Component, PropTypes} from "react";


class LoginPanel extends Component {


    handleEnter(e) {
        if (e.keyCode === 13) {
            this.setUrl();
        }
    }

    setUrl() {
        const a = document.getElementById("login.input");
        const value = a.value;
        // TODO add more validation
        if (value.length == 12) {
            this.props.onChange(value)
        }
    };

    render() {
        const {serviceUrl} = this.props;
        return (
            <div>
                <a>Current url to service is {serviceUrl}</a><br/>
                <input id="login.input" type="text" onkeyup={this.handleEnter.bind(this)}/>
                <button onClick={this.setUrl.bind(this)}>Login!</button>
            </div>
        )
    }
}

LoginPanel.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginPanel