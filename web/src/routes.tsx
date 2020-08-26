import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';


function Router() {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/home" component={Landing} />
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/> 
        </BrowserRouter>
    )
}

export default Router;
