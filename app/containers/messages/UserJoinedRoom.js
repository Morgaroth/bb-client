import React, {Component, PropTypes} from "react";
import {msgToToken} from "../tokens/commons"
import dateFormat from 'dateformat'
import RawToken from "../tokens/RawToken"
import {uuid} from "../../commons"

class UserJoinedRoom extends React.Component {
    render() {
        const {msg} = this.props;
        let dateFormatted = dateFormat(msg.date, 'dddd, dS mmm, yyyy, H:MM:ss');
        let author = msg.user;
        let added = msg.elements[0].qualifiedProps[0];
        let rawMsg = <div style={{display: 'inline'}}>User <b>{msg.user.firstName} {msg.user.lastName}</b> joined to this room.</div>;
        if (author.id != added.id) {
            rawMsg = <div style={{display: 'inline'}}>User <b>{msg.user.firstName} {msg.user.lastName}</b> added {added.name} to this room.</div>;
        }
        return (
            <div key={msg.id} className="well well-sm" style={{padding: 3, margin: 0}}>
                <div style={{fontSize: 11}}>({dateFormatted}) {msg.user.firstName} {msg.user.lastName}:</div>
                {rawMsg}
                <br/>
            </div>
        )
    }
}

UserJoinedRoom.propTypes = {
    msg: PropTypes.object.isRequired,
};

export default UserJoinedRoom;