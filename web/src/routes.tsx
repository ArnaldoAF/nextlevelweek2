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

interface RoutePropsCustom extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PrivateRoute = (props:RoutePropsCustom) => {
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

const PublicRoute = (props: RoutePropsCustom) => {
    const { component: Component, ...rest} = props;

    return (
        <>
            <Route 
                {...rest}
                render = { routerProps => 
                    isAutheticated() ? (
                        <Redirect to={{ pathname:"/home", state: {
                            from : routerProps.location
                        }}} />
                    ) : (
                        <Component {...routerProps} /> 
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
                <PublicRoute path="/" component={Login} exact/>
                <PublicRoute path="/singup" component={SingUp} />
                <PrivateRoute path="/home" component={Landing} />
                <PrivateRoute path="/study" component={TeacherList}/>
                <PrivateRoute path="/give-classes" component={TeacherForm}/> 
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Router;
