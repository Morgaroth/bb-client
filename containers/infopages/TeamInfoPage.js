import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import MessageView from "../../components/MessageView";

class TeamInfoPage extends Component {

    render() {
        const {actions, room, history} = this.props;
        var messages = <a>NoMessages, wait...</a>;
        if (history.length > 0) {
            messages = [];
            for (let msg of history) {
                messages.push(
                    <MessageView
                        id="mw-{msg.id}"
                        message={msg}
                        loadInfoPage={(a, b) => actions.loadInfoPage(a, b)}/>
                )
            }
        }
        return (<div className={this.props.cls}>
            <div>Room <b>{room.details.name}</b></div>
            <br/>
            {messages}
            <br/>
            <input id="room.view.input" type="string" placeholder="Write message"
                   onKeyUp={this.handleEnter.bind(this)}/>
            <button onClick={this.sendMessage.bind(this)}>Send!</button>
        </div>)
    }
}

TeamInfoPage.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    // url: PropTypes.string.isRequired,
    // history: PropTypes.array,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        // url: state.auth.url,
        // room: state.rooms.selectedRoom,
        // history: state.rooms.history,
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
)(TeamInfoPage)
