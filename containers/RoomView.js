import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";

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
        var inputtag = document.getElementById("room.view.input");
        var value = inputtag.value;
        // TODO add more validation
        if (value.length > 0) {
            this.props.actions.sendMessage(this.props.room.id, value);
            inputtag.value = '';
        }
    };

    render() {
        const {actions, room} = this.props;
        var messages = [];
        return (<div>
            <a>Room <b>{room.details.name}</b></a>
            {messages}
            <input id="room.view.input" type="string" placeholder="Write message" onKeyUp={this.handleEnter.bind(this)}/>
            <button onClick={this.sendMessage.bind(this)}>Send!</button>
        </div>)
    }
}

RoomView.propTypes = {
    actions: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired
};


function mapStateToProps(state) {
    return {
        url: state.auth.url,
        room: state.rooms.selectedRoom,
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
