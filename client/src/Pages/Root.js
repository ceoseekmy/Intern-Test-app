import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import{gapi} from 'gapi-script'
import LoginGoogle from '../components/LoginGoogle'
const clientId='41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com'

export default function Root(props) {
// useEffect(()=>{
//   console.log("mzee ag ye ")
//   function start(){
//     gapi.client.init({
//       clientId:clientId,
//       scope:""
//     })
//   };
//   gapi.load('client:auth2',start)
// })
const setup=()=>{
  console.log("lets strat");
  props.setupSocket();
}


  return (
    <div className="card">
    <div className="cardHeader">Let's Chat</div>
    <div className="cardBody">
      <div className="inputGroup">
      <button type="submit">
   
    <Link to='/login'> Log in (user/Pass)</Link>
    </button>
    
      </div>
     
     
    </div>
    <div className="cardBody">
      <div className="inputGroup">
      <button type="submit">
  
    <Link to='/loginwithotp'>  log in (Mobile)</Link>
    </button>
    
      </div>
     
     
    </div>
    <div className="inputGroup">
   <LoginGoogle setup={setup}/>
    </div>
    
    <button type="submit" >

    <Link to='/register'>Register</Link>
    </button>
  </div>
  )
}
