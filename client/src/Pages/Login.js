import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();
  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:4000/api/auth/loginemail", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("loginToken", response.data.token);
        console.log("lets go to chatroom with token", response.data.token);

        props.setupSocket();
        navigate("/chatroom");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
}

export default Login;
