import React from 'react';
import {connect} from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {toggleDrawer} from './../../actions/DrawerActions';
import Subheader from 'material-ui/Subheader';
import langs from "./../../translations/LanguagesList";
import {updateLocale} from './../../actions/CordovaActions';
import {words} from "./../../translations/index";

class MyDrawer extends React.Component{
  constructor(props){
    super(props);
    this.setLanguage = this.setLanguage.bind(this);
    document.addEventListener("backbutton", ()=>{if(this.props.isOpened)this.props.dispatch(toggleDrawer(false))}, false);
  }
  
  setLanguage(x){
    console.log("setting Language : "+x);
    this.props.dispatch(updateLocale(x));
    words();
  }

  render(){
    
    let t = [];
    
    for(let i = 0; i < langs.length; i++){
      t.push(
        <ListItem
          key={i}
          primaryText={langs[i][0]}
          leftCheckbox={
            <Checkbox 
              checked={this.props.locale == langs[i][1]}
            />}
          onTouchTap={()=>this.setLanguage(langs[i][1])}
        />);
    }
    
    if(this.props.words)
      return (
        <Drawer
          docked={false}
          openSecondary={true}
          width="100%"
          open={this.props.isOpened}
          onRequestChange={(open) => this.props.dispatch(toggleDrawer(open))}
        >
        <List>
          <Subheader>{this.props.words.language}</Subheader>
          {t}
        </List>
        </Drawer>);
    else{
      return <div></div>;
    }
  }
}

function mapStateToProps(store) {
  return {
    words : store.cordovaReducer.words, 
    locale:store.cordovaReducer.locale,
    isOpened:store.drawerReducer.isDrawerOpened
  };
}
// here we are injecting some vars from the Redux store to our component via props.
export default connect(mapStateToProps)(MyDrawer); 
