import React from 'react'
import "./navbar.css"
 const  Navbar=()=> {
    return (
    <nav
    //   style={{
    //     display: `${shouldDisplay ? "" : "none"}  `,
    //   }}
      className="navbar navbar-expand-lg navbar-custom navbar-light "
    >
   
      <button type="button" id="sidebarCollapse" className="btn btn-info">
        <i className="fa fa-bars"></i>
      </button>
      <a className="navbar-brand ml-auto" href="#">
        <i className="fa fa-question-circle"></i> askItNow
      </a>
    
    </nav>
    )
}

export default Navbar