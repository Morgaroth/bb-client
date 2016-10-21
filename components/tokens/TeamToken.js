import React, {Component, PropTypes} from "react";

class TeamToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        return (
            <a class="label label-primary">{text}</a>
        )
    }
}


TeamToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default TeamToken;