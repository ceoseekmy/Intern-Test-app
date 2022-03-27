import React,{useState,useEffect} from 'react'
import { BrowserRouter,Routes, Route } from "react-router-dom";///*/*/*/*//*/*/ exact ,render
import ChatRoom from './Pages/ChatRoom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import io from "socket.io-client"

function App() {
   const [socket,setSocket]=useState(null);

const setupSocket=()=>{

}
useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
     <Routes>
        <Route path="/register" 
         element={<Register/>} exact/>

         <Route path="/login" render={()=><Login setupSocket={setupSocket}/>} exact/>

         <Route path='/chatroom' render={()=><ChatRoom socket={socket}/>} exact/>
    </Routes>
    </BrowserRouter>
  )
}

export default App