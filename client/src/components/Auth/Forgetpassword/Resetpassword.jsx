import axios from 'axios'
import React,{useState} from 'react'
import {  useParams,Link } from 'react-router-dom'


 const Resetpassword=()=> {

        const [success,setSuccess]=useState('')
     const [error,setError]=useState('')

    const [passwords, setpasswords] = useState({
        password1:"",
        password2:"",
    })
    
    const {token}=useParams();

    const handleChange=(name)=>(e)=>
    {
        e.preventDefault();
        setpasswords({...passwords,[name]:e.target.value})
    }


    const onSubmit=(e)=>{



 e.preventDefault();
 if(passwords.password1!==passwords.password2)
 {
    return setError("password doesnt match")
 }


        
       
        axios.put(`${process.env.REACT_APP_API}/reset/password`,{
           password: passwords.password1,token
        })
        .then(res=>{
            
            if(res.data)
            {
                setSuccess(res.data.message);
            }else{
                setError('Something went wrong ! please try again')
            }

        })
        .catch(err=>{
            
            if(err.response)
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
            <form>
                
                <input onChange={handleChange('password1')} type="password"  placeholder="New password"/>
                {passwords.password1} 
                <input onChange={handleChange('password2')} type="password"  placeholder="Confirm new password" />

                 {passwords.password2} 
                <button onClick={onSubmit} className="btn btn-success btn-xl">Reset</button> 
                <button><Link to="/signin">Signin</Link></button>
                <br/>
                {success}
                {error}
            </form>    
        </div>
    )
}

export default Resetpassword