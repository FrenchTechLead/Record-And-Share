import React from 'react';
import AppBar from 'material-ui/AppBar';
import Recorder from './recorder';
import MyDrawer from './drawer/MyDrawer';
import {toggleDrawer} from './../actions/DrawerActions';
import store from './../store/index';

export default class Hello extends React.Component{
  
  render(){
    return <div>
              <AppBar
              onTouchTap={()=>store.dispatch(toggleDrawer(true))}
              />
              <MyDrawer/>
              <Recorder/>
            </div>;
  }
}
