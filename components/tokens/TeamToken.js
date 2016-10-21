import React, {Component, PropTypes} from "react";

class TeamToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        let title = "Team: " + prop.name + " (" + prop.ratio + ")";
        return (
            <div className="label label-success" title={title}>{text}</div>
        )
    }
}


TeamToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default TeamToken;