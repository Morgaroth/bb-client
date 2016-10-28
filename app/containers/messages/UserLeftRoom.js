import React, {Component, PropTypes} from "react";
import {msgToToken} from "../tokens/commons"
import dateFormat from 'dateformat'
import RawToken from "../tokens/RawToken"
import {uuid} from "../../commons"

class UserLeftRoom extends React.Component {
    render() {
        const {msg} = this.props;
        console.log(msg);
        // let dateFormatted = dateFormat(msg.date, 'dddd, dS mmm, yyyy, H:MM:ss');
        // let author = msg.user;
        let removed = msg.elements.flatMap(x => x.qualifiedProps).map(x => x.name).join(", ");
        let rawMsg = <div style={{display: 'inline'}}>User <b>{msg.user.firstName} {msg.user.lastName}</b> kicked {removed}.</div>;
        // if (author.id != added.id) {
        //     rawMsg = <div style={{display: 'inline'}}>User <b>{msg.user.firstName} {msg.user.lastName}</b> added {added.name} to room.</div>;
        // }
        return (
            <div key={msg.id} className="well well-sm" style={{padding: 3, margin: 0}}>
                {/*<div style={{fontSize: 11}}>({dateFormatted}) {msg.user.firstName} {msg.user.lastName}:</div>*/}
                {rawMsg}
                <br/>
            </div>
        )
    }
}

UserLeftRoom.propTypes = {
    msg: PropTypes.object.isRequired,
};

export default UserLeftRoom;