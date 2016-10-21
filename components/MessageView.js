import React, {Component, PropTypes} from "react";

class MessageView extends React.Component {
    render() {
        const {message} = this.props;
        return (
            <div key={message.id}>
                <a>{message.rawText}</a>
                <br/>
            </div>
        )
    }
}

MessageView.propTypes = {
    message: PropTypes.object.isRequired
};
export default MessageView;