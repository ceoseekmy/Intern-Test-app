import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import background from "../assets/homepage.png";
export default function Root(props) {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    if (response.accessToken) {
      localStorage.setItem("loginToken", response.accessToken);
      props.setupSocket();
      navigate("/chatroom");
    }
    console.log(response);
  };

  return (
    <div className="block md:flex">
      <div className="flex basis-1/2 h-screen justify-center items-center">
        <div className="flex flex-col bg-fuchsia-300 w-2/3 rounded-lg justify-center items-center">
          <h2 className="text-2xl text-gray-900 font-semibold m-4 p-4 font-mono">
            Hello there!😀{" "}
          </h2>

          <button
            className="text-white text-xl bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 p-4 m-4 w-2/3"
            type="submit"
          >
            <Link to="/login"> Log in (user/Pass)</Link>
          </button>

          <button
            className="text-white text-xl bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 p-4 m-4 w-2/3"
            type="submit"
          >
            <Link to="/loginwithotp"> log in (Mobile)</Link>
          </button>
         
         
            <GoogleLogin
              class="w-4 h-4 mr-2 ml-10"
              clientId="41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
         
        
          <button
            className="text-white text-xl bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 p-4 m-4 mb-8 w-2/3"
            type="submit"
          >
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
      <div className="bg-slate-400 h-screen basis-1/2 hidden md:block">
        <img className="w-full h-full" src={background} alt="homepage icon" />
      </div>
    </div>

  );
}
