import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {msgToToken} from "../tokens/commons"
import {uuid} from "../../commons/"

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
        if(value != this.state.text) {
            if (value.length > 0) {
                this.props.actions.sendMsgForProgress(value);
            }
            this.state.text = value;
        }
    };

    render() {
        const {room, status, suggestions, suggText, data} = this.props;
        var elements = <div>No Suggestions, wait... ({status}) for text {suggText}</div>;
        if (data.textElements.length > 0) {
            elements = [];
            for (let msg of data.textElements) {
                let qp = msg.qualifiedProps.sort((x, y) => y.ratio - x.ratio)[0] || {name: 'unknown'};
                elements.push(<div key={uuid()}>{qp.name}: {msgToToken(msg)}</div>)
            }
        }
        return (<div className={this.props.cls}>
            <h4>Suggestions:</h4>
            <br/>
            {elements}
            <br/>
            <h6>status: {status}</h6>
            <input id="live.prompt.view.input" type="string" placeholder="Write message"
                   onKeyUp={this.handleKey.bind(this)}/>
            <button onClick={this.sendMsgForProgress.bind(this)}>Check!</button>
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
