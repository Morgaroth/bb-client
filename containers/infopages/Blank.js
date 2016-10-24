import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import MessageView from "../../components/MessageView";

class Blank extends Component {

    render() {
        return (<div className={this.props.cls}>
            <div>Blank</div>
        </div>)
    }
}

Blank.propTypes = {};

export default Blank
