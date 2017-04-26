import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";
import TeamToken from "../tokens/TeamToken";

class BetSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '', ctr: 0};
  }

  handleKey(e) {
    this.sendMsgForProgress();
  }

  sendMsgForProgress() {
    let value = document.getElementById("bet.search.view.input").value;
    if (value !== this.state.text) {
      if (value.length > 0) {
        this.state.ctr = this.state.ctr + 1;
        this.props.actions.findBets(value, this.state.ctr);
      }
      this.state.text = value;
    }
  };


  getBets() {
    const {bets} = this.props;
    let elements = [];
    if (bets.length > 0) {
      for (let bet of bets) {
        let bettok = <div key={uuid()} className="label label-info">{bet.name}</div>;
        let market = <div key={uuid()} className="label label-primary">{bet.marketName}</div>;
        let teamName1 = bet.subEventName.split(' v ')[0];
        let t1 = <TeamToken key={uuid()} text={teamName1} prop={{name: teamName1}}/>;
        let teamName2 = bet.subEventName.split(' v ')[1];
        let t2 = <TeamToken key={uuid()} text={teamName2} prop={{name: teamName2}}/>;
        let odds = <div key={uuid()} className="label label-info">{bet.bestOddsDecimal}</div>;
        let event = <div key={uuid()} className="label" style={{backgroundColor: '#A24876'}}>{bet.eventName}</div>;
        let space = () => <a key={uuid()}>  </a>;
        elements.push(bettok);
        elements.push(space());
        elements.push(market);
        elements.push(space());
        elements.push(odds);
        elements.push(space());
        elements.push(<div key={uuid()} className="label label-default">in</div>);
        elements.push(space());
        elements.push(t1);
        elements.push(space());
        elements.push(<div key={uuid()} className="label label-default">vs</div>);
        elements.push(space());
        elements.push(t2);
        elements.push(space());
        elements.push(<div key={uuid()} className="label label-default">/</div>);
        elements.push(space());
        elements.push(event);
        elements.push(<br/>);
      }
    }
    return elements;
  }

  render() {
    const {status, text} = this.props;

    let elements = <div>no suggestions, wait... ({status}) for text {text}</div>;
    let possible = this.getBets();
    if (possible.length > 0) {
      elements = possible;
    }

    return (<div className={this.props.cls}>
      <h3>Welcome in Bet Search!</h3>
      <div>start typing here:</div>
      <input id="bet.search.view.input" type="string" placeholder="Write message"
             onKeyUp={this.handleKey.bind(this)}/>
      <button onClick={this.sendMsgForProgress.bind(this)}>Check!</button>
      <br/>
      <h6>status: {status}</h6>
      <h4>Bets:</h4>
      {elements}
    </div>)
  }
}

BetSearch.propTypes = {
  actions: PropTypes.object.isRequired,
  bets: PropTypes.array,
  status: PropTypes.string,
  cls: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    status: state.infoPage.status || 'not defined yet',
    bets: (state.infoPage.bets || []),
    text: state.infoPage.text || undefined,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSearch)
