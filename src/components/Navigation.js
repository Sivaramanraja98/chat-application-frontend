import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useLogoutUserMutation } from "../services/appApi";

function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    //redirect to home page
    window.location.replace("/");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: " #e3f2fd" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              style={{ width: 40, height: 40, borderRadius: "20%" }}
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              {!user && (
                <Link to="/login" className="nav-link" aria-current="page">
                  Login
                </Link>
              )}
              <Link to="/chat" className="nav-link">
                Chat
              </Link>
              {user && (
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <>
                      <img
                        src={user.picture}
                        alt="userimg"
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      {user.name}
                    </>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-danger ms-3"
                      >
                        logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
