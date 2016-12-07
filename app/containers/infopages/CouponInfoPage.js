import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import dateFormat from "dateformat";
import {uuid} from "../../commons";

class CouponInfoPage extends Component {

    render() {
        const {actions, data} = this.props;
        let events = <a key={'drip-' + uuid()}>No Events...</a>;
        if (data.subEventsBets != undefined && data.subEventsBets.length > 0) {
            events = [];
            for (let ev of data.subEventsBets) {
                events.push(
                    <div key={'drip-' + uuid()}>{ev.eventName}</div>
                )
            }
        }
        let formatter = (date) => dateFormat(date, 'dddd, dS mmm');

        return (<div className={this.props.cls}>
            <h3>Coupon for {formatter(data.dateStart)} - {formatter(data.dateEnd)}:</h3>
            {events}
            <br/>
        </div>)
    }
}

CouponInfoPage.propTypes = {
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
)(CouponInfoPage)
