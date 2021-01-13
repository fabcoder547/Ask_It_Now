import React, { useState } from "react";
import "./signup.css"
// import { signupUser } from "./helper/authHelper";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import ConfirmDetails from "./Confirm";
import { Link } from "react-router-dom";
import axios from "axios"
import { API } from "../../../Config/backend_api";

const Signup = () => {
  const [formData, setformData] = useState(new FormData());
  const [photo, setPhoto] = useState(
    "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
  );

  const [userDetails, setuserDetails] = useState({
    step: 1,
    name: "",
    email: "",
    lastname: "",
    country: "",
    profilepic: "",
    password: "",
   
    
    profession: "",
    success: false,
    error: false,
  });

  const {
    name,
    email,
    password,
    country,
    success,
    error,
 
    profession,
    profilepic, 
    
    lastname,
    step,
  } = userDetails;

  const nextStep = () => {
    setuserDetails({ ...userDetails, step: step + 1 });
  };

  const prevStep = () => {
    setuserDetails({ ...userDetails, step: step - 1 });
  };

  const onSubmit = (e) => {
   
    e.preventDefault();

    axios({
        method:"POST",
        url:`${API}/signup`,
        data:formData,

    })
    .then(res=>{
        console.log(res)
      
        if(res.data.error)
        {
            setuserDetails({
                ...userDetails,
                step:4,
                error:res.data.error
            })
        }
        else{
            setuserDetails({
                step:1,
                name:"",
                email:"",
                password:"",
               
                
                lastname:"",
                profession:"",
                profilepic:"",
                error:false,
                success:res.data.message
            })
            setPhoto("https://www.sackettwaconia.com/wp-content/uploads/default-profile.png");
            setformData(new FormData())
        }

    })
    .catch(err=>{
       console.log(err)
       setuserDetails(
           {
               ...userDetails,
             error:"Error in signup! please try again",
            success:false,
           }

       )
    })

  };

  const handelChange = (name) => (e) => {
    let value;
    if (name === "profilepic") {
      value = e.target.files[0];
      setPhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      value = e.target.value;
    }
    setuserDetails({ ...userDetails, [name]: value });
    formData.set(name, value);
  };

  const successMessaage = () => {
    if (success) {
      return (
        <div className="container text-center">
          <h6
            className="card-header bg-success"
            style={{ marginBottom: "10px", color: "white" }}
          >
            {success}
            <Link className="text-white" to="/signin">
              signin
            </Link>{" "}
            here ..{" "}
          </h6>
        </div>
      );
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

  const signupHeader = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 authHeader">
            <h3>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fff" }}
              ></i>{" "}
              askItNow
            </h3>
            <p>Take your questions here!</p>
          </div>
        </div>
      </div>
    );
  };
  const signupForm = () => {
    switch (step) {
      case 1: {
        return (
          <Form1
            userDetails={userDetails}
            handelChange={handelChange}
            nextStep={nextStep}
          />
        );
      }
      case 2: {
        return (
          <Form2
            userDetails={userDetails}
            handelChange={handelChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      }
      case 3: {
        return (
          <ConfirmDetails
            userDetails={userDetails}
            photo={photo}
            onSubmit={onSubmit}
            prevStep={prevStep}
          />
        );
      }
      // case 4: {
      //   return (
      //     <ConfirmDetails
      //       userDetails={userDetails}
      //       photo={photo}
      //       onSubmit={onSubmit}
      //       prevStep={prevStep}
      //     />
      //   );
      // }
    }
  };

  return (
    <div className="signupBody">
        {signupHeader()}
        {successMessaage()}
        {errorMessaage()}
        {signupForm()}
    </div>
  );
};
export default Signup;

