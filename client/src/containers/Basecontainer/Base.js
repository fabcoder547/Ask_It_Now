import React, { useEffect } from "react";

import $ from "jquery";
import {Navbar,Sidebar} from "../../components/index";

const Base = ({ children, title, shouldDisplay = false }) => {


//   useEffect(() => {
//     if (shouldDisplay) {
//       $("body").css({ "background-color": "#ffffff" });
//     } else {
//       $("body").css({ "background-color": "#0a859b" });
//     }
//   }, []);

  
  return (
   <>
      <div className="row ml-0 mr-0">
        <Navbar shouldDisplay={shouldDisplay} />
        <Sidebar shouldDisplay={shouldDisplay} />
      </div>
      <h3>{title}</h3>
      
       {children}
     
      {/* <Footer shouldDisplay={shouldDisplay} /> */}
    </>
  );
};
export default Base;
