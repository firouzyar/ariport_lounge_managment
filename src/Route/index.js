import {Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import history from "./history";
import PrivateRoute from './privateRoute'
import AdminRoute from './adminRoute'

//route for components
const Login = lazy(() => import('../containers/Login/Login'));
const Landing = lazy(() => import('../containers/Landing/Landing'));
const AddLounges = lazy(() => import('../containers/addLounges/addLounges'));
const loungesDetail = lazy(() => import('../containers/loungesDetail/loungesDetail'));


const Routes = () => (
    <Router history={history}>
        <Suspense fallback={""}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/landing" component={Landing}/>
                <PrivateRoute path="/detail/:id" component={loungesDetail}/>
                <AdminRoute path="/add-lounges" component={AddLounges}/>
            </Switch>
        </Suspense>
    </Router>
);

export default Routes;