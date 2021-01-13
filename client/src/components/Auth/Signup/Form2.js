import React from "react";
// import "../css/signup.css";

const Form2 = ({ userDetails, handelChange, nextStep, prevStep }) => {
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

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
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
              value={password}
              onChange={handelChange("password")}
              type="password"
              placeholder="password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              required={true}
              value={country}
              onChange={handelChange("country")}
              type="text"
              placeholder="Country"
              className="form-control"
            />
          </div>
          {/* <div className="form-group">
            <input
              value={birthdate}
              onChange={handelChange("birthdate")}
              type="date"
              placeholder="birthdate"
              className="form-control"
            />
          </div> */}
          <div className="form-group">
            <input
              value={profession}
              onChange={handelChange("profession")}
              type="text"
              placeholder="profession"
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                className=" btn btn-md btn-success backbtn"
                onClick={goBack}
              >
                Prev
              </button>
              <button
                className=" btn btn-md btn-success nextbtn"
                onClick={goToNext}
              >
                Next
              </button>
            </div>
            {/* <div className="col-md-6">
             
            </div>
            <div className="col-md-6">
             
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form2;
