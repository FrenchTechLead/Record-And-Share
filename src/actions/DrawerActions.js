export function toggleDrawer(state){
  return{
    type:"TOGGLE_DRAWER",
    payload:{
      isDrawerOpened:state
    }
  }
}
