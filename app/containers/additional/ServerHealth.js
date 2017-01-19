import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";
import dateFormat from "dateformat";

class ServerHealth extends Component {
  render() {
    const {services} = this.props;

    let formatter = (x) => dateFormat(x, 'dddd, dS mmm, yyyy, H:MM:ss');
    let data = services.map(service =>
      <div key={uuid()}>
        <div>Name: <b>{service.name}</b></div>
        <div>Version: <b>{service.buildInfo.version}</b></div>
        <div>Build: <b>{formatter(service.buildInfo.buildTime)}</b></div>
        <div>BB-Commons: <b>{service.buildInfo.bbCommonsVersion}</b></div>
        <br/>
      </div>
    );

    return (<div>
      <h3>Server state:</h3>
      {data}
    </div>)
  }
}

ServerHealth.propTypes = {
  actions: PropTypes.object.isRequired,
  services: PropTypes.array,
  url: PropTypes.string,
  // cls: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    url: state.auth.url,
    services: state.infoPage.data.health,
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
)(ServerHealth)
