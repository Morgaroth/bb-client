import React, {Component, PropTypes} from "react";
import MessageView from "./MessageView"
import UserJoinedRoom from "./UserJoinedRoom"
import BetPlaced from "./BetPlaced"

export function msgToTag(msg) {
    switch (msg.messageType) {
        case "chat-message":
            return <MessageView key={"mw-" + msg.messageId} message={msg}/>;
        case "bet-placed":
            return <BetPlaced key={"mw-" + msg.messageId} msg={msg}/>;
        case "users-joined-room":
            return <UserJoinedRoom key={"usr-" + msg.messageId} msg={msg}/>;
        default:
            console.log('unsupported message type', msg.messageType, msg);
            return <MessageView key={"mw-" + msg.messageId} message={msg}/>;
    }
}