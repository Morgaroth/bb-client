import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import TeamInfoPage from "./TeamInfoPage";
import DateInfoPage from "./DateInfoPage";

class InfoPage extends Component {

    static getInfoPage(type, data) {
        switch (type) {
            case "team":
                return <TeamInfoPage data={data}/>;
            case "date":
                return <DateInfoPage data={data}/>;
            // case "player":
            //     return <PlayerToken text={token.text} prop={qp} load={loadAction}/>;
            // case "result":
            //     return <MarketToken text={token.text} prop={qp} load={loadAction}/>;
            // case "date":
            //     return <DateToken text={token.text} prop={qp} load={loadAction}/>;
            case null:
                return <div style={{fontSize: 40, alignment: 'center'}} className="label label-danger">Blank Info Page</div>;
            default:
                console.log('undefined info page type', type);
                return <div style={{fontSize: 40, alignment: 'center'}} className="label label-danger">UNDEFINED Info Page {type}</div>;
        }
    }

    render() {
        const {type, data} = this.props;

        return (<div className={this.props.cls}>
            {InfoPage.getInfoPage(type, data)}
        </div>)
    }
}

InfoPage.propTypes = {
    actions: PropTypes.object.isRequired,
    cls: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        type: state.infoPage.type,
        data: state.infoPage.data,
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
)(InfoPage)
