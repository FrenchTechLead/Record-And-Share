import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import store from './store';
import {Provider} from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import  "./EventsListeners/index";
import "moment-duration-format";
import injectTapEventPlugin from 'react-tap-event-plugin';
import theme from './config/theme';
import 'typeface-roboto/index.css';
import 'pui-css-grids';
import './css/main.css';
import {deviceReady, updateLocale, updateFilesList} from "./actions/CordovaActions";
import {getAndUpdateFilesList, findLocale} from './utils/index';
import {words} from './translations/index';

injectTapEventPlugin();


document.addEventListener("deviceready",()=>{
  
  store.dispatch(deviceReady());
  
  findLocale().then((locale)=>{
    store.dispatch(updateLocale(locale));
    words();
    getAndUpdateFilesList().then(
      (files)=>{
      store.dispatch(updateFilesList(files));
    }).catch(
      (err)=>console.log(err)
    );
  }).catch((err)=>{console.log(err)});
  
  ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <Welcome></Welcome>
    </MuiThemeProvider>
  </Provider>, document.getElementById('app'));
  
},false);


