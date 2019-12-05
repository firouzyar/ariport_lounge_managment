import React, { useState } from 'react';
import { useDispatch } from "react-redux";
//components
import StringField from '../../components/Inputs/stringField';
import Button from "../../components/Buttons/Button";
import jwt from "jsonwebtoken";
//styles
import "./login.scss";
//utils
import apiService from "../../ustils/apiRequests";
import setAuthorizationToken from "../../ustils/setAuthorizationToken";
//actions
import {SET_CURRENT_USER} from "../../Types/Types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";


function Login(props) {

    const dispatch = useDispatch();
    const [form, setLogin] = useState({
        username: '',
        password: '',
    });
    const updateField = (e) => {

       setLogin({
            ...form,
            [e.target.name]: e.target.value
        });
    };
   const ToastMessage = ({message}) => <div><FontAwesomeIcon icon={faExclamationCircle}/><span style={{marginLeft:"10px"}}>{message}</span></div>;
    const submitLogin = e =>{
        e.preventDefault();
        const data = {
            username : form.username,
            password : form.password
        };
        apiService.post("/login",JSON.stringify(data))
            .then( response => {
                const token = response.data.token;
                if(token){
                    localStorage.setItem("token",token);
                    setAuthorizationToken(token);
                    dispatch({ type: SET_CURRENT_USER, user: jwt.decode(token)});
                    props.history.push('/landing')
                }
                else{
                   toast.error(<ToastMessage message={response.data.message}/>,{
                      position: "top-right",
                      autoClose: 3500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false
                   });
                }
        })
    }
    return (
       <div className="login-wrapper">
          <div className="box login-box">
             <h1>welcome to airport management</h1>
             <form onSubmit={submitLogin} >
                <div className="loginInputWrapper">
                   <StringField
                      value={form.username}
                      id="username"
                      name="username"
                      placeholder="Your Name"
                      label="username"
                      type="text"
                      onChange={updateField}
                   />
                </div>
                <div className="loginInputWrapper">
                   <StringField
                      value={form.password}
                      id="password"
                      name="password"
                      placeholder="Your password"
                      label="password"
                      type="password"
                      onChange={updateField}
                   />
                </div>
                <Button type="button" customClass="primary-btn login-btn" isDisabled={(form.username!=="" && form.password !== "") ? false : true }>login</Button>
             </form>
          </div>
       </div>
    );
}

export default Login;