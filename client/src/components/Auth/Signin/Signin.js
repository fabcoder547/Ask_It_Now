import axios from "axios";
import React, { useState } from "react";

// import { signin, authenticate } from "./helper/authHelper";
import { Redirect, Link } from "react-router-dom";
import { API } from "../../../Config/backend_api";
import { setAuthentication } from "../helper";

import {GoogleLogin} from "react-google-login"
const Signin = ({ usercon, setusercon }) => {
 
  const [credentials, setCredentials] = useState({
    password: "12345",
    email: "atharvjoshi547@gmail.com",
    error: false,
    success: false,
  });

  const { password, email, success, error } = credentials;

  const onSubmit = (e) => {
    e.preventDefault();
  

   axios.post(`${API}/signin`,{email,password},{withCredentials:true})
   .then(res=>{    
    console.log(res);
       if(res.data.error)
       {
           setCredentials({...credentials,error:res.data.error,success:false})
       }
       else{
           setAuthentication();
            setCredentials({
                email:"",
                password:'',
                success:true,
                error:false,    
            })
       }
   })
   .catch(err=>{
       console.log(err.response)
   })


  };


  const responseGoogle=(response)=>{
   axios.post(`${API}/googlelogin`,{idToken:response.tokenId},{withCredentials:true})
   .then(res=>{

      if(res.data.message)
      {
        setAuthentication();
        setCredentials({
          email:"",
          password:"",
          error:false,
          success:true,
        })
      }

   })
   .catch(err=>{
     setCredentials({
       email:'',
       password:'',
       success:false,
       error:err.response.data.error
     })
   })
  }


  const responseErrorGoogle=(err)=>{
    console.log(err)
  }

  const handelChange = (name) => (e) => {
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const successMessaage = () => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const errorMessaage = () => {
    if (error) {
      return (
        <div className="container text-center">
          <h6
            className="card-header text-white bg-danger"
            style={{ marginBottom: "10px", color: "white" }}
          >
            {error}
          </h6>
        </div>
      );
    }
  };

  const signinForm = () => {
    return (
      <div className="container">
        <div className="col-md-6 mx-auto signinForm">
          <div className="header bg-primary text-center">
            <h3>Signin</h3>
          </div>
          <div>
            <GoogleLogin
               clientId="500759043755-str7ohoitguciodqlgj72rffgmnelc8e.apps.googleusercontent.com"
                 buttonText="Signin with Google"
                 onSuccess={responseGoogle}
                  onFailure={responseErrorGoogle}
               cookiePolicy={'single_host_origin'}
              />,
          </div>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                className="form-control"
                onChange={handelChange("email")}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={handelChange("password")}
              />
            </div>
            <div className="form-group text-center">
              <button
                onClick={onSubmit}
                className="btn btn-lg btn-success signinbtn"
              >
                Signin
              </button>
              <p><Link to="/users/forget/password">Forget Password</Link></p>
              <p>
                Dont't have an account?<Link to="/signup">Register</Link> here
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="signupBody">
     
        <div className="container">
          <div className="row ">
            <div className="col-md-12  signinheader">
              <h3>
                <i class="fa fa-question-circle"></i> askItNow
              </h3>
              <h4>Welcome Back</h4>
              <p>Dont' ignore your questions,Ask them here!</p>
            </div>
          </div>
        </div>
        {successMessaage()}
        {errorMessaage()}
        {signinForm()}
      
    </div>
  );
};
export default Signin;
