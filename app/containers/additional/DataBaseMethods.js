import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class DataBaseMethods extends Component {
  render() {
    const {actions, data, status} = this.props;

    return (<div>
      <h3>Data functions</h3>
      <div>
        <h4>Data Feed methods</h4>
        <button onClick={() => actions.DataFeedApi_update()}>Restart feed</button>
        <br/>
        <button onClick={() => actions.DataFeedApi_updateForce('mongo')}>Restart using Mongo</button>
        <br/>
        <button onClick={() => actions.DataFeedApi_updateForce('betbrain')}>Restart using BetBrain</button>
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
