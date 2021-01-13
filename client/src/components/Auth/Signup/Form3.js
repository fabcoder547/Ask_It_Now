import React from "react";
// import "../css/signup.css";

const Form3 = ({ userDetails, handelChange, nextStep, prevStep, photo }) => {
  const {
    name,
    email,
    password,
    country,
    success,
    error,
    age,
    profession,
    profilepic,
    birthdate,
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
        <div className="row text-center my-4 profilepic">
          <img
            src={photo}
            className="img-fluid  mx-auto rounded"
            width="120px"
            height="120px"
          />
        </div>
        <form>
          <div className="form-group">
            <input
              onChange={handelChange("profilepic")}
              type="file"
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form3;
