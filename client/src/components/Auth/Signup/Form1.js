import React from "react";
// import "../css/signup.css";
import { Link } from "react-router-dom";
const Form1 = ({ userDetails, handelChange, nextStep }) => {
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

  const goToNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="col-md-6 mx-auto signupForm">
        <div className="header bg-primary">
          <h3>Signup</h3>
        </div>

        <form>
          <div className="form-group">
            <input
              required={true}
              value={name}
              onChange={handelChange("name")}
              type="text"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              required={true}
              value={lastname}
              onChange={handelChange("lastname")}
              type="text"
              placeholder="lastname"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              required={true}
              value={email}
              onChange={handelChange("email")}
              type="email"
              placeholder="email"
              className="form-control"
            />
          </div>
          {/* <div className="form-group">
            <input
              value={age}
              onChange={handelChange("age")}
              type="number"
              placeholder="Age"
              className="form-control"
            />
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <p>
                Already on askItNow? <Link to="/signin">Sign in</Link>
              </p>
              <button
                className=" btn btn-md btn-success nextbtn"
                onClick={goToNext}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form1;
