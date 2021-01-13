import axios from 'axios'
import React,{useState} from 'react'
import { useParams } from 'react-router-dom'

import { API } from "../../../Config/backend_api";
 const Activate=()=> {


   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
    

    const {token}=useParams()


    const onSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${API}/activate/user`,{token},{withCredentials:true})
        .then(res=>{
          if(res.data.message)
          { 
            setSuccess(res.data.message);
            setError('');
          }
        })
        .catch((err) => {
            setError(err.message);
          console.log( err.response)
        })

    }


    return (
        <div>
            <h5>This is your activation link </h5>
            {success}
            {error}
            <button type="submit" onClick={onSubmit} className=" btn btn-primary btn=lg">Verfy Email </button>
        </div>
    )
}
export default Activate