import React from "react";

import "./confirm.css"

const ConfirmDetails = ({ userDetails, onSubmit, prevStep, photo }) => {
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

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-12 coinfirmpage">
          <div className="row text-center my-4">
            <img
              src={photo}
              className="img-fluid  mx-auto rounded"
              width="120px"
              height="120px"
            />
          </div>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    value={email}
                    disabled
                    type="email"
                    placeholder="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled
                    value={password}
                    type="password"
                    placeholder="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled
                    value={profession}
                    type="text"
                    placeholder="profession"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled
                    value={birthdate}
                    type="date"
                    placeholder="birthdate"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    disabled
                    value={name}
                    type="text"
                    placeholder="name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled
                    value={lastname}
                    type="text"
                    placeholder="Lastname"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled
                    value={country}
                    type="text"
                    placeholder="Country"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <input
                    disabled
                    value={age}
                    type="number"
                    placeholder="Age"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button className="btn btn-success backbtn" onClick={goBack}>
                  prev
                </button>

                <button
                  style={{ float: "right" }}
                  className="btn btn-success signupbtn"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDetails;
