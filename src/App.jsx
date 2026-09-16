import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Blog from "./components/Blog.jsx";
import { Login, Register, Profile } from "./components/User.jsx";

// ASSET IMPORT EXAMPLE: import ASSET from "./assets/ASSET.FILEENDING";
import "./styles/index.css";

function App() {
  // Set the theme for the site
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  // Set the view for the site
  const [user, setUser] = useState(null);

  // The theme toggle function will flip on the document so set it up here
  const themeToggle = (theme) => {
    // Toggle the theme between light and dark
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  function ProtectedRoute({ user, children }) {
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
          <Route path="/posts/:postId" element={<Blog user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
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
