export function setRecorderState(state){
  return {
    type:state,
  }
}

export function setMediaValues(value,max){
  return{
    type:"SET_MEDIA_VALUES",
    payload:{
      value:value,
      max:max
    }
  }
}

export function playFromFile(filePath){
  return{
    type:"PLAY_FROM_FILE",
    payload:filePath
  }
}
