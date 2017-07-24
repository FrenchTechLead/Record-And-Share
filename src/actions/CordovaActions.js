import {isFirstConnection} from './../utils/index';
import config from './../config/index';

export function deviceReady(){
  
  return{
    type:"DEVICE_READY",
    payload:{
      isFirstConnection : isFirstConnection(),
      config:config
    }
  }
}

export function updateLocale(locale){
  window.localStorage.setItem("locale",locale);
  return {
    type:"UPDATE_LOCALE",
    payload:locale
  }
}

export function updateFilesList(files){
  return {
    type:"UPDATE_FILES_LIST",
    payload:files
  }
}

export function updateWords(words){
  return {
    type:"UPDATE_WORDS",
    payload:words
  }
}
