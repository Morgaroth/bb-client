import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import List from "react-list-select";

class RoomsList extends Component {

    render() {
        const {actions, selected, available} = this.props;
        var header = <h3>Selected Room: {selected}</h3>;
        var list = (<List items={available.map((x) => {
            return x.details.name+", "+x.details.type
        })}
                          selected={available.map((x) => x.id).indexOf(selected)}
                          multiple={false}
                          onChange={(selected) => {
                              actions.selectRoom(available[selected].id)
                          }}/>);

        var btn = undefined;
        // if (!(selected == undefined || selected == null)) {
        //     btn = <button onClick={() => actions.deleteSelectedCPU()}>Delete selected CPU</button>
        // }
        //
        // <input id="new.room.name" type="test" defaultValue={this.state.size} onChange={updateCPUSize}/>
        // <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create new CPU with {this.state.size}qbit
        // register
        // </button>
        // <br/>

        return (<div>
            <button onClick={() => actions.fetchRoomsFromServer()}>Refresh</button>
            <br/>
            {header}
            {btn}
            {list}
        </div>)
    }
}

RoomsList.propTypes = {
    actions: PropTypes.object,
    available: PropTypes.array,
    selected: PropTypes.string
};


function mapStateToProps(state) {
    return {
        state: state,
        available: state.rooms.available,
        selected: state.rooms.selected
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
)(RoomsList)
