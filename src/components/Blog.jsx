import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPosts, getSinglePost, getAllComments } from "../api/content.js";
import "../styles/blog.css";

// A single blog post link1
function BlogLink({ post }) {
  return (
    <div className="blogPost">
      <div className="upperInfo">
        <div className="authorName">{post.user.username}</div>
        <div className="publishedAt">{post.publishedAt}</div>
        <div className="category">{post.category}</div>
      </div>
      <div className="mainContent">
        <img className="blogImage" src={null} />
        <div className="bodyPreview">{post.body}TRUNCATED</div>
        <Link className="postLink" to={`/posts/${post.id}`}>
          Read more...
        </Link>
      </div>
    </div>
  );
}

// The list of blog articles
function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="blogList">
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
        <Link className="icon backLink" to="/posts">
          <ArrowLeft />
        </Link>
        <div className="blogContent">
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </div>
        <hr/>
        <h3>Comments</h3>
        <div className="blogComments">
          {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="commentAuthor">
                  {comment.user.username}
                </div>
                <div className="commentBody">
                  {comment.body}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default function Blog({ user }) {
  const { postId } = useParams();

  const content = postId ? <BlogPost postId={postId} /> : <BlogList />;

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
      </aside>
    </>
  );
}
