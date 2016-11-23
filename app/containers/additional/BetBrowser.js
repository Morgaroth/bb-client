import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons/";

class BetBrowser extends Component {
    handleEnter(e) {
        if (e.keyCode === 13) {
            this.fireSearch();
        }
    }

    fireSearch() {
        let value = document.getElementById("bet.browser.view.input").value;
        this.props.actions.acquireBetBrowser(this.props.data.blocks, value);
    };

    handleElementSelected(e) {
        let blockData = JSON.parse(e.target.getAttributeNode('alt').value);
        let newBlocks = JSON.parse(JSON.stringify(this.props.data.blocks));
        for (let b of blockData) {
            newBlocks.unshift(b);
        }
        this.props.actions.acquireBetBrowser(newBlocks, '')
    }

    renderPane(data, alt, shouldHighlight = false) {
        if (data != undefined && data.length > 0) {
            let groups = [];
            data[data.length - 1].highlight = true;
            for (let group of data) {
                let rows = [];
                group.elements[group.elements.length - 1].highlight = true;
                for (let row of group.elements) {
                    let cssClasses = "label label-default";
                    if (shouldHighlight && row.highlight && group.highlight) {
                        cssClasses = "label label-primary";
                    }
                    let blocks = [];
                    for (let block of row.blocks) {
                        if (["bet", "place-bet", "coupon"].indexOf(block.kind) >= 0) {
                            cssClasses = "label label-success"
                        }
                        blocks.push(
                            <div className={cssClasses}
                                 style={{display: 'inline', padding: 3, margin: 0, marginRight: 5}}
                                 key={'bbrowblock' + uuid()}
                                 alt={JSON.stringify(row.blocks)}
                                 title={block.kind + ' ' + (block.info || 'no-info') + ' ' + (block.externalId || 'no-ex-id')}
                                 onClick={this.handleElementSelected.bind(this)}
                            >{block.text}</div>
                        )
                    }
                    rows.push(<div key={'bbgrrow-' + uuid()}>{blocks}</div>)
                }
                groups.push(<div key={'bbgr-' + uuid()} className="well well-sm" style={{padding: 3, margin: 0}}>
                    {rows}
                    <div style={{fontSize: 10}}>{group.title}</div>
                </div>)
            }
            return groups
        } else {
            return alt
        }
    }

    renderBlocksList(blocksData) {
        if (blocksData != undefined) {
            let blocks = [];
            let data = JSON.parse(JSON.stringify(blocksData)).reverse();
            for (let block of data) {
                let cssClasses = "label label-default";
                if (["bet", "place-bet", "coupon"].indexOf(block.kind) >= 0) {
                    cssClasses = "label label-success"
                }
                blocks.push(
                    <div className={cssClasses}
                         style={{display: 'inline', padding: 3, margin: 0, marginRight: 5}}
                         key={'bbelem-' + uuid()}
                         title={block.kind + ' ' + (block.info || 'no-info') + ' ' + (block.externalId || 'no-ex-id')}
                    >{block.text}</div>
                )
            }
            return blocks;
        } else {
            return undefined;
        }
    }

    scrollDownRight() {
        this.scrollRight.scrollTop = this.scrollRight.scrollHeight;
    }

    scrollDownLeft() {
        this.scrollLeft.scrollTop = this.scrollLeft.scrollHeight;
    }

    scrollDownShit() {
        this.scrollDownLeft();
        this.scrollDownRight()
    }

    componentDidMount() {
        this.scrollDownShit();
    }

    componentDidUpdate() {
        this.scrollDownShit()
    }

    render() {
        const {actions, data, status} = this.props;

        let leftSide = this.renderPane(data.section, <a>No data, waiting...</a>, true);
        let rightSide = this.renderPane(data.subSection, <a>No data, waiting...</a>);
        let normalized = this.renderBlocksList(data.normalized);
        let blocks = this.renderBlocksList(data.blocks);

        return (<div>
            <h3>Bet browser</h3>
            <div>Status: {status}</div>
            <input id="bet.browser.view.input" type="string" placeholder="Write message"
                   onKeyUp={this.handleEnter.bind(this)}/>
            <button onClick={this.fireSearch.bind(this)}>Check!</button>
            <br/>
            <button className="btn btn-danger" style={{margin: 3}}
                    onClick={() => actions.acquireBetBrowser(this.props.data.blocks.slice(1), '')}>Back browser
            </button>
            <div>{normalized}</div>
            <div>{blocks}</div>
            <div>
                <div className="col-md-3">
                    <h5 onClick={() => this.scrollDownLeft()}>Left Panel</h5>
                    <div ref={(ref) => this.scrollLeft = ref}
                         style={{overflow: 'auto', maxHeight: '200px'}}
                    >{leftSide}</div>
                </div>
                <div className="col-md-5">
                    <h5 onClick={() => this.scrollDownRight()}>Right Panel</h5>
                    <div ref={(ref) => this.scrollRight = ref}
                         style={{overflow: 'auto', maxHeight: '200px'}}
                    >{rightSide}</div>
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
