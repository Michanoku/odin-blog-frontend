import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Blog from "./components/Blog.jsx";
import { Login, Register, Profile } from "./components/User.jsx";
import { getCurrentUser } from "./api/auth.js";

// ASSET IMPORT EXAMPLE: import ASSET from "./assets/ASSET.FILEENDING";
import "./styles/index.css";

function App() {
  // Set the theme for the site
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  // Set the user to null first
  const [user, setUser] = useState(null);
  // Set the state to make sure we know if we are already checking for auth
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthChecking(false);
      return;
    }

    getCurrentUser()
      .then((user) => setUser(user))
      .catch((error) => {
        console.error("Failed to restore user:", error);
        setUser(null);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, []);

  // The theme toggle function will flip on the document so set it up here
  const themeToggle = (theme) => {
    // Toggle the theme between light and dark
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  function ProtectedRoute({ user, authChecking, children }) {
    if (authChecking) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        theme={theme}
        themeToggle={themeToggle}
      />
      <main>
        <Routes>
          <Route path="/" element={<Blog user={user} />} />
          <Route path="/category/:category" element={<Blog user={user} />} />
          <Route path="/posts/:postId" element={<Blog user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} authChecking={authChecking}>
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
