import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";
import dateFormat from "dateformat";

class VersionsMatrix extends Component {
  render() {
    const {services} = this.props;

    let formatter = (x) => dateFormat(x, 'ddd dS mm, H:MM:ss');
    let servers = Array.from(new Set(services.map(x => x.name)));
    servers.sort();
    let allApps = [];
    let data = [];
    services.forEach(s => {
      data[s.name] = {};
      s.data.forEach(a => {
        allApps.push(a.name);
        data[s.name][a.name] = a
      })
    });
    allApps = Array.from(new Set(allApps));
    allApps.sort();
    console.log(servers, allApps, data);

    let header = servers.map(x => <th>
      <div style={{marginRight: 10, marginBottom: 7}}>{x}</div>
    </th>);
    let rows = [<tr>
      <th>--</th>
      {header}
    </tr>];
    allApps.forEach(appName => {
      let cells = [<th style={{display: 'inline'}}>
        <div style={{marginRight: 10, marginBottom: 7}}>{appName}</div>
      </th>];
      for (let s of servers) {
        console.log(s, appName, data[s][appName]);
        if (data[s][appName] != undefined) {
          cells.push(<th key={uuid()}>
            <div style={{marginRight: 10, marginBottom: 7}}>
              <div style={{width: '100%', textAlign: 'center'}}><b>{data[s][appName].buildInfo.version}</b></div>
              <div style={{width: '100%', textAlign: 'center'}}>{formatter(data[s][appName].buildInfo.buildTime)}</div>
              <div style={{width: '100%', textAlign: 'center'}}>{data[s][appName].buildInfo.bbCommonsVersion}</div>
            </div>
          </th>)
        } else {
          cells.push(<div key={uuid()}>
            <div style={{width: '100%', textAlign: 'center'}}><b>NO</b></div>
          </div>)
        }
      }
      rows.push(<tr>{cells}</tr>)
    });

    return (<div>
        <h3>Server state:</h3>
        <table cellPadding='10'>
          {rows}
        </table>
      </div>
    )
  }
}

VersionsMatrix.propTypes = {
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
)(VersionsMatrix)
