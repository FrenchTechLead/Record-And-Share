import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {connect} from 'react-redux';
import {setRecorderState} from "./../../actions/RecorderActions";

class SuperBtn extends React.Component{
  
  constructor(props){
    super(props);
    this.handleTap = this.handleTap.bind(this);
  }
  
  handleTap(){
    let s = this.props.playerState;
    switch(s){
      case "INIT":
        this.props.dispatch(setRecorderState("RECORDING"));
        break;
      case "RECORDING":
        this.props.dispatch(setRecorderState("RECORDED"));
        break;
      case "RECORDED":
        this.props.dispatch(setRecorderState("PLAYING"));
        break;
      case "PLAYING":
        this.props.dispatch(setRecorderState("PLAYED"));
        break;
      case "PLAYED":
        this.props.dispatch(setRecorderState("INIT"));
        break;
    }
  }
  
  render(){
    return (<FloatingActionButton
      backgroundColor = {this.props.btn.color}
      onTouchTap = {()=>this.handleTap()}
    >
      {this.props.btn.icon}
    </FloatingActionButton>);
  }
}

function mapStateToProps(store) {
  return {btn: store.recorderReducer.btn, playerState: store.recorderReducer.playerState};
}

export default connect(mapStateToProps)(SuperBtn); 
