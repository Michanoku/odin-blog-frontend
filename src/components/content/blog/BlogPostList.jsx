import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/content.js";
import "../../../styles/content/blog/blogPostList.css";

// A single blog post link
function BlogPostLink({ post }) {
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
    <div className="contentWidth contentSpacing">
      <div>
        {post.user.username} /{" "}
        <span className="contentMeta">
          {post.category} /{" "}
          {new Date(post.publishedAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </span>
      </div>
      <h3 className="contentHeader">{post.title}</h3>
      <div>{truncateText(post.body, 150)}</div>
      <Link className="blogPostLink contentSpacing" to={`/posts/${post.id}`}>
        Read more...
      </Link>
    </div>
  );
}

// The list of blog articles
export function BlogPostList({ setCategories, category }) {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setAllPosts(posts);
      setPosts(posts);

      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  useEffect(() => {
    const newPosts = category
      ? allPosts.filter((post) => post.category === category)
      : allPosts;

    setPosts(newPosts);
  }, [category, allPosts]);

  const back = category ? (
    <div className="contentWidth">
      <Link className="navLink" to="/">
        <ArrowLeft />
      </Link>
    </div>
  ) : null;

  return (
    <div className="contentColumn">
      {back}
      <h2 className="blogPostListTitle">{category ?? "Recent"} posts</h2>
      {posts.map((post) => (
        <BlogPostLink key={post.id} post={post} />
      ))}
    </div>
  );
}
