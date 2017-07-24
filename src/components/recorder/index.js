import React from 'react';
import SuperBtn from './SuperBtn';
import SuperSlider from './SuperSlider';
import {connect} from "react-redux";
import SoundHandler from './SoundHandler';
import PlayList from './../playlist';

export default class Recorder extends React.Component{

  
  render(){
    
    return (<div id="recorder-container">
      <SoundHandler/>
      <div className="row">
        <div className="col-xs-5 centerWrapper">
          <SuperBtn/>
        </div>
        <div className="col-xs-18" style={{height:"85px"}}>
          <SuperSlider/>
        </div>
      </div>
      <PlayList/>
    </div>);
  }
}
