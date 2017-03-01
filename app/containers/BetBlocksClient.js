import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoginPanel from "./LoginPanel";
import * as Actions from "../actions";
import RoomsList from "./RoomsList";
import RoomView from "./RoomView";
import AppActions from "./AppActions";
import InfoPage from "./infopages/InfoPage";

class BetBlocksClient extends Component {

  render() {
    const {actions, needsLogin, serviceUrl, roomInfo} = this.props;
    if (needsLogin) {
      return <LoginPanel serviceUrl={serviceUrl} onChange={(phone) => actions.tryLogin(phone)}
                         onRegister={(a, b, c, d, e) => actions.registerUser(a, b, c, d, e)}/>
    } else if (roomInfo.selected != null) {
      return <div>
        <AppActions cls="col-md-12"/>
        <RoomsList cls='col-md-2'/>
        <RoomView cls='col-md-4'/>
        <InfoPage cls="col-md-6"/>
      </div>;
    } else if (!needsLogin) {
      return <div>
        <AppActions cls="col-md-12"/>
        <InfoPage cls="col-md-12"/>
      </div>;
    } else {
      return <a>Waiting for rooms list...</a>
    }
  }
}

BetBlocksClient.propTypes = {
  actions: PropTypes.object,
  needsLogin: PropTypes.bool,
  serviceUrl: PropTypes.string,
  roomInfo: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    serviceUrl: state.auth.url,
    needsLogin: state.auth.needsLogin,
    roomInfo: state.rooms
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
)(BetBlocksClient)
