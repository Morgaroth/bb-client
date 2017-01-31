import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import dateFormat from "dateformat";
import {uuid} from "../../commons";

class CouponInfoPage extends Component {

  render() {
    const {actions, data} = this.props;
    console.log('rendering coupon for ', data);
    let groups = <a key={'drip-' + uuid()}>No Events...</a>;
    if (data.groups != undefined && data.groups.length > 0) {
      groups = [];
      for (let gr of data.groups) {
        let rows = [];
        for (let r of gr.subevents) {
          let bets = [];
          for (let b of r.bets) {
            let blockStyle = {
              display: 'inline-block',
              padding: 2,
              margin: 5,
              float: 'auto',
              marginLeft: 0,
              width: '20%'
            };
            bets.push(<div key={uuid()} style={blockStyle} className="well well-sm">
              <div style={{fontSize: 13, textAlign: 'center'}}>{b.name}</div>
              <div style={{fontSize: 11, textAlign: 'center'}}>{b.bestOddsFractional}</div>
            </div>)
          }
          rows.push(<div key={uuid()} style={{width: '100%'}}>{bets}</div>)
        }
        groups.push(
          <div key={uuid()}>{gr.name.text}:<br/>{rows}</div>
        )
      }
    }
    let formatter = (date) => dateFormat(date, 'dddd, dS mmm');

    return (<div className={this.props.cls}>
      <h3>Coupon for {formatter(data.dateStart)} - {formatter(data.dateEnd)}:</h3>
      {groups}
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
