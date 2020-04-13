
import { CHECK_USER } from "../actions";
import { LOGOUT_USER } from "../actions";

const initstate = {
  username:'',
  password:'',
  authFlag: false
};
//Reducer listening to different action types
//initial state is {}
export default function(state = initstate, action) {

  if(action.type === CHECK_USER){
    console.log("Inside Check User reducer payload "+action.payload.authFlag);
    console.log("Inside Check User reducer username "+action.payload.username);
    return {
      ...state,
      result : action.payload
      }  
     
      //state.authFlag = action.payload.authFlag;
      //state.username = action.payload.username;
      //state.password = action.payload.password;
  }


  if(action.type === LOGOUT_USER){
    console.log("Inside logout User reducer payload "+action.payload.authFlag);
    console.log("Inside logout User reducer username "+action.payload.username);
    return {
      ...state,
      result : action.payload
      }  
     
      //state.authFlag = action.payload.authFlag;
      //state.username = action.payload.username;
      //state.password = action.payload.password;
  }

  return state;
}
