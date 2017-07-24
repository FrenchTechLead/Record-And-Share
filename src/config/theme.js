import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

// to modify refer to : http://www.material-ui.com/#/customization/themes
// and https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js

var theme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  textAlign:'center',
  palette: {
    primary1Color: colors.blue900,
    primary2Color: colors.blueA200,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.blueGrey900,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.cyan500,
    clockCircleColor: fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack,
  },
  
});
 export default theme;
