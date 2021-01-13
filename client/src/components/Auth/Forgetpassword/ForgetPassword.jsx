import React,{useState} from 'react'
import axios from "axios"

 const  ForgetPassword=()=> {
     const [success,setSuccess]=useState('')
     const [error,setError]=useState('')
    const [email,setEmail]=useState('');

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API}/forget/password`,{email})
        .then(res=>{         
            if(res.data.message)
            {
                setSuccess(res.data.message)
            }else{
                setError("something went wrong! please try again")
            }


        })
         .catch(err=>{
           if(err.response.data)
           {
               setError(err.response.data.error);
           }
           else{
               setError('Network Error!')
           }
         })   



    }

    return (
        <div>
        <h5>Forgot Password?</h5>
            <form>
                <input value={email} onChange={handleChange} type="email" placeholder="Enter your email address"/>
                {email}
                <button onClick={onSubmit} type="submit" className="btn btn-success btn-xl">Submit</button>
            </form>
            {error}
            {success}
        </div>
    )
}
export default ForgetPassword;