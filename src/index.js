import React from 'react';
import ReactDOM from 'react-dom';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import {Provider} from 'react-redux';
import createStore from './Store';
import setAuthorizationToken from "./ustils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import history from "./Route/history";
import * as serviceWorker from './serviceWorker';
//action
import {setCurrentUser} from "./containers/Login/Action";
//styles
import './index.scss';
const store = createStore();

if(localStorage.token){
   var dateNow = new Date(),
       user = jwt.decode(localStorage.token),
       unixTimeStamp = dateNow.getTime()/1000;
      if(user.exp <  unixTimeStamp){
         localStorage.removeItem("token");
         history.push('/');
      }
      else{
         setAuthorizationToken(localStorage.token);
         store.dispatch(setCurrentUser(user));
         if(history.location.pathname === '/'){
            history.push('/landing');
         }
      }


}
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

