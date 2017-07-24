let defaultState = {
  isDrawerOpened:false
};

export default function reducer(state = defaultState, action) {
  if(action.type === "TOGGLE_DRAWER"){
    return {...state, isDrawerOpened:action.payload.isDrawerOpened};
  }
    return state;
};
