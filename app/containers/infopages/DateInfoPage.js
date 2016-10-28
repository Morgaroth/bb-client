import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import MessageView from "../messages/MessageView";

class DateInfoPage extends Component {

    render() {
        const {actions, data} = this.props;
        var events = <a>NoEvents...</a>;
        if (data.nextEvents.length > 0) {
            events = [];
            for (let ev of data.nextEvents) {
                events.push(
                    <div>{ev}</div>
                )
            }
        }
        return (<div className={this.props.cls}>
            {events}
            <br/>
        </div>)
    }
}

DateInfoPage.propTypes = {
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
)(DateInfoPage)
