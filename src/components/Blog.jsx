import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPosts, getSinglePost, getAllComments } from "../api/content.js";
import "../styles/blog.css";

// A single blog post link
function BlogLink({ post }) {
  // Helper function to truncate blog body text to display in the list
  function truncateText(text, maxLength) {
    // If the text is already shorter, just return
    if (text.length <= maxLength) return text;

    // Else, slice and trim, don't cut off any words but add ...
    return (
      text
        .slice(0, maxLength)
        .trimEnd()
        .replace(/\s+\S*$/, "") + "…"
    );
  }

  return (
    <div className="blogContent blogLink">
      <div>
        {post.user.username} /{" "}
        <span className="blogMeta">
          {post.category} /{" "}
          {new Date(post.publishedAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </span>
      </div>
      <h3 className="blogHeader">{post.title}</h3>
      <div className="bodyPreview">{truncateText(post.body, 150)}</div>
      <Link className="postLink" to={`/posts/${post.id}`}>
        Read more...
      </Link>
    </div>
  );
}

// The list of blog articles
function BlogList({ setCategories }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);

      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  return (
    <div className="blogPost">
      <h2 className="listTitle">Recent posts</h2>
      {posts.map((post) => (
        <BlogLink key={post.id} post={post} />
      ))}
    </div>
  );
}

function BlogPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([getSinglePost(postId), getAllComments(postId)]).then(
      ([post, comments]) => {
        setPost(post);
        setComments(comments);
      },
    );
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="blogPost">
        <div className="blogContent">
          <Link className="backLink" to="/">
            <ArrowLeft />
          </Link>
          <h2 className="blogHeader">{post.title}</h2>
          <div className="blogMeta">
            Written by {post.user.username} on{" "}
            {new Date(post.publishedAt)
              .toISOString()
              .slice(0, 16)
              .replace("T", " ")}
          </div>
          <div className="blogCategories">
            <div className="blogCategory">{post.category}</div>
          </div>
          <div className="blogBody">{post.body}</div>
        </div>
        <hr />

        <div className="blogComments">
          <h3 className="blogHeader">Comments</h3>
          {comments.map((comment) => (
            <div className="blogComment" key={comment.id}>
              <div className="commentMeta">
                {comment.user.username}{" "}
                <span className="blogMeta">
                  -{" "}
                  {new Date(comment.createdAt)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")}
                </span>
              </div>
              <div className="commentBody">{comment.body}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Blog({ user }) {
  const [categories, setCategories] = useState([]);
  const { postId } = useParams();
  const content = postId ? <BlogPost postId={postId} /> : <BlogList setCategories={setCategories} />;

  return (
    <>
      <section>{content}</section>
      <aside>
        {user && (
          <div className="userInfo">
            <User />
            <span>{user.username}</span>
          </div>
        )}
      {categories.map((category) => (
        <div key={category}>{category}</div>
      ))}
      </aside>
    </>
  );
}
