import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import CheckBoxList from "react-checkbox-list";
import {uuid} from "../../commons";

class BetInfoPage extends Component {

  constructor() {
    super();
    this.state = {rooms: []}
  }

  roomsSelected(newList) {
    this.setState({rooms: newList});
  }

  render() {
    let {actions, status, data, rooms, qprop} = this.props;
    if (data == undefined) {
      return <div><b>No data in bet info page, maybe old?</b></div>
    }

    if (status == 'NOT_FOUND') {
      return <div>
        Bet not found
        <pre>{JSON.stringify(qprop, null, 3)}</pre>
      </div>
    }
    data = data[0];

    let bets = [];
    for (let b of data.bets) {
      bets.push(<div key={'bipr-' + uuid()}>
        <span>{b.subEventName}</span><br/>
        <span>{b.marketName}: {b.name}</span>
      </div>)
    }


    let roomsData = rooms.map(x =>
      ({value: x.id, label: '' + x.details.name + '(' + x.details.type + ')'})
    );

    let selected = this.state.rooms.map(r => roomsData.filter(x => x.value == r)[0].label);
    let selected_info = '';
    if (selected.length > 0) {
      selected_info = ' to ' + selected.join(', ')
    }

    let header = 'Single bet';
    if (data.bets.length > 0) {
      header = 'Accumulator bet'
    }

    return (<div className={this.props.cls}>
      <div>
        <div>{header}:</div>
        {bets}
      </div>
      <div>
        <CheckBoxList ref='rooms' defaultData={roomsData} onChange={this.roomsSelected.bind(this)}/>
        <button disabled={selected.length == 0} onClick={() => actions.shareBet(data.betId, this.state.rooms)}>Share
          this
          bet{selected_info}</button>
      </div>
      In development...
      <br/>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>)
  }
}

BetInfoPage.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.array,
  rooms: PropTypes.array,
  status: PropTypes.string,
  // history: PropTypes.array,
  // cls: PropTypes.string,
};

function mapStateToProps(state) {
  // console.log('mapStateToProps', state, state.infoPage);
  let data = (state.infoPage.data || {}).options;
  // console.log(state, data);
  return {
    data: data,
    rooms: state.rooms.available,
    status: state.infoPage.status,
    qprop: state.infoPage.qprop,
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
)(BetInfoPage)
