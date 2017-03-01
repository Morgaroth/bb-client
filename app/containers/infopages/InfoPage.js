import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import TeamInfoPage from "./TeamInfoPage";
import DateInfoPage from "./DateInfoPage";
import CouponInfoPage from "./CouponInfoPage";
import BetInfoPage from "./BetInfoPage";
import Shortcuts from "../additional/Shortcuts";
import DataBaseMethods from "../additional/DataBaseMethods";
import VersionsMatrix from "../additional/VersionsMatrix";
import BetBrowser from "../additional/BetBrowser";
import LivePromptPage from "../additional/LivePromptPage";
import ServerHealth from "../additional/ServerHealth";
import DateRangeInfoPage from "./DateRangeInfoPage";

class InfoPage extends Component {

  static getInfoPage(type, data) {
    switch (type) {
      case "bet":
        return <BetInfoPage data={data}/>;
      case "team":
        return <TeamInfoPage data={data}/>;
      case "date":
        return <DateInfoPage data={data}/>;
      case "date-range":
        return <DateRangeInfoPage data={data}/>;
      case "coupon":
        return <CouponInfoPage data={data}/>;
      case "live-prompt":
        return <LivePromptPage/>;
      case "bet-browser":
        return <BetBrowser/>;
      case "server-health":
        return <ServerHealth/>;
      case "shortcuts":
        return <Shortcuts/>;
      case "matrix":
        return <VersionsMatrix/>;
      case "database-actions":
        return <DataBaseMethods/>;
      case null:
        return <div style={{fontSize: 40, alignment: 'center'}} className="label label-danger">Blank Info
          Page</div>;
      default:
        console.log('undefined info page type', type);
        return <div style={{fontSize: 40, alignment: 'center'}} className="label label-danger">UNDEFINED Info
          Page {type}</div>;
    }
  }

  render() {
    const {type, data, status} = this.props;
    let selfManagingPages = ['live-prompt', 'database-actions', 'bet-browser', 'matrix'];
    if ((type != null && selfManagingPages.indexOf(type) > 0) || status == 'OK') {
      return <div className={this.props.cls}>{InfoPage.getInfoPage(type, data)}</div>;
    } else {
      return <div className={this.props.cls}>Loading info about {type}, {status}...</div>;
    }
  }
}

InfoPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cls: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.string,
  data: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    type: state.infoPage.type,
    data: state.infoPage.data,
    status: state.infoPage.status || null,
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
)(InfoPage)
