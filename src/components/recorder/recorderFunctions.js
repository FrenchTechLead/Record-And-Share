export function onError(err){
  switch(err.code){
    case 1 : console.error("MEDIA_ERR_ABORTED "+ JSON.stringify(err) );break;
    case 2 : console.error("MEDIA_ERR_NETWORK "+JSON.stringify(err) );break;
    case 3 : console.error("MEDIA_ERR_DECODE "+JSON.stringify(err) );break;
    case 4 : console.error("MEDIA_ERR_NONE_SUPPORTED "+JSON.stringify(err) );break;
  }
}

export function mediaStatus(code){
  switch(code){
    case 0 : console.log("MEDIA_NONE");break;
    case 1 : console.log("MEDIA_STARTING");break;
    case 2 : console.log("MEDIA_RUNNING");break;
    case 3 : console.log("MEDIA_PAUSED");break;
    case 4 : console.log("MEDIA_STOPPED");break;
  }
}

export function onSuccess(){
  console.log("Media object has completed the current play, record, or stop action");
}

