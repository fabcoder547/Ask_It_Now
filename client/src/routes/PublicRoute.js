import React from "react"

import {Route} from "react-router-dom"


const Publicroute=({componet:Component,...rest})=>{ 
return(
        <Route 
            { ...rest}
           render={props=>
           <Component {...props}/>
           }
        />
)
}

export default Publicroute;