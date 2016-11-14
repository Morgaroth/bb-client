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

    handleRightPanelClick(e) {
        var blockData = JSON.parse(e.target.getAttributeNode('alt').value);
        let newBlocks = JSON.parse(JSON.stringify(this.props.data.blocks));
        newBlocks.unshift(blockData);
        this.props.actions.acquireBetBrowser(newBlocks, '')
    }

    handleLeftPanelClick(e) {
        var blockData = JSON.parse(e.target.getAttributeNode('alt').value);
        let newBlocks = JSON.parse(JSON.stringify(this.props.data.blocks));
        newBlocks[0] = blockData;
        this.props.actions.acquireBetBrowser(newBlocks, '')
    }

    render() {
        const {data, status} = this.props;

        var leftSide = <a>No data, waiting...</a>;
        var rightSide = <a>No data, waiting...</a>;
        if (data.leftSide != undefined) {
            leftSide = [];
            for (let row of data.leftSide.reverse()) {
                leftSide.push(
                    <div key={'bb-' + uuid()}
                         alt={JSON.stringify(row)}
                         onClick={this.handleLeftPanelClick.bind(this)}
                    >{row.text}</div>
                )
            }
        }
        if (data.rightSide != undefined) {
            rightSide = [];
            for (let group of data.rightSide.reverse()) {
                let rows = [];
                for (let row of group.elements) {
                    let blocks = [];
                    for (let block of row.blocks) {
                        blocks.push(
                            <div style={{display: 'inline'}} key={'bbrowblock' + uuid()}
                                 alt={JSON.stringify(block)}
                                 onClick={this.handleRightPanelClick.bind(this)}
                            >{block.text}</div>
                        )
                    }
                    rows.push(<div key={'bbgrrow-' + uuid()}>{blocks}</div>)
                }
                rightSide.push(<div key={'bbgr-' + uuid()} className="well well-sm" style={{padding: 3, margin: 0}}>
                    {rows}
                    <div style={{fontSize: 10}}>{group.title}</div>
                </div>)
            }
        }

        return (<div>
            <h3>Bet browser</h3>
            <div>Status: {status}</div>
            <input id="bet.browser.view.input" type="string" placeholder="Write message"/>
            <button onClick={this.updateTextInState.bind(this)}>Check!</button>
            <div>
                <div className="col-md-3">
                    <h5>Left Panel</h5>
                    {leftSide}
                </div>
                <div className="col-md-5">
                    <h5>Right Panel</h5>
                    {rightSide}
                </div>
            </div>
        </div>)
    }
}

BetBrowser.propTypes = {
    actions: PropTypes.object.isRequired,
    result: PropTypes.string,
    data: PropTypes.object,
    status: PropTypes.string,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        data: state.infoPage.data || {},
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
