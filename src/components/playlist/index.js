import React from 'react';
import {connect} from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import {greenA700, redA700, grey400} from "material-ui/styles/colors";
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {playFromFile} from './../../actions/RecorderActions';
import {getAndUpdateFilesList} from './../../utils/index';
import {updateFilesList} from './../../actions/CordovaActions';
import moment from "moment";

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Playlist extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {active:""}
    this.setActive = this.setActive.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.sendByEmail = this.sendByEmail.bind(this);
  }
  
  setActive(x,nativeURL){
      this.setState({active:x});
    this.props.dispatch(playFromFile(nativeURL));
  }
  
  sendByEmail(filePath){
    cordova.plugins.email.open({
      to:      '',
      subject: this.props.words.emailSubject,
      body:    this.props.words.emailBody,
      attachments: [filePath]
    });
  }
  
  deleteElement(fileName){
    
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, (dir)=> {
      dir.getFile(fileName, {create:false}, (fileEntry) =>{
        fileEntry.remove(()=>{
          console.log("// The file has been removed succesfully");
          getAndUpdateFilesList().then(
            (files)=>{
              this.props.dispatch(updateFilesList(files));
            }).catch(
            (err)=>console.log(err)
          );
        },(error)=>{
          console.log("// Error deleting the file");
        },()=>{
          console.log("// The file doesn't exist");
        });
      });
    });
  }
  
  render(){
    moment.locale(this.props.locale);
    let tab = [];
    let x = this.state.active;
    let s =this.props.playerState;
    if(this.props.files && this.props.files.length > 0){
      for(let i = this.props.files.length -1 ; i >= 0  ; i--){
        let name = this.props.files[i].name;
        let nativeURL = this.props.files[i].nativeURL;
        let nameShort = name.substr(0,name.length - 4);
        tab.push(<div key={i}><ListItem
          primaryText={moment(parseInt(nameShort)).format('lll')}
          onTouchTap={()=>{this.setActive(i, nativeURL)}}
          secondaryText={moment(parseInt(nameShort )).fromNow()}
          leftAvatar={<Avatar 
                        icon={ (i === x && s == "PLAY_FROM_FILE")?<StopIcon/>:<PlayIcon/> } 
                        backgroundColor={(i === x && s == "PLAY_FROM_FILE")?redA700:greenA700}/>
                      }
          rightIconButton={
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem onTouchTap ={()=>this.deleteElement(name)} >{this.props.words.delete}</MenuItem>
              <MenuItem onTouchTap ={()=>this.sendByEmail(nativeURL)} >{this.props.words.sendByEmail}</MenuItem>
            </IconMenu>}
        /><Divider/></div>);
      }
    }
    
    return (<div id="playlist">
       <List>
         {tab}
       </List>
    </div>);
  }
}

function mapStateToProps(store) {
  return {words : store.cordovaReducer.words, locale:store.cordovaReducer.locale, files:store.cordovaReducer.files, playerState: store.recorderReducer.playerState};
}
// here we are injecting some vars from the Redux store to our component via props.
export default connect(mapStateToProps)(Playlist); 
