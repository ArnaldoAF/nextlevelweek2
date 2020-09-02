import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import FullScreen from './components/FullScreen';


function Router() {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
            <Route path="/singup" component={SingUp} />
            <Route path="/home" component={Landing} />
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/> 
            <Route path="/fullscreen" component={FullScreen}/> 
        </BrowserRouter>
    )
}

export default Router;
