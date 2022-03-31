import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Root() {
  const navigate = useNavigate();

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
        <button>log in (Google)</button>
      </div>

      <button type="submit">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}
