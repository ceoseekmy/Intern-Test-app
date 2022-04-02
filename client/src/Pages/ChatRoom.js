import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function ChatRoom({ socket }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userId, setuserId] = useState("");
  const messageRef = React.useRef();
  const nameRef = React.useRef();

  useEffect(() => {
    if (socket) {
      socket.on("send-all-chats", (allChats, user) => {
        console.log("got all chats");
        setMessages(allChats);
        setuserId(user);
      });
    }
  }, []);
  // socket.on("send-all-chats", (allChats, user) => {
  //   console.log("got all chats");
  //   setMessages(allChats);
  //   setuserId(user);
  // });

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (currChat) => {
        const newMessages = [...messages, currChat];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        message: messageRef.current.value,
        sentname: nameRef.current.value,
      });
      messageRef.current.value = "";
    }
  };

  return (
    <div className=" bg-slate-300 h-full align-middle">
      <div className="text-2xl font-mono font-semibold p-4 text-center">
        Random Chat
      </div>
      <div className="flex">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-auto my-4"
          type="text"
          name="message"
          placeholder="Enter your name!"
          ref={nameRef}
        />
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={() => {
            localStorage.clear("loginToken");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="md:w-4/5 bg-gray-400 mx-auto border-2 rounded border-zinc-800 relative">
        <div className="[height:75vh] overflow-scroll">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message._id
                    ? "text-lime-600 font-bold"
                    : "text-blue-800 font-bold"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div className="flex">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-auto my-4"
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="chatroomPage">
    //   <div className="chatroomSection">
    //     <div className="cardHeader">Random Chat</div>
    //     <div className="chatroomContent">
    //       {messages.map((message, i) => (
    //         <div key={i} className="message">
    //           <span
    //             className={
    //               userId === message._id ? "ownMessage" : "otherMessage"
    //             }
    //           >
    //             {message.name}:
    //           </span>{" "}
    //           {message.message}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="chatroomActions">
    //       <div>
    //         <input
    //           type="text"
    //           name="message"
    //           placeholder="Say something!"
    //           ref={messageRef}
    //         />
    //       </div>
    //       <div>
    //         <button className="join" onClick={sendMessage}>
    //           Send
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       name="message"
    //       placeholder="Enter your name!"
    //       ref={nameRef}
    //     />
    //   </div>
    // </div>
  );
}

export default ChatRoom;
