import store from './../store/index';
import {updateWords} from "./../actions/CordovaActions"
import ar from './ar';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';

export function words (){
  let locale = store.getState().cordovaReducer.locale;
  switch (locale){
    case "ar":
      store.dispatch(updateWords(ar));
      break;
    case "en":
      store.dispatch(updateWords(en));
      break;
    case "es":
      store.dispatch(updateWords(es));
      break;
    case "fr":
      store.dispatch(updateWords(fr));
      break;
    case "it":
      store.dispatch(updateWords(it));
      break;
    default:
      store.dispatch(updateWords(en));
      break;
  }
}
