import axios from "axios";
import store from "../App";

export const FETCH_BOOKS = "fetch_books";
export const CREATE_BOOK = "create_book";
export const ADD_USER = "add_user";
export const LOGOUT_USER = "logout_user";
export const GET_USER = "get_user";
export const UPDATE_USER = "update_user";
export const CHECK_USER = "check_user";
export const GET_PROFILE = "get_profile";
export const UPDATE_PROFILE = "update_profile";

const ROOT_URL = "http://localhost:3001";

//target action
export function fetchBooks() {
  //middleware call
  //receive response from backend
  const response = axios.get(`${ROOT_URL}/books`);
  //Action dispatched
  console.log("Response",response);
  return {
    type: FETCH_BOOKS,
    payload: response
  };
}

export function addUser(data, callback) {
    console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIII Inside Add User")
		//set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    const request = axios.post('http://localhost:3001/signup',data)
    .then(() => callback());

  return {
    type: ADD_USER,
    payload: request
  };

}


export function updateProfile(data, callback) {
  console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIII Inside updateProfile")
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  const request = axios.post('http://localhost:3001/updateprofile',data)
  .then(() => callback());

return {
  type: UPDATE_PROFILE,
  payload: request
};

}

export function logoutUser(data) {
  return function (dispatch) {
      console.log('Inside Action Redux logout');
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/logout')
          .then(response => {
              console.log(response);
              if (response.status === 200) {
                  console.log("received OK TO LOGOUT");
                  var resultData = {
                      username : '',
                      password : '',
                      authFlag : false,
                  }
                  console.log('Sending Result Logout Redux: ',JSON.stringify(resultData));
                  dispatch({
                      type: LOGOUT_USER,
                      payload: resultData
                  });

              } else {
                var resultData = {
                  username : data.username,
                  password : data.password,
                  authFlag : true
                }
                console.log('Sending Result Logout Redux Failed : ',JSON.stringify(resultData));
                dispatch({
                  type: LOGOUT_USER,
                  payload: resultData
              });  
                
              }                            
          })
          .catch((err) => {
              if (err) {
                 // if (err.response.status === 401) {
                   var resultData = {
                  username : data.username,
                  password : data.password,
                  authFlag : true
                }
                     console.log(err);
                      console.log('inside res status 400', err);
                      console.log('Sending Result Logout Redux Failed : ',JSON.stringify(resultData));
                      dispatch({
                          type: LOGOUT_USER,
                          payload: resultData
                      });                        
                  //}
              }

          });
  }
}



export function checkUser(data) {
  return function (dispatch) {
      console.log('Inside Action');
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/login', data)
          .then(response => {
              console.log(response);
              if (response.status === 200) {
                  console.log("received in Login Redux: "+JSON.stringify(response.data))
                  localStorage.setItem("token", response.data.Token);
                  var resultData = {
                      username : response.data.pname,
                      password : response.data.ptype,
                      authFlag : true
                  }
                  console.log('Sending Result Login Redux: ',JSON.stringify(resultData));
                  dispatch({
                      type: CHECK_USER,
                      payload: resultData
                  });

              } else {
                var resultData = {
                  authFlag : false
                }
                dispatch({
                  type: CHECK_USER,
                  payload: resultData
              });  
                
              }                            
          })
          .catch((err) => {
              if (err) {
                 // if (err.response.status === 401) {
                  var resultData = {
                    authFlag : false
                  }
                     console.log(err);
                      console.log('inside res status 400', err);
                      dispatch({
                          type: CHECK_USER,
                          payload: resultData
                      });                        
                  //}
              }

          });
  }
}




export function getProfile(data) {
  return function (dispatch) {
      console.log('Inside getProfile Action');
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/profilepage', data)
          .then(response => {
              console.log(response);
              if (response.status === 200) {
                  var resultData = {
                    first_name: response.data[0].first_name,
                    last_name: response.data[0].last_name,
      				      email: response.data[0].email,
      				      city: response.data[0].city,
	  				        gender: response.data[0].gender,
	  				        phone_number: response.data[0].phone_number,
	  				        school: response.data[0].school,
	  				        hometown: response.data[0].hometown,
	  				        company: response.data[0].company,
	  				        languages: response.data[0].languages,	
	  				        country: response.data[0].country,
                    about_me: response.data[0].about_me,
	  				        authFlag: true
                  }
                  console.log('Result in action: ', resultData)
                  dispatch({
                      type: GET_PROFILE,
                      payload: resultData
                  });

              } else {
                var resultData = {
                  authFlag : false
                }
                dispatch({
                  type: GET_PROFILE,
                  payload: resultData
              });  
                
              }                            
          })
          .catch((err) => {
              if (err) {
                 // if (err.response.status === 401) {
                  var resultData = {
                    authFlag : false
                  }
                     console.log(err);
                      console.log('inside res status 400', err);
                      dispatch({
                          type: GET_PROFILE,
                          payload: resultData
                      });                        
                  //}
              }

          });
  }
}


export function createBook(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/book`, values)
    .then(() => callback());

  return {
    type: FETCH_BOOKS,
    payload: request
  };
}


