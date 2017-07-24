import React from 'react';
import {green200,greenA700, grey200, red200, redA400, darkBlack} from "material-ui/styles/colors";
import MicIcon from 'material-ui/svg-icons/av/mic';
import RecordingIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import ReplayIcon from 'material-ui/svg-icons/av/replay';
import config from "./../config/index"

const MAX_RECORD_LENGTH = config.MAX_RECORD_LENGTH;

var defaultState = { //this is the default state
  playerState:"INIT",
  btn:{
    color:redA400,
    icon:<MicIcon/>
  },

  media:{
    value:0,
    max:MAX_RECORD_LENGTH,
    disabled:true
  },
  currentPlayingFile:""
};

export default function reducer(state=defaultState, action){

  switch (action.type){
    case "RECORDING":{
      return {...state,
        playerState:"RECORDING",
        btn:{
        color:redA400,
          icon:<RecordingIcon/>
        },
        media:{
          ...state.media,
          ...{
            disabled:true
         }
       }
      };
    }
    case "RECORDED":{
      return {...state,
        playerState:"RECORDED",
        btn:{
          color:greenA700,
          icon:<PlayIcon/>
        },
        media:{
          ...state.media,
          ...{
            disabled:true,
            value:0
          }
        }
      };
    }
    case "PLAYING":{
      return{...state,
        playerState:"PLAYING",
        btn:{
          color:redA400,
          icon:<StopIcon/>
        },
        media:{
          ...state.media,
          ...{
            disabled:false
          }
        }
      }
    }
    case "PLAYED":{
      return{...state,
        playerState:"PLAYED",
        btn:{
          color:darkBlack,
          icon:""
        },
        media:{
          ...state.media,
          ...{
            disabled:true
          }
        }
      }
    }
    case "INIT":{
      return defaultState;
    }
    case "SET_MEDIA_VALUES":{
      let value = action.payload.value;
      let max = action.payload.max;
      
      if(value>max)
        value = max;
      return {
        ...state,

        media:{
          ...state.media,
          ...{
            value:value,
            max:max
          }
        }
      }
    }
    case "PLAY_FROM_FILE":{
      return {
        ...state,
        playerState:"PLAY_FROM_FILE",
        currentPlayingFile:action.payload
      }
    }
    default: return state;
  }
};
