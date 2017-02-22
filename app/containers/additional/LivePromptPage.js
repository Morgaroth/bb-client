import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";

class LivePromptPage extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleKey(e) {
    this.sendMsgForProgress();
  }

  sendMsgForProgress() {
    var value = document.getElementById("live.prompt.view.input").value;
    if (value != this.state.text) {
      if (value.length > 0) {
        this.props.actions.sendMsgForProgress(value);
      }
      this.state.text = value;
    }
  };

  getSuggestions() {
    const {data} = this.props;
    let elements = [];
    if (data.textElements.length > 0) {
      let last = data.textElements[data.textElements.length - 1];
      let qp = last.qualifiedProps.sort((x, y) => y.ratio - x.ratio) || [];
      let propositions = qp.map(x => {
        return {n: x.name, p: '[' + x.type + '] (probability ' + x.ratio + ')'}
      });
      for (let prop of propositions) {
        elements.push(<div key={uuid()}><b>{prop.n}</b> {prop.p}<br/></div>)
      }
    }
    return elements;
  }

  rawSuggestions() {
    const {data} = this.props;
    let elements = [];
    if (data.textElements.length > 0) {
      let last = data.textElements[data.textElements.length - 1];
      let qp = last.qualifiedProps.sort((x, y) => y.ratio - x.ratio) || [];
      let propositions = qp.map(x => {
        return {n: x.name, p: '[' + x.type + '] (probability ' + x.ratio + ')'}
      });
      for (let prop of propositions) {
        elements.push(prop.n + ' ' + prop.p)
      }
    }
    return elements;
  }

  // https://github.com/fmoo/react-typeahead

  render() {
    const {status, suggText, data} = this.props;

    let elements = <div>no suggestions, wait... ({status}) for text {suggText}</div>;
    let possible = this.getSuggestions();
    if (possible.length > 0) {
      elements = possible;
    }

    return (<div className={this.props.cls}>
      <h3>Welcome in live completion tester</h3>
      <div>start typing here:</div>
      <input id="live.prompt.view.input" type="string" placeholder="Write message"
             onKeyUp={this.handleKey.bind(this)}/>
      <button onClick={this.sendMsgForProgress.bind(this)}>Check!</button>
      {/*<Typeahead options={this.rawSuggestions()} onKeyUp={this.handleKey.bind(this)}/>*/}
      <br/>
      <h6>status: {status}</h6>
      <h4>Suggestions:</h4>
      {elements}
    </div>)
  }
}

LivePromptPage.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object,
  suggestions: PropTypes.array,
  status: PropTypes.string,
  suggText: PropTypes.string,
  // cls: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    suggestions: state.infoPage.suggestions || [],
    status: state.infoPage.status || 'not defined yet',
    suggText: state.infoPage.text || 'no text',
    data: (state.infoPage.data || {textElements: []}),
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
)(LivePromptPage)
