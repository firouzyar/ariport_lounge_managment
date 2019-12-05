import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useSelector} from "react-redux";
import Layout from "../components/Layout/Layout"



const AdminRoute = ({isAuth, component:Component, ...rest}) =>{
   const user = useSelector(state => state.user);
   return <Route {...rest} component={(props) =>{
      return  (user.isAuthenticated && user.user.role==="admin" )? (<Layout> <Component {...props}/> </Layout>) :(<Redirect to='/landing'/>);
   }}/>
}
export default AdminRoute;