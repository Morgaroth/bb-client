import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {Radio, RadioGroup} from "react-radio-group";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {merge} from "../../commons";

const initialState = {selectedRoomType: 'private', selectedUsers: [], selectedRoomName: ''}

class RoomsManagement extends Component {

    constructor(props) {
        super(props);
        this.input = undefined;
        this.state = initialState;
    }

    fireCreateRoom() {
        let roomName = this.state.selectedRoomName;
        if (roomName.length > 0) {
            this.props.actions.createRoom(roomName, this.state.selectedRoomType, this.state.selectedUsers);
            this.setState(initialState);
            this.input.value = '';
        }
    }

    inputUpdated(e) {
        if (e.keyCode === 13) {
            this.fireCreateRoom();
        } else {
            this.setState(merge(this.getState, {selectedRoomName: this.input.value}));
        }
    }

    roomTypeChanged(value) {
        this.setState(merge(this.state, {selectedRoomType: value}));
    }

    selectedUsersChanged(value) {
        this.setState(merge(this.state, {selectedUsers: value}));
    }

    static renderUsersList(users) {
        let result = [];
        if (users !== undefined && users.length > 0) {
            for (let u of users) {
                let tag = <div key={"u-" + u.id}><label><Checkbox
                    value={u.id}/>{u.firstName} {u.lastName} ({u.phoneNumber})</label></div>;
                result.push(tag);
            }
        }
        return result;
    }

    render() {
        const {actions, rooms, users} = this.props;

        let usersList = RoomsManagement.renderUsersList(users);

        return (<div>
            <h3>Rooms Management</h3>
            <input id="rooms.management.view.input"
                   type="string"
                   placeholder="Write room name"
                   ref={(ref) => this.input = ref}
                   onKeyUp={this.inputUpdated.bind(this)}
            />
            <RadioGroup
                name="room-type"
                selectedValue={this.state.selectedRoomType}
                onChange={this.roomTypeChanged.bind(this)}>
                <label><Radio value='private'/>Private</label>
                <label><Radio value='public'/>Public</label>
            </RadioGroup>

            <CheckboxGroup name="fruits" value={this.state.selectedUsers}
                           onChange={this.selectedUsersChanged.bind(this)}
                           checkboxDepth={3}
            >
                {usersList}
            </CheckboxGroup>

            <button
                onClick={this.fireCreateRoom.bind(this)}
            >Create {this.state.selectedRoomType} room
                with {this.state.selectedUsers.length + 1} participants!
            </button>
            <br/>
        </div>)
    }
}

RoomsManagement.propTypes = {
    actions: PropTypes.object.isRequired,
    rooms: PropTypes.object,
    users: PropTypes.array,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        rooms: state.rooms,
        users: state.infoPage.data.users,
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
)(RoomsManagement)
