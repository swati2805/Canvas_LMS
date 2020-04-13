

import { GET_PROFILE } from "../actions";

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

  if(action.type === GET_PROFILE){
    console.log("Inside GET_PROFILE reducer first name "+action.payload.first_name);
    console.log("Inside GET_PROFILE reducer last name "+action.payload.last_name);
    console.log("Inside GET_PROFILE reducer full payload "+JSON.stringify(action.payload));

      return Object.assign({}, state, action.payload);
  }

  return state;
}