import { firebaseApp } from './firebase';

class FirebaseMessaging {

  constructor(actions) {
    this._actions = actions;
  }

  onPermissionChanged = (hasPermission) => {
    this._emit(this._actions.onPermissionChanged(hasPermission));
  }


  subscribe(emit) {

    const messaging=firebaseApp.messaging();

    try{
      messaging.requestPermission()
      .then(function(){
        return messaging.getToken();
      })
      .then((token)=>{
        emit(this._actions.onTokenChanged(token));
      })
      .catch((error)=>{
        emit(this._actions.onPermissionChanged(false));
      })
    }catch(e){
      console.log(e);
    }

    messaging.onMessage(function(payload){
      console.log(payload);
    });


  }
}

export default FirebaseMessaging;
