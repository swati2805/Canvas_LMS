
import { ADD_USER } from "../actions";
import { GET_USER } from "../actions";
import { UPDATE_USER } from "../actions";

const initstate = {
  first_name:'',
  last_name:'',
  email:'',
  password:'',
city: '',
gender: '',
phone_number: '',
school: '',
hometown: '',
company: '',
languages: '',
country: '',
about_me: '',
ptype: 'student',
authFlag: false
};
//Reducer listening to different action types
//initial state is {}
export default function(state = initstate, action) {
  if (action.type === GET_USER) {
    return action.payload.data;
  }
  if(action.type === ADD_USER){
    state.authFlag = true;
  }


  return state;
}
