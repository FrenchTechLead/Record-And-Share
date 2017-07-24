// Get the local of the user
export function  findLocale(){
  return new Promise((resolve, reject)=>{
    let locStorage = window.localStorage.getItem("locale");
    if(locStorage !== null){
      console.log("Getting Locale from local storage : "+locStorage);
      resolve(locStorage);
      return 1;
    }
    navigator.globalization.getPreferredLanguage(
      (loc)=>{
        let locale = loc.value.substr(0,2);
        console.log("Getting Locale with globalization plugin : "+locale);
        window.localStorage.setItem("locale",locale);
        resolve(locale);
      }, (err)=>{
        reject(err);
      });
  });
}


// determines if the user has opened the app before 
  export function isFirstConnection(){
    return window.localStorage.getItem("locale") === null;
}




export function getAndUpdateFilesList(){
    return new Promise((resolve, reject )=>{

      window.resolveLocalFileSystemURL(
        cordova.file.externalDataDirectory,
        fileSystem => {
          let reader = fileSystem.createReader();
          reader.readEntries(
            entries => resolve(entries)),
            err   => reject(err)
        },  err   => reject(err)
      )
    });
}
