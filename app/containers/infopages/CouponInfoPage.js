import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import dateFormat from "dateformat";
import {uuid} from "../../commons";

class CouponInfoPage extends Component {
  formatter(date) {
    return dateFormat(date, 'dddd, dS mmm');
  }

  switchMarket(e) {
    let value = JSON.parse(e.target.getAttributeNode('alt').value);
    this.props.actions.deepLinkToCoupon(this.props.data.meta.current, value.name)
  }

  loadCoupon(e) {
    let block = JSON.parse(e.target.getAttributeNode('alt').value);
    this.props.actions.deepLinkToCoupon(block, this.props.market)
  }

  render() {
    const {data} = this.props;
    console.log('rendering coupon for ', data);
    let groups = <a key={'drip-' + uuid()}>No Events...</a>;
    if (data.groups != undefined && data.groups.length > 0) {
      groups = [];
      for (let gr of data.groups) {
        let rows = [];
        for (let r of gr.subevents) {
          let bets = [];
          for (let b of r.bets) {
            let blockStyle = {
              display: 'inline-block',
              padding: 2,
              margin: 5,
              float: 'auto',
              marginLeft: 0,
              width: '20%'
            };
            bets.push(<div key={uuid()} style={blockStyle} className="well well-sm">
              <div style={{fontSize: 13, textAlign: 'center'}}>{b.name}</div>
              <div style={{fontSize: 11, textAlign: 'center'}}>{b.bestOddsFractional}</div>
            </div>)
          }
          rows.push(<div key={uuid()} style={{width: '100%'}}>{bets}</div>)
        }
        let groupName = gr.name.text;
        if (gr.name.kind == "day" && gr.name.text == gr.name.info) {
          groupName = this.formatter(gr.name.info)
        }
        groups.push(
          <div key={uuid()}>{groupName}:<br/>{rows}</div>
        )
      }
    }
    let prev = <div>No Previous</div>;
    if (data.meta.prev != undefined) {
      prev = <div
        alt={JSON.stringify(data.meta.prev)}
        onClick={this.loadCoupon.bind(this)}
      >{data.meta.prev.text}</div>
    }
    let cur = <div alt={JSON.stringify(data.meta.current)}>{data.meta.current.text}</div>;
    let next = <div>No Next</div>;
    if (data.meta.next != undefined) {
      next = <div
        alt={JSON.stringify(data.meta.next)}
        onClick={this.loadCoupon.bind(this)}
      >{data.meta.next.text}</div>
    }

    let header = <div>
      <div className="well well-sm" style={{display: 'inline-block', padding: 2, margin: 5}}>{prev}</div>
      <div className="well well-sm" style={{display: 'inline-block', padding: 2, margin: 5}}>{cur}</div>
      <div className="well well-sm" style={{display: 'inline-block', padding: 2, margin: 5}}>{next}</div>
    </div>;

    let markets = [];
    for (let m of data.markets) {
      markets.push(<div
          className="well well-sm"
          style={{display: 'inline-block', padding: 2, margin: 5}}
          alt={JSON.stringify(m)}
          onClick={this.switchMarket.bind(this)}
        >{m.name}</div>
      )
    }


    return (<div className={this.props.cls}>
      <div>Navigation</div>
      {header}
      <div>Available markets:</div>
      <div>{markets}</div>
      {groups}
      <br/>
    </div>)
  }
}

CouponInfoPage.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    market: state.infoPage.additional.market,
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
)(CouponInfoPage)
