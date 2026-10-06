import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  Sun,
  User,
  UserPen,
  UserPlus,
} from "lucide-react";

import urls from "../api/urls.js";
import "../styles/header.css";

// The user menu dropdown component
function Dropdown({ user, setUser }) {
  // Used for opening and closing the dropdown
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // If the user wants to logout, simply remove the token and set the user to null
  function logoutUser(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setUser(null);

    // Close and navigate to home
    setOpen(false);
    navigate("/");
  }

  // IF the user clicks outside the dropdown, close it
  useEffect(() => {
    function handleClick(event) {
      // Close dropdown if clicked outside
      if (!event.target.closest(".dropdown")) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    // Remove event listener when component is removed
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  // When the dropdown is toggled, open it or close it
  function toggleDropdown() {
    setOpen(!open);
  }

  // Content is based on user being logged in or not
  const content = user ? (
    <>
      <Link className="icon" to="/profile" onClick={() => setOpen(false)}>
        <UserPen /> Profile
      </Link>
      <button className="icon" onClick={logoutUser}>
        <LogOut /> Logout
      </button>
    </>
  ) : (
    <>
      <Link className="icon" to="/login" onClick={() => setOpen(false)}>
        <LogIn /> Login
      </Link>
      <Link className="icon" to="/register" onClick={() => setOpen(false)}>
        <UserPlus /> Register
      </Link>
    </>
  );
  return (
    <div className="dropdown">
      <button className="icon" onClick={toggleDropdown}>
        <User />
      </button>
      <div className={open ? "dropdownMenu open" : "dropdownMenu"}>
        {content}
      </div>
    </div>
  );
}

// The theme toggle component
function ThemeToggle({ theme, themeToggle }) {
  // Set the icon to the current theme
  const icon = theme === "light" ? <Sun /> : <Moon />;
  return (
    <button className="icon" onClick={() => themeToggle(theme)}>
      {icon}
    </button>
  );
}

// The header function
export default function Header({ user, setUser, theme, themeToggle }) {
  const authorLink = user?.author ? (
    <a className="icon" href={urls.author}>
      <LayoutDashboard />
    </a>
  ) : null;

  return (
    <header className="responsivePadding">
      <nav>
        <h1 className="siteTitle">Michanoku Blog</h1>
        <div className="icons">
          <Link className="icon" to="/">
            <House />
          </Link>
          {authorLink}
          <Dropdown user={user} setUser={setUser} />
          <ThemeToggle theme={theme} themeToggle={themeToggle} />
        </div>
      </nav>
    </header>
  );
}
