import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/homepage.png";
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
    <div className="block md:flex">
      <div className="flex basis-1/2 h-screen justify-center items-center">
        <div className="flex flex-col bg-fuchsia-300 w-2/3 rounded-lg justify-center items-center">
          <h2 className="text-2xl text-gray-900 font-semibold m-4 p-4 font-mono">
            Login
          </h2>
          <div className="w-4/5">
            <label
              htmlFor="email"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Email:
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
              type="email"
              name="email"
              id="email"
              placeholder="abc@example.com"
              ref={emailRef}
            />
          </div>
          <div className="w-4/5">
            <label
              htmlFor="password"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-4/5 px-5 py-2.5 text-center my-4"
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </div>
      <div className="bg-slate-400 h-screen basis-1/2 hidden md:block">
        <img className="w-full h-full" src={background} alt="homepage icon" />
      </div>
    </div>

    // <div className="card">
    //   <div className="cardHeader">Login</div>
    //   <div className="cardBody">
    //     <div className="inputGroup">
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="abc@example.com"
    //         ref={emailRef}
    //       />
    //     </div>
    //     <div className="inputGroup">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="Your Password"
    //         ref={passwordRef}
    //       />
    //     </div>
    //     <button onClick={loginUser}>Login</button>
    //   </div>
    // </div>
  );
}

export default Login;
