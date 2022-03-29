import axios from 'axios';
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';


function LoginWithOtp(props) {
    const [portal,setPortal]=useState(false);
    const [number,setnumber]=useState("");
    const mobileRef = React.createRef();
    const otpRef = React.createRef();
    const navigate=useNavigate();
 
const sendOtp=()=>{
  const phone=mobileRef.current.value;
  if(mobileRef.current.value!==""){
    axios.post("http://localhost:4000/api/auth/sendotp",{
      phone,
    }).then((response)=>{
      setPortal(true);
      setnumber(response.data.phone)
}).catch((err)=>{
       console.log(err);
})

  }

}

const verifyotp=()=>{
  const otp=otpRef.current.value;
  const phone=number;
  if(otpRef.current.value!==""){
    axios.post("http://localhost:4000/api/auth/verifyotp",{
      phone,otp
    }).then((response)=>{
      localStorage.setItem("loginToken",response.data.token);
      console.log("lets go to chatroom with token",response.data.token);
     
      props.setupSocket()
       navigate("/chatroom");
}).catch((err)=>{
       console.log(err);
})
  }
}


  return (
    <div className="card">
    <div className="cardHeader">Login</div>
   {portal ? (<div className="cardBody">
      <div className="inputGroup">
        <label htmlFor="email">Enter Otp</label>
        <input
          type="tel"
           id="phone"
            name="phone"
            placeholder="enter Otp"
            ref={otpRef}
        />
      </div>
      
      <button onClick={verifyotp}>
     Verify
        </button>
    </div>) : (<div className="cardBody">
      <div className="inputGroup">
        <label htmlFor="email">Mobile no.</label>
        <input
          type="tel"
           id="phone"
            name="phone"
      
          placeholder="enter mobile no."
          ref={mobileRef}
        />
      </div>
      
      <button onClick={sendOtp}>
        Send otp
        </button>
    </div> )}
  </div>
  )
}

export default LoginWithOtp