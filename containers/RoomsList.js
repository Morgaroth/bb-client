import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import List from "react-list-select";

class RoomsList extends Component {

    render() {
        const {actions, selectedRoom, selected, available} = this.props;
        var header = <h3>Selected Room: {selectedRoom.details.name}</h3>;
        let publicRooms = available.filter(x => x.details.type == 'public');
        var publicList = (<List items={publicRooms.map(x => x.details.name)}
                                selected={publicRooms.map(x => x.id).indexOf(selected)}
                                multiple={false}
                                onChange={(selected) => actions.selectRoom(publicRooms[selected].id)}/>);
        let privateRooms = available.filter(x => x.details.type == 'private');
        var privateList = (<List items={privateRooms.map(x => x.details.name)}
                                 selected={privateRooms.map(x => x.id).indexOf(selected)}
                                 multiple={false}
                                 onChange={(selected) => actions.selectRoom(privateRooms[selected].id)}/>);
        let directRooms = available.filter(x => x.details.type == 'direct');
        var directList = (<List items={directRooms.map(x => x.details.name)}
                                selected={directRooms.map(x => x.id).indexOf(selected)}
                                multiple={false}
                                onChange={(selected) => actions.selectRoom(directRooms[selected].id)}/>);
        var myStream = available.filter(x => x.details.type == 'my_stream')[0];

        var btn = undefined;
        // if (!(selected == undefined || selected == null)) {
        //     btn = <button onClick={() => actions.deleteSelectedCPU()}>Delete selected CPU</button>
        // }
        //
        // <input id="new.room.name" type="test" defaultValue={this.state.roomName} onChange={updateCPUSize}/>
        // <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create room</button>
        // <br/>

        return (<div className={this.props.cls}>
            <button onClick={()=>actions.fetchRoomsFromServer()}>Refresh</button>
            <br/>
            {header}
            {btn}
            <div>Public rooms:</div>
            {publicList}
            <div>Private rooms:</div>
            {privateList}
            <div>Direct rooms:</div>
            {directList}
            <h4 onClick={() => actions.selectRoom(myStream.id)}>Your stream!</h4>
        </div>)
    }
}

RoomsList.propTypes = {
    actions: PropTypes.object.isRequired,
    available: PropTypes.array,
    selected: PropTypes.string,
    selectedRoom: PropTypes.object,
    cls: PropTypes.string,
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
