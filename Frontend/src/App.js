import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import thunk from 'redux-thunk'

import RootReducer from "./reducers";

import Profilepage from './components/profile/Profilepage';
import UpdateProfile from './components/profile/UpdateProfile';
import Login from './components/Login/Login';
import HomeS from './components/Home/Home';
import Navbar from './components/LandingPage/Navbar';
import Signup from './components/Signup/Signup';
import Course from './components/Course/Course';
import CourseS from './components/Course/CourseS';
import SubmitA from './components/Course/SubmitA';
import ViewA from './components/Course/ViewA';
import ViewPpl from './components/Course/ViewPpl';
import Grade from './components/Course/Grade';
import AddQuiz from './components/Course/AddQuiz';
import QuizView from './components/Course/QuizView';
import TakeQuiz from './components/Course/TakeQuiz';
import AddAnn from './components/Course/AddAnn';
import ProvideCode from './components/Course/ProvideCode';
import UseCode from './components/Course/UseCode';
import SearchAddCourse from './components/SearchAddCourse/SearchAddCourse';
import Newcourse from './components/Newcourse/Newcourse';
import Drop from './components/Drop/Drop';
import Inbox from './components/Inbox/Inbox';


//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(thunk)));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
        
            <Route path="/" component={Navbar} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={HomeS} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profilepage} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/course" component={Course} />
            <Route path="/courseS" component={CourseS} />
            <Route path="/submita" component={SubmitA} />
            <Route path="/viewa" component={ViewA} />
            <Route path="/viewppl" component={ViewPpl} />
            <Route path="/providecode" component={ProvideCode} />
            <Route path="/usecode" component={UseCode} />
            <Route path="/grade" component={Grade} />
            <Route path="/addquiz" component={AddQuiz} />
            <Route path="/quizview" component={QuizView} />
            <Route path="/takequiz" component={TakeQuiz} />
            <Route path="/addann" component={AddAnn} />
            <Route path="/newcourse" component={Newcourse} />
            <Route path="/search" component={SearchAddCourse} />
            <Route path="/drop" component={Drop} />
            <Route path="/inbox" component={Inbox} />

      
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

//Export the App component so that it can be used in index.js
export default App;
