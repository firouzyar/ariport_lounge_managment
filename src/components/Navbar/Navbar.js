import React,{useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import Avatar from 'react-avatar';

//styles
import "./Navbar.scss";

//actions
import {LOG_OUT} from "../../Types/Types"

function Navbar(props) {
   const user = useSelector(state => state.user);
   const dispatch = useDispatch();
   const scrollHandler = event => {
      let matches = document.querySelector("header");

      if(window.scrollY >10){
         matches.classList.add('fixed');
      }
      else{
         matches.classList.remove('fixed');
      }
   };
   useEffect(() => {
      window.addEventListener("scroll", scrollHandler);
      return () => {
         window.removeEventListener("scroll", scrollHandler);
      };
   }, []);
   /*log out */
   const logout = () =>{
      localStorage.removeItem("token");
      dispatch({ type: LOG_OUT});
   }
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <div className="user-avatar">
                     <Avatar name={user.user.username} color="#bb2121" size={35} round="100%"/>
                     <span className="name">welcome {user.user.username}</span>
                  </div>
               </li>
               <li>
                  <NavLink exact to='/landing'>landing</NavLink>
               </li>
               {user.user.role === "admin" &&
                  <li>
                     <NavLink exact to='/add-lounges'>add lounges</NavLink>
                  </li>
               }
               <li>
                  <NavLink exact to='/' onClick ={logout} >logout</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   );
}

export default Navbar;