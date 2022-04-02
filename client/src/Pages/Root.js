import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
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
    <div className="card">
      <div className="cardHeader">Let's Chat</div>
      <div className="cardBody">
        <div className="inputGroup">
          <button type="submit">
            <Link to="/login"> Log in (user/Pass)</Link>
          </button>
        </div>
      </div>
      <div className="cardBody">
        <div className="inputGroup">
          <button type="submit">
            <Link to="/loginwithotp"> log in (Mobile)</Link>
          </button>
        </div>
      </div>
      <div className="inputGroup">
        <GoogleLogin
          clientId="41646862083-5cak9t0d1pg2dmb85mnsllset58q6i2m.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <button type="submit">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}
