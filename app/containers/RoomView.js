import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import {msgToTag} from "./messages/index";

class RoomView extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        let inputtag = document.getElementById("room.view.input");
        let value = inputtag.value;
        // TODO add more validation
        if (value.length > 0) {
            this.props.actions.sendMessage(this.props.room.id, value);
            inputtag.value = '';
        }
    };

    render() {
        const {room, history} = this.props;
        let messages = <a>NoMessages, wait...</a>;
        if (history.length > 0) {
            messages = [];
            for (let msg of history) {
                messages.push(msgToTag(msg))
            }
        }
        return (<div className={this.props.cls}>
            <h2>Room <b>{room.details.name}</b></h2>
            <br/>
            {messages}
            <br/>
            <input id="room.view.input" type="string" placeholder="Write message"
                   onKeyUp={this.handleEnter.bind(this)}/>
            <button onClick={this.sendMessage.bind(this)}>Send!</button>
        </div>)
    }
}

RoomView.propTypes = {
    actions: PropTypes.object.isRequired,
    room: PropTypes.object,
    url: PropTypes.string,
    history: PropTypes.array,
    cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        url: state.auth.url,
        room: state.rooms.selectedRoom,
        history: state.rooms.history,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomView)
