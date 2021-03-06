const express = require("express");
const Router = require("./routers");
const cors = require("cors");
const {Server}=require("socket.io");
require("dotenv").config();
const connectDB = require("./database/connect")();

const User=require("./models/user.model")
const Chat=require("./models/chat.model")
const JWT = require("jsonwebtoken");
const { jwt } = require("twilio");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", Router);

let port = process.env.PORT || 4000;

const server=app.listen(port, function () {
  console.log("Server is up and running at port:", port);
});



////socket.io
 const io=new Server(server,{
  allowEIO3: true,//*/*/*//
  cors:{
      origin:'http://localhost:3000',
      methods:['GET','POST'],
      credentials: true//*/*/*/*
  },
})
 io.use(async(socket,next)=>{
   try {
     const token=socket.handshake.query.token;
     const payload= JWT.verify(token,process.env.SECRET);
  
     
     socket.id=payload.id;
     next()
   } catch (error) {
     
   }
 });

 io.on('connection',(socket)=>{
  console.log("Connected: " + socket.id);
    
  const finalpush=()=> Chat.find(function(err, res){
    if(err){
        throw err;
        
    }
     console.log(res);
    io.emit('send-all-chats', res,socket.id);
});
finalpush();

     socket.on("chatroomMessage",async (message,sentname)=>{
       let sender=sentname;
       if(sender=="")sender="Unknown"
      const chat=new Chat({
            name:sender,
            message:message
          })
          await chat.save();
        finalpush();

      })
})