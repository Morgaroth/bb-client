// import React, {Component, PropTypes} from "react";
// import {bindActionCreators} from "redux";
// import {connect} from "react-redux";
// import * as Actions from "../actions";
// import List from "react-list-select";
//
// class ServerState extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {size: 4};
//     }
//
//     render() {
//         const {actions, selected, available} = this.props;
//         var updateCPUSize = () => {
//             let newValue = document.getElementById("new.cpu.size").valueAsNumber;
//             this.setState({size: newValue})
//         };
//         var header = <h3>Selected CPU: {selected}</h3>;
//         var list = <List items={available.map((x) => { return "" + x.size +"qbits, "+x.id})}
//                          selected={available.map((x) => x.id).indexOf(selected)}
//                          multiple={false}
//                          onChange={(selected) => {actions.selectCPU(available[selected].id)}}/>;
//
//         if (selected === 'undefined' || selected == null) {
//             header = <a>No available computers.</a>;
//             list = undefined;
//         }
//         var btn = undefined;
//         if (!(selected == undefined || selected == null)) {
//             btn = <button onClick={() => actions.deleteSelectedCPU()}>Delete selected CPU</button>
//         }
//         return (
//             <div>
//                 <button onClick={() => actions.fetchCPUsFromServer()}>Refresh</button>
//                 <br/>
//                 <input id="new.cpu.size" type="number" defaultValue={this.state.size} onChange={updateCPUSize}/>
//                 <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create new CPU with {this.state.size}qbit
//                     register
//                 </button>
//                 <br/>
//                 <button onClick={() => actions.executeCreateCPU(this.state.size, true)}>Create new CPU
//                     with {this.state.size}qbit register <b>FULL</b>
//                 </button>
//                 <br/>
//                 {header}
//                 {btn}
//                 {list}
//             </div>
//         )
//     }
// }
//
// ServerState.propTypes = {
//     actions: PropTypes.object,
//     available: PropTypes.array,
//     selected: PropTypes.string
// };
//
//
// function mapStateToProps(state) {
//     return {
//         serviceUrl: state.serviceUrl,
//         available: state.serverState.available,
//         selected: state.serverState.selected
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(Actions, dispatch)
//     }
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ServerState)
