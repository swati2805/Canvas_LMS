

import { UPDATE_PROFILE } from "../actions";

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
authFlag: false
};

export default function(state = initstate, action) {

  if(action.type === UPDATE_PROFILE){
    console.log("Inside STORE_PROFILE reducer full payload "+JSON.stringify(action.payload));

      return Object.assign({}, state, action.payload);
  }

  return state;
}