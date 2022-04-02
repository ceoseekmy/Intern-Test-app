import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/homepage.png";
function Register() {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const phoneRef = React.createRef();
  const navigate = useNavigate();
  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;
    axios
      .post("http://localhost:4000/api/auth/signup", {
        name,
        email,
        password,
        phone,
      })
      .then((response) => {
        console.log("lets go to login");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="block md:flex">
      <div className="flex basis-1/2 h-screen justify-center items-center">
        <div className="flex flex-col bg-fuchsia-300 w-11/12 md:w-2/3 rounded-lg justify-center items-center">
          <h2 className="text-2xl text-gray-900 font-semibold m-4 p-4 font-mono">
            Sign up
          </h2>
          <div className="w-4/5">
            <label
              htmlFor="name"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Name:
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              ref={nameRef}
            />
          </div>
          <div className="w-4/5">
            <label
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
              htmlFor="email"
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
              Password:
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
          <div className="w-4/5">
            <label
              htmlFor="phone"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
            >
              Mobile no:
            </label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
              type="text"
              name="phone"
              id="phone"
              placeholder="Your mobile no."
              ref={phoneRef}
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-4/5 px-5 py-2.5 text-center my-4"
            type="submit"
            onClick={registerUser}
          >
            Register
          </button>
        </div>
      </div>
      <div className="bg-slate-400 h-screen basis-1/2 hidden md:block">
        <img className="w-full h-full" src={background} alt="homepage icon" />
      </div>
    </div>

    // <div className="card">
    //   <div className="cardHeader">Registration</div>
    //   <div className="cardBody">
    //     <div className="inputGroup">
    //       <label htmlFor="name">Name</label>
    //       <input
    //         type="text"
    //         name="name"
    //         id="name"
    //         placeholder="Your Name"
    //         ref={nameRef}
    //       />
    //     </div>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       id="email"
    //       placeholder="abc@example.com"
    //       ref={emailRef}
    //     />
    //   </div>
    //   <div className="inputGroup">
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       placeholder="Your Password"
    //       ref={passwordRef}
    //     />
    //   </div>
    //   <div className="inputGroup">
    //     <label>Mobile no.</label>
    //     <input
    //       type="text"
    //       name="phone"
    //       id="phone"
    //       placeholder="Your mobile no."
    //       ref={phoneRef}
    //     />
    //   </div>
    //   <button type="submit" onClick={registerUser}>
    //   Register
    //   </button>
    // </div>
  );
}

export default Register;
