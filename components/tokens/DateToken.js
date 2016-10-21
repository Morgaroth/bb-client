import React, {Component, PropTypes} from "react";

class DateToken extends React.Component {
    render() {
        const {text, prop, load} = this.props;
        let title = "Date: " + prop.name;
        return (
            <button
                className="label label-danger"
                title={title}
                onClick={load('date', prop)}
            >{text}</button>
        )
    }
}


DateToken.propTypes = {
    text: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired,
    prop: PropTypes.object.isRequired,
};
export default DateToken;