import React from "react";
import axios from "axios";
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
          <button
            type="button"
            className="text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 p-4 m-4 w-2/3"
          >
            {/* <svg
              class="w-4 h-4 mr-2 ml-10"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg> */}
            <GoogleLogin
              class="w-4 h-4 mr-2 ml-10"
              clientId="41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </button>
          {/* <button type="submit">log in (Google)</button> */}
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

    // <div className="card">
    //   <div className="cardHeader">Let's Chat</div>
    //   <div className="cardBody">
    //     <div className="inputGroup">
    //       <button type="submit">
    //         <Link to="/login"> Log in (user/Pass)</Link>
    //       </button>
    //     </div>
    //   </div>
    //   <div className="cardBody">
    //     <div className="inputGroup">
    //       <button type="submit">
    //         <Link to="/loginwithotp"> log in (Mobile)</Link>
    //       </button>
    //     </div>
    //   </div>
    //   <div className="inputGroup">
    //     <GoogleLogin
    //       clientId="41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com"
    //       buttonText="Login"
    //       onSuccess={responseGoogle}
    //       onFailure={responseGoogle}
    //       cookiePolicy={"single_host_origin"}
    //     />
    //   </div>

    //   <button type="submit">
    //     <Link to="/register">Register</Link>
    //   </button>
    // </div>
  );
}
