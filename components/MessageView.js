import React, {Component, PropTypes} from "react";
import {msgToToken} from "./tokens/commons"

class MessageView extends React.Component {
    render() {
        const {message} = this.props;
        var tokens = [];
        for (let token of message.elements) {
            tokens.push(msgToToken(token));
            tokens.push(<a> </a>);
        }
        return (
            <div key={message.id}>
                {tokens}
                <br/>
            </div>
        )
    }
}

MessageView.propTypes = {
    message: PropTypes.object.isRequired
};
export default MessageView;