import React, {Component, PropTypes} from "react";

class Blank extends Component {

    render() {
        return (<div className={this.props.cls}>
            <div>Blank</div>
        </div>)
    }
}

Blank.propTypes = {};

export default Blank
