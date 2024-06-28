import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import profile from "../../assets/images/profile.png";
import { logout } from "../../slice/userSlice";
const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const { currentUser } = useAppSelector((data) => data.user);
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setShow(false);
    navigate('/auth')
  }

  return (
    <>
      <nav className="navigation">
        <h3
          onClick={currentUser ? () => navigate("/home") : () => navigate("/")}
        >
          Quiz Time
        </h3>
        <ul>
          <li
            onClick={
              currentUser
                ? () => navigate("/leaderboard")
                : () => navigate("/auth")
            }
          >
            Leaderboard🏆
          </li>
          {currentUser ? (
            <img
              src={profile}
              alt=""
              className="profile"
              onClick={() => setShow(true)}
            />
          ) : (
            <li>
              <button onClick={() => navigate("/auth")}>Login</button>
            </li>
          )}
        </ul>
        {show && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShow(false)}>&times;</span>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

      </nav>
    </>
  );
};

export default Navbar;
