import { loginAPI, registerAPI, updateAPI } from "../api/api.js";
import "../styles/user.css";
import { useNavigate } from "react-router-dom";


export function Login({ setUser }) {
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { token, user } = await loginAPI(formData);

    // TODO: ADD ERROR ETC
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/");
  }

  return (
    <div className="userView">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          maxlength="255"
        />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" minlength="12" maxlength="72" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export function Register({ setUser }) {
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { token, user } = await registerAPI(formData);

    // TODO: ADD ERROR ETC
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/");
  }

  return (
    <div className="userView">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          maxlength="255"
        />
        <label for="username">Username (3 - 32 characters)</label>
        <input
          id="username"
          name="username"
          type="text"
          minlength="3"
          maxlength="32"
        />
        <label for="password">Password (12 - 72 characters)</label>
        <input id="password" name="password" type="password" minlength="12" maxlength="72"/>
        <label for="confirmation">Confirmation</label>
        <input id="confirmation" name="confirmation" type="password" minlength="12" maxlength="72" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export function Profile({ user, setUser }) {
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }
  async function updateUser(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { token, user } = await updateAPI(formData);

    // TODO: ADD ERROR ETC
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/");
  }

    return (
    <div className="userView">
      <h2>Profile</h2>
      <form onSubmit={updateUser}>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={user.email}
          maxlength="255"
        />
        <label for="username">Username (3 - 32 characters)</label>
        <input
          id="username"
          name="username"
          type="text"
          minlength="3"
          maxlength="32"
          placeholder={user.username}
        />
        <label for="password">New Password (12 - 72 characters)</label>
        <input id="password" name="password" type="password" minlength="12" maxlength="72" />
        <label for="confirmation">Confirmation</label>
        <input id="confirmation" name="confirmation" type="password" minlength="12" maxlength="72" />
        <label for="currentPassword">Current Password (required)</label>
        <input id="currentPassword" name="currentPassword" type="password" minlength="12" maxlength="72" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
