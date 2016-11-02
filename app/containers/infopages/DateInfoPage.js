import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";
import dateFormat from 'dateformat'

class DateInfoPage extends Component {


    render() {
        const {actions, data,qp} = this.props;
        let formatter = (x) => dateFormat(x, 'dddd, dS mmm, H:MM');
        var events = <a>NoEvents...</a>;
        if (data.nextEvents.length > 0) {
            events = [];
            for (let ev of data.nextEvents) {
                let subs = [];
                for (let s of ev.subEvents) {
                    subs.push(<div key={'ese-'+uuid()}>{formatter(s.startTime)}: <b>{s.name}</b></div>)
                }
                events.push(<div key={'se-'+uuid()}><h4>{ev.eventName}:</h4>{subs}</div>)
            }
        }
        return (<div className={this.props.cls}>
            <h3>Date info {dateFormat(qp.name, 'dddd, dS mmm')}:</h3>
            {events}
            <br/>
        </div>)
    }
}

DateInfoPage.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    qp: PropTypes.object,
    // url: PropTypes.string.isRequired,
    // history: PropTypes.array,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        qp: state.infoPage.qprop,
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
