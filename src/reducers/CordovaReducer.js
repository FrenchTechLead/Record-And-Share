let defaultState = {
  isFirstConnection:true,
  config:null,
  locale:"en",
  files:[]
};

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case "DEVICE_READY": 
      return {
        ...state,
        isFirstConnection:action.payload.isFirstConnection,
        config:action.payload.config
      };
    case "UPDATE_FILES_LIST":
      return {
        ...state,
        files:action.payload
      };

    case "UPDATE_LOCALE":
      return {
        ...state,
        locale:action.payload
      };

    case "UPDATE_WORDS":
      return {
        ...state,
        words:action.payload
      };
    
    default:
      return state;
  }
};
