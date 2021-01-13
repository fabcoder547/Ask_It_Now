

export const setAuthentication=()=>
{
    localStorage.setItem("auth",true);
}

export const isAuthenticated=()=>{
   if(localStorage.getItem("auth")){return true}
   else return false;
}

export const Signout=(next)=>{
    localStorage.removeItem('auth');
    next();
}