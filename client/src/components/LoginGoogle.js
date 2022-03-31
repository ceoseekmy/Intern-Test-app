import React from 'react'
import {GoogleLogin} from "react-google-login"
import {useNavigate} from 'react-router-dom';


const clientId='41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com'
function LoginGoogle(props) {
 
  const navigate=useNavigate();
    const responseGoogle=(response)=>{
        console.log(response.accessToken);
        localStorage.setItem("loginToken",response.accessToken);
        
       
        props.setup()
         navigate("/chatroom");
      }
  return (
    <div> 
    <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /></div>
  )
}

export default LoginGoogle