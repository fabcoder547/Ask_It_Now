import React,{useEffect} from 'react'

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import { isAuthenticated } from '../components/Auth/helper'
import {Home, Signup,Signin, Activate, Forgetpassword, Resetpassowrd} from '../components/index'

import PrivateRoute from "./Privateroute"
 const Routes=()=> {
     
useEffect(() => {
    console.log(isAuthenticated())
    
}, [])
    return (
       
        <Router>
            <Switch>
                <PrivateRoute path="/" exact component={Home}></PrivateRoute>
                
                <Route path="/signup" exact component={Signup}></Route> 
                <Route path="/signin" exact component={Signin}></Route> 
                <Route path="/users/activate/:token" exact component={Activate}/>
                <Route path="/users/forget/password" exact component={Forgetpassword}/>
                <Route path="/users/reset/password/:token" exact component={Resetpassowrd}/>
            </Switch>
        </Router>

    )
}
export default Routes;