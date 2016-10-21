import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import List from "react-list-select";

class RoomsList extends Component {

    render() {
        const {actions, selectedRoom, selected, available} = this.props;
        var header = <h3>Selected Room: {selectedRoom.details.name}</h3>;
        var list = (<List items={available.map((x) => {return x.details.name+", "+x.details.type})}
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
        // <input id="new.room.name" type="test" defaultValue={this.state.roomName} onChange={updateCPUSize}/>
        // <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create room</button>
        // <br/>

        return (<div>
            <button onClick={()=>actions.fetchRoomsFromServer()}>Refresh</button>
            <br/>
            {header}
            {btn}
            {list}
        </div>)
    }
}

RoomsList.propTypes = {
    actions: PropTypes.object.isRequired,
    available: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    selectedRoom: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        available: state.rooms.available,
        selected: state.rooms.selected,
        selectedRoom: state.rooms.selectedRoom,
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
