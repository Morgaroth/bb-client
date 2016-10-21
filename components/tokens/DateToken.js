import React, {Component, PropTypes} from "react";

class DateToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        let title = "Date: " + prop.name;
        return (
            <div className="label label-danger" title={title}>{text}</div>
        )
    }
}


DateToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default DateToken;