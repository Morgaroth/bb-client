import React, {Component, PropTypes} from "react";
import {msgToToken} from "../containers/tokens/commons"
import dateFormat from 'dateformat'
import RawToken from "../containers/tokens/RawToken"
import {uuid} from "../commons"

class MessageView extends React.Component {
    render() {
        const {message, loadInfoPage} = this.props;
        var tokens = [];
        if (message.elements.length == 0) {
            tokens.push(<RawToken text={message.rawText}/>)
        } else {
            for (let token of message.elements) {
                tokens.push(msgToToken(token, message, loadInfoPage));
                tokens.push(<a key={uuid()}> </a>);
            }
        }
        let dateFormatted = dateFormat(message.date, 'dddd, dS mmm, yyyy, H:MM:ss');
        return (
            <div key={message.id} className="well well-sm" style={{padding: 3, margin: 0}}>
                <div style={{fontSize: 11}}>({dateFormatted}) {message.user.firstName} {message.user.lastName}:</div>
                {tokens}<br/>
            </div>
        )
    }
}

MessageView.propTypes = {
    message: PropTypes.object.isRequired,
    loadInfoPage: PropTypes.func.isRequired,
};
export default MessageView;