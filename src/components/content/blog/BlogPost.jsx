import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPosts,
  getSinglePost,
  getAllComments,
} from "../../../api/content.js";
import { CommentSection } from "./CommentSection.jsx";
import "../../../styles/content/blog/blogPost.css";

export function BlogPost({ postId, user, setCategories }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

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
      <div className="contentColumn">
        <div className="contentWidth">
          <Link className="navLink back" to="/">
            <ArrowLeft />
          </Link>
          <h2 className="contentHeader">{post.title}</h2>
          <div className="contentMeta">
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
        <CommentSection
          comments={comments}
          setComments={setComments}
          postId={postId}
          user={user}
        />
      </div>
    </>
  );
}