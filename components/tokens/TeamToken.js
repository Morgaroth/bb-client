import React, {Component, PropTypes} from "react";

class TeamToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        return (
            <a style={{backgroundColor: '#ccc'}}>{text}</a>
        )
    }
}


TeamToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default TeamToken;