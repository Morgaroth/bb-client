import React, {Component, PropTypes} from "react";


class ServiceUrl extends Component {


    handleEnter(e) {
        if (e.keyCode === 13) {
            this.setUrl();
        }
    }

    setUrl() {
        let a = document.getElementById("serviceurl.input");
        let value = a.value;
        if (value.length > 0 && value !== this.props.serviceUrl) {
            if (!value.startsWith("http://")) {
                value = "http://" + value
            }
            if (value.endsWith("/")) {
                value = value.slice(0, -1)
            }
            if (value.endsWith(":8001") || value.endsWith(":8000")) {
                value = value.slice(0, -5)
            }

            this.props.onChange(value)
        }
    };


    render() {
        const {serviceUrl, onChange} = this.props;
        return (
            <div>
                <a>Current url to service is {serviceUrl}</a><br/>
                <button onClick={() => onChange("http://localhost")}>Set to localhost</button>
                <button onClick={() => onChange("http://192.168.33.6")}>Set to vagrant</button>
                <button onClick={() => onChange("http://dev-root-betblocks-01.gp-cloud.com")}>Set to DEV</button>
                <button onClick={() => onChange("http://stg-root-betblocks-01.gp-cloud.com")}>Set to STG</button>
                <button onClick={() => onChange("http://35.177.243.42")}>Set to Jonny's</button>
                <button onClick={this.setUrl.bind(this)}>Set to:</button>
                <input id="serviceurl.input" type="url" defaultValue={serviceUrl}
                       onKeyUp={this.handleEnter.bind(this)}/>
            </div>
        )
    }
}

ServiceUrl.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default ServiceUrl