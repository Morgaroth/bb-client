import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons/"
import dateFormat from 'dateformat'

class BetBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    updateTextInState() {
        var value = document.getElementById("bet.browser.view.input").value;
        if (value != this.state.text) {
            this.state.text = value;
            this.props.actions.acquireBetBrowser(this.props.data.blocks, this.state.text);
        }
    };

    render() {
        const {actions, data, status} = this.props;

        return (<div>
            <h3>Bet browser</h3>
            <div>Status: {status}</div>
            <input id="bet.browser.view.input" type="string" placeholder="Write message"/>
            <button onClick={this.updateTextInState.bind(this)}>Check!</button>

        </div>)
    }
}

BetBrowser.propTypes = {
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
)(BetBrowser)
