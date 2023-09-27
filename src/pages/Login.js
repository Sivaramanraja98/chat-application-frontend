import React, { useContext, useState } from "react";
import "./Login.css";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { Spinner } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { socket } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        //socket work
        socket.emit("new-user");
        //navigate to chat
        navigate("/chat");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row margin">
        <div className="col-md-12 d-flex flex-direction-column align-items-center justify-content-center">
          <form onSubmit={handleLogin} style={{ width: "80%", maxWidth: 500 }}>
            {error && <p className="alert alert-danger ">{error.data}</p>}
            <h1 className="text-center">Login</h1>
            <div className="mb-3 align-items-center">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isLoading ? <Spinner animation="grow" /> : "Login"}
            </button>
            <div className="py-4">
              <p className="text-center">
                Dont't have an account <Link to="/signup">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
