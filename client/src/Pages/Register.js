import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register(props) {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const phoneRef = React.createRef();

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
        props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            ref={nameRef}
          />
        </div>
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
      <div className="inputGroup">
        <label>Mobile no.</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Your mobile no."
          ref={phoneRef}
        />
      </div>
      <button type="submit" onClick={registerUser}>
        <Link to="/login">Register</Link>
      </button>
    </div>
  );
}

export default Register;
