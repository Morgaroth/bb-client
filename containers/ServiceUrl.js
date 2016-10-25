import React, {Component, PropTypes} from "react";


class ServiceUrl extends Component {


    handleEnter(e) {
        if (e.keyCode === 13) {
            this.setUrl();
        }
    }

    setUrl() {
        const a = document.getElementById("serviceurl.input");
        const value = a.value;
        if (value.length > 0 && value !== this.props.serviceUrl) {
            this.props.onChange(value)
        }
    };


    render() {
        const {serviceUrl, onChange} = this.props;
        return (
            <div>
                <a>Current url to service is {serviceUrl}</a><br/>
                <button onClick={() => onChange("http://192.168.33.6")}>Set to localhost</button>
                <button onClick={() => onChange("http://dev-root-betblocks-01.gp-cloud.com")}>Set to DEV</button>
                <button onClick={() => onChange("http://prod-root-betblocks-01.gp-cloud.com")}>Set to PROD</button>
                <button onClick={this.setUrl.bind(this)}>Set to:</button>
                <input id="serviceurl.input" type="url" defaultValue={serviceUrl}
                       onkeyup={this.handleEnter.bind(this)}/>
            </div>
        )
    }
}

ServiceUrl.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default ServiceUrl