import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class DataBaseMethods extends Component {
  render() {
    const {actions, data, status} = this.props;

    return (<div>
      <h3>Database functions</h3>
      <div>
        <h4>Managing</h4>
        <button onClick={() => actions.DataApi_update('events')}>Update Events</button>
        <br/>
        <button onClick={() => actions.DataApi_update('events-and-sub-events')}>First Step</button>
        <br/>
      </div>
      <div>
        <h4>Data api</h4>
        <button onClick={() => actions.DataApi_update('events')}>Update Events</button>
        <br/>
        <button onClick={() => actions.DataApi_update('sub-events')}>Update SubEvents</button>
        <br/>
        <button onClick={() => actions.DataApi_update('markets')}>Update Markets</button>
        <br/>
        <button onClick={() => actions.DataApi_update('bets')}>Update Bets</button>
        <br/>
      </div>
      <div>
        <h4>Keywords</h4>
        <button onClick={() => actions.Keywords_update('')}>Update All keywords</button>
        <br/>
        <button onClick={() => actions.Keywords_update('teams')}>Update Teams Keywords</button>
        <br/>
        <button onClick={() => actions.Keywords_update('players')}>Update Players Keywords</button>
        <br/>
        <button onClick={() => actions.Keywords_update('leagues')}>Update Leagues Keywords</button>
        <br/>
      </div>
      <div>Status ({status}): {data}</div>
    </div>)
  }
}

DataBaseMethods.propTypes = {
  actions: PropTypes.object.isRequired,
  result: PropTypes.string,
  status: PropTypes.string,
  // cls: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    data: state.infoPage.data || "",
    status: state.infoPage.status || "",
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
)(DataBaseMethods)
