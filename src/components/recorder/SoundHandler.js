import React from "react";
import {connect} from 'react-redux';
import {setRecorderState, setMediaValues} from "./../../actions/RecorderActions";
import {getAndUpdateFilesList} from './../../utils/index';
import {updateFilesList} from './../../actions/CordovaActions';
import { onSuccess, onError, mediaStatus } from './recorderFunctions';
import moment from "moment";

let duration = 0;
class SoundHandler extends React.Component{
  constructor(props){
    super(props);
    //attributes
    this.my_media = null;
    this.filesLocation = null;
    this.recordingTimer = null;
    this.playingTimer = null;

    // methods
    this.construct = this.construct.bind(this);
    this.constructFromFile = this.constructFromFile.bind(this);
    this.record = this.record.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.play = this.play.bind(this);
    this.stopPlay = this.stopPlay.bind(this);
    
  }
  
  
  construct(){
    this.filesLocation = cordova.file.externalDataDirectory;
    let fileName = this.filesLocation+ +new Date()+ ".amr";
    this.my_media = new Media(fileName,
      ()=>onSuccess(),
      (err)=>onError(err),
      (status)=>mediaStatus(status)
    );
    console.log(this.my_media);
    console.log("Constructed ! ");
  }

  constructFromFile(){
    let fileName =  this.props.currentPlayingFile;
    console.log("constructing from file : "+fileName)
    this.my_media = new Media(fileName,
      ()=>{
        this.props.dispatch(setRecorderState("INIT"))
      },
      (err)=>onError(err),
      (status)=>mediaStatus(status)
    );
    console.log(this.my_media);
  }
  
  record(){
    duration = 0;
    this.my_media.startRecord();
    this.recordingTimer = setInterval(()=>{
      duration+= this.props.config.TICK;
      this.props.dispatch(setMediaValues(duration, duration));
      if(duration >= this.props.config.MAX_RECORD_LENGTH)
        this.props.dispatch(setRecorderState("RECORDED"));
      },this.props.config.TICK);
  }
  
  stopRecord(){
    clearInterval(this.recordingTimer);
    this.my_media.stopRecord();
  }
  
  play(){
    this.my_media.play();
    this.playingTimer = setInterval(()=>{
      this.my_media.getCurrentPosition(
        (position)=>{
          console.log(position);
          if(position>0)
            this.props.dispatch(setMediaValues(Math.ceil(position)*1000, duration));
          if(position<0)
            this.props.dispatch(setRecorderState("PLAYED"));
            },
        (err)=>onError(err)
      );
    },this.props.config.TICK);
  }
  
  stopPlay(){
    clearInterval(this.playingTimer);
    this.my_media.stop();
  }
  
  render(){
    let s = this.props.playerState;
    switch (s){
      case "INIT":
          this.construct();
        break;
      case "PLAY_FROM_FILE":
        this.my_media.release();
        this.constructFromFile();
        this.my_media.play();
        break;
      case "RECORDING":
        this.record();
        break;
      case "RECORDED":
        this.stopRecord();
        getAndUpdateFilesList().then(
          (files)=>{
            this.props.dispatch(updateFilesList(files));
          }).catch(
          (err)=>console.log(err)
        );
        break;
      case "PLAYING":
        this.play();
        break;
      case "PLAYED":
        this.stopPlay();
        break;
    }
    
    
    return <div style={{display:"none"}}></div>;
  }
}

function mapStateToProps(store) {
  return {
    playerState: store.recorderReducer.playerState, 
    currentPlayingFile:store.recorderReducer.currentPlayingFile, 
    config:store.cordovaReducer.config,
  };
}

export default connect(mapStateToProps)(SoundHandler); 




