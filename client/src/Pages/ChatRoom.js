import React, { useEffect, useState } from "react";

function ChatRoom({ socket }) {
  const [messages, setMessages] = useState([]);
  const [userId, setuserId] = useState("");
  const messageRef = React.useRef();
  const nameRef = React.useRef();

  socket.on("send-all-chats", (allChats, user) => {
    console.log("got all chats");
    setMessages(allChats);
    setuserId(user);
  });

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
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Random Chat</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message._id ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          name="message"
          placeholder="Enter your name!"
          ref={nameRef}
        />
      </div>
    </div>
  );
}

export default ChatRoom;
