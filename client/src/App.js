import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate,} from "react-router-dom"; ///*/*/*/*//*/*/ exact ,render
import ChatRoom from "./Pages/ChatRoom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Root from "./Pages/Root";
import LoginWithOtp from "./Pages/LoginWithOtp";
import io from "socket.io-client";

function App() {

  const [socket, setSocket] = useState(null);
  const [cc_token,setcc_token]=useState(localStorage.getItem('loginToken'))
  const setupSocket = () => {
   const token=localStorage.getItem('loginToken');
   setcc_token(localStorage.getItem('loginToken'))
   if(token && !socket){
     const newSocket=io("http://localhost:4000",{
       query:{
         token:localStorage.getItem('loginToken')
       }
     })
     newSocket.on("disconnect", () => {
      setSocket(null);
      setTimeout(setupSocket, 3000);
      
    });

     setSocket(newSocket);
   }
   else{
     
 return  <Route
 path="/login"
 element={<Login setupSocket={setupSocket} />}
 exact
/>
    }
  };
  useEffect(() => {
    setupSocket();
   setcc_token(localStorage.getItem('loginToken'))
    //eslint-disable-next-line
  }, []);

  return (
    <div > 
   <h1 className="text-3xl text-red-300 font-bold underline">
      Hello world!
    </h1>
    </div>
  //   <BrowserRouter>
  //     <Routes >
  //     <Route path="/" element={<Root />} exact />

  //       <Route path="/register" element={<Register />} exact />

  //       <Route
  //         path="/login"
  //         element={<Login setupSocket={setupSocket} />}
  //         exact
          
  //       />
  //       <Route path="/loginwithotp" element={<LoginWithOtp setupSocket={setupSocket} />} exact />
      
  //       <Route
  //         path="/chatroom"
  //         element={cc_token ?(socket? <ChatRoom socket={socket} />:setupSocket()): <Navigate to="/login"/>}
  //         exact
  //       />
  //     </Routes>
  //   </BrowserRouter>
  );
}

export default App;
