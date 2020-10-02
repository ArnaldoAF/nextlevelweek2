import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, RouteProps, Switch} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import FullScreen from './components/FullScreen';
import { isAutheticated } from './services/auth';
import UserHeader from './components/UserHeader';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PrivateRoute = (props:PrivateRouteProps) => {
    const { component: Component, ...rest} = props;

    return (
        <>
        <UserHeader />
        <Route 
            {...rest}
            render = { routerProps => 
                
                isAutheticated() ? ( 
                    <Component {...routerProps} />
                ) : (
                    <Redirect to={{pathname:"/", state: { from: routerProps.location}}} />
                )
            }
        />
        </>
    )
}

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/singup" component={SingUp} />
                <PrivateRoute path="/home" component={Landing} />
                <PrivateRoute path="/study" component={TeacherList}/>
                <PrivateRoute path="/give-classes" component={TeacherForm}/> 
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Router;
