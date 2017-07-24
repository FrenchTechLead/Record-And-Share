import React from 'react';
import {connect} from 'react-redux';
import Slider from 'material-ui/Slider';
import config from './../../config/index';
import moment from 'moment';

class SuperSlider extends React.Component{


  render(){
    return(
      <div>
        <div className="row">
          <div className="col-xs-12">
            <label>{moment.duration(this.props.media.value).format("mm:ss", { trim: false })}</label>
          </div>
          <div className="col-xs-12" style={{textAlign:"right"}}>
            <label>
              {
                this.props.playerState === "RECORDING" ? 
                  moment.duration(config.MAX_RECORD_LENGTH).format("mm:ss", { trim: false }) :
                  moment.duration(this.props.media.max).format("mm:ss", { trim: false })
              }
            </label>
          </div>
        </div>
        
        <Slider
          min={0}
          max={(this.props.playerState === "PLAYING" || this.props.playerState === "PLAYED" ) ? this.props.media.max : config.MAX_RECORD_LENGTH}
          defaultValue={0}
          disabled={this.props.media.disabled}
          value={this.props.media.value}
        />
      </div>
    );
    
  }
}

function mapStateToProps(store) {
  return {media:store.recorderReducer.media, playerState:store.recorderReducer.playerState};
}

export default connect(mapStateToProps)(SuperSlider); 
