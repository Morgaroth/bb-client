import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons";

class Shortcuts extends Component {
  blockInfo(block) {
    return block.kind + ' ' + (block.id || 'no-id') + ' ' + (block.info || 'no-info') + ' ' + (block.ids || 'no-ids')
  }

  getShortcuts() {
    this.props.actions.fetchShortcuts();
  };

  openCorrectView(e) {
    let block = JSON.parse(e.target.getAttributeNode('alt').value);
    if (block.kind == 'team') {
      this.props.actions.acquireBetBrowser([block], '');
    } else {
      this.props.actions.deepLinkToCoupon(block)
    }
  }

  renderData(data, alt) {
    let cssClasses = "label label-default";
    if (data != undefined && data.length > 0) {
      let groups = [];
      for (let group of data) {
        let blocks = [];
        for (let block of group.blocks) {
          blocks.push(
            <div className={cssClasses}
                 style={{display: 'inline', padding: 3, margin: 0, marginRight: 5}}
                 key={'bbrowblock' + uuid()}
                 alt={JSON.stringify(block)}
                 title={this.blockInfo(block)}
                 onClick={this.openCorrectView.bind(this)}
            >{block.text}</div>
          )
        }
        groups.push(<div key={'bbgr-' + uuid()} className="well well-sm" style={{padding: 3, margin: 0}}>
          <div style={{fontSize: 10}}>{group.title.text}</div>
          {blocks}
          <br/>
        </div>)
      }
      return groups
    } else {
      return alt
    }
  }

  render() {
    const {data, status} = this.props;

    return (<div>
      <h3>Shortcuts:</h3>
      <div>Status: {status}</div>
      <button onClick={this.getShortcuts.bind(this)}>Update!</button>
      <br/>
      <div>
        <div className="col-md-6">
          <div style={{overflow: 'auto'}}
          >{this.renderData(data.groups, <a>No data, waiting...</a>)}</div>
        </div>
      </div>
    </div>)
  }
}

Shortcuts.propTypes = {
  actions: PropTypes.object.isRequired,
  result: PropTypes.string,
  data: PropTypes.object,
  status: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    data: state.infoPage.data || {},
    status: state.infoPage.status || "",
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
)(Shortcuts)
