import React, {Component, PropTypes} from "react";

class TeamToken extends React.Component {
    render() {
        const {text, load, prop} = this.props;
        let title = "Team: " + prop.name + " (" + prop.ratio + ")";
        return (
            <button
                className="label label-success"
                title={title}
                onClick={() => load('team', prop)}
            >{text}</button>
        )
    }
}


TeamToken.propTypes = {
    text: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired,
    prop: PropTypes.object.isRequired,
};
export default TeamToken;