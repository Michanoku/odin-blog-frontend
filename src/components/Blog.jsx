import { User } from "lucide-react";
import "../styles/blog.css";

// The blog function
export default function Blog({ user }) {
  return (
    <>
      <section></section>
      <aside>
        {user && (
          <div className="userInfo">
            <User />
            <span>{user.username}</span>
          </div>
        )}
      </aside>
    </>
  );
}
