import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";
import dateFormat from "dateformat";

class BetBrowser extends Component {
  formatter(x) {
    try {
      return dateFormat(x, 'dddd, dS mmm');
    } catch (err) {
      return x
    }
  }

  blockInfo(block) {
    return block.kind + ' ' + (block.id || 'no-id') + ' ' + (block.info || 'no-info') + ' ' + (block.ids || 'no-ids')
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.fireSearch();
    }
  }

  dropHeadOfBlocksList(blocks) {
    if (blocks != undefined) {
      if (blocks.length > 1 && blocks[0].kind == 'odds' && blocks[1].kind == 'bet') {
        return blocks.slice(2)
      } else {
        return blocks.slice(1)
      }
    }
    return blocks;
  }

  fireSearch() {
    let value = document.getElementById("bet.browser.view.input").value;
    this.props.actions.acquireBetBrowser(this.props.data.blocks, value);
  };

  handleElementUnshiftSelected(e) {
    let blockData = JSON.parse(e.target.getAttributeNode('alt').value);
    let newBlocks = JSON.parse(JSON.stringify(this.props.data.blocks));
    for (let b of blockData) {
      newBlocks.unshift(b);
    }
    this.props.actions.acquireBetBrowser(newBlocks, '')
  }

  handleElementReplaceSelected(e) {
    let blockData = JSON.parse(e.target.getAttributeNode('alt').value);
    let newBlocks = JSON.parse(JSON.stringify(this.props.data.blocks));
    newBlocks = this.dropHeadOfBlocksList(newBlocks);
    for (let b of blockData) {
      newBlocks.unshift(b);
    }
    this.props.actions.acquireBetBrowser(newBlocks, '')
  }

  openCouponView(e) {
    let block = JSON.parse(e.target.getAttributeNode('alt').value)[0];
    this.props.actions.deepLinkToCoupon(block)
  }

  sendBet(e) {
    let {data, actions, currentRoom} = this.props;
    let result = [[]];
    data.blocks.filter(x => ["odds", "multi-odds", "sport"].indexOf(x.kind) < 0).forEach(element => {
      if (element.kind == "continue-multi") {
        result.push([]);
      } else {
        result[result.length - 1].push(element)
      }
    });
    result = result.filter(x => x.length > 0);
    actions.sendMessage(currentRoom, undefined, result)
  }

  placeBet(e) {
    this.sendBet(e);
    this.props.actions.loadBetBrowser()
  }

  renderPane(data, alt, shouldHighlight = false, unshift = true) {
    let selector = this.handleElementReplaceSelected;
    if (unshift) {
      selector = this.handleElementUnshiftSelected;
    }
    let getOnClick = (b) => {
      switch (b.kind) {
        case "not-implemented":
        case "no-elements":
          return (e) => {
          };
        case 'coupon':
          return this.openCouponView;
        case 'place-bet':
          return this.placeBet;
        case 'continue-single':
          return this.sendBet;
        default:
          return selector
      }

    };
    if (data != undefined && data.length > 0) {
      let groups = [];
      data[data.length - 1].highlight = true;
      for (let group of data) {
        let rows = [];
        if (group.elements.length > 0) {
          group.elements[group.elements.length - 1].highlight = true;
        }
        for (let row of group.elements) {
          let cssClasses = "label label-default";
          if (shouldHighlight && row.highlight && group.highlight) {
            cssClasses = "label label-primary";
          }
          let blocks = [];
          for (let block of row.blocks) {
            if (["odds", "multi-odds", "place-bet", "coupon"].indexOf(block.kind) >= 0) {
              cssClasses = "label label-success"
            }
            blocks.push(
              <div className={cssClasses}
                   style={{display: 'inline', padding: 3, margin: 0, marginRight: 5}}
                   key={'bbrowblock' + uuid()}
                   alt={JSON.stringify(row.blocks.filter(x => x.kind != "multi-odds"))}
                   title={this.blockInfo(block)}
                   onClick={getOnClick(block).bind(this)}
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
        if (["odds", "multi-odds", "place-bet", "coupon"].indexOf(block.kind) >= 0) {
          cssClasses = "label label-success"
        }
        blocks.push(
          <div className={cssClasses}
               style={{display: 'inline', padding: 3, margin: 0, marginRight: 5}}
               key={'bbelem-' + uuid()}
               title={this.blockInfo(block)}
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

    let leftSide = this.renderPane(data.section, <a>No data, waiting...</a>, true, false);
    let rightSide = this.renderPane(data.subSection, <a>No data, waiting...</a>, false, true);
    let normalized = this.renderBlocksList(data.normalized);
    let blocks = this.renderBlocksList(data.blocks);
    let prevBlocks = this.dropHeadOfBlocksList(data.blocks);

    return (<div>
      <h3>Bet browser</h3>
      <div>Status: {status}</div>
      <input id="bet.browser.view.input" type="string" placeholder="Write message"
             onKeyUp={this.handleEnter.bind(this)}/>
      <button onClick={this.fireSearch.bind(this)}>Check!</button>
      <br/>
      <button className="btn btn-danger" style={{margin: 3}}
              onClick={() => actions.acquireBetBrowser(prevBlocks, '')}>Back browser
      </button>
      <div>{normalized}</div>
      <div>{blocks}</div>
      <div>
        <div className="col-md-3">
          <h5 onClick={() => this.scrollDownLeft()}>Left Panel</h5>
          <div ref={(ref) => this.scrollLeft = ref}
               style={{overflow: 'auto', maxHeight: '300px'}}
          >{leftSide}</div>
        </div>
        <div className="col-md-5">
          <h5 onClick={() => this.scrollDownRight()}>Right Panel</h5>
          <div ref={(ref) => this.scrollRight = ref}
               style={{overflow: 'auto', maxHeight: '300px'}}
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
    currentRoom: state.rooms.selected,
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
