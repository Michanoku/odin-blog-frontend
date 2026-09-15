import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  House,
  User,
  LogIn,
  LogOut,
  UserPlus,
  UserPen,
} from "lucide-react";
import "../styles/header.css";
const apiUrl = import.meta.env.VITE_API_URL;

function loadView(event, target, setView) {
  event.preventDefault();

  setView(target);
  window.history.pushState({}, "", target === "home" ? "/" : `/${target}`);
}

// The user menu dropdown component
function Dropdown({ user, setView }) {
  const [open, setOpen] = useState(false);
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
  // When the dropdown is toggle, flip open
  function toggleDropdown() {
    setOpen(!open);
  }

  // Content is based on user being logged in or not
  const content = user ? (
    <>
      <a
        className="icon link"
        href={`${apiUrl}/profile`}
        onClick={(event) => loadView(event, "profile", setView)}
      >
        <UserPen /> Profile
      </a>
      <a className="icon link" href={`${apiUrl}/logout`} onClick={""}>
        <LogOut /> Logout
      </a>
    </>
  ) : (
    <>
      <a
        className="icon link"
        href={`${apiUrl}/login`}
        onClick={(event) => loadView(event, "login", setView)}
      >
        <LogIn /> Login
      </a>
      <a
        className="icon link"
        href={`${apiUrl}/register`}
        onClick={(event) => loadView(event, "register", setView)}
      >
        <UserPlus /> Register
      </a>
    </>
  );
  return (
    <div className="dropdown">
      <button className="icon button" onClick={toggleDropdown}>
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
    <button className="icon button" onClick={() => themeToggle(theme)}>
      {icon}
    </button>
  );
}

// The header function
export default function Header({ user, theme, themeToggle, setView }) {
  return (
    <header>
      <nav>
        <div className="siteTitle">Michanoku Blog</div>
        <div className="icons">
          <a
            className="icon link"
            href={`${apiUrl}/`}
            onClick={(event) => loadView(event, "home", setView)}
          >
            <House />
          </a>
          <Dropdown user={user} setView={setView} />
          <ThemeToggle theme={theme} themeToggle={themeToggle} />
        </div>
      </nav>
    </header>
  );
}
