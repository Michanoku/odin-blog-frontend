import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

  // Get all posts first, then set them all.
  useEffect(() => {
    getPosts().then((posts) => {
      setAllPosts(posts);
      setPosts(posts);

      // Get the unique categories from the posts and set them
      const uniqueCategories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    });
  }, []);

  // If a category was given, filter the posts accordingly and set them
  useEffect(() => {
    const newPosts = category
      ? allPosts.filter((post) => post.category === category)
      : allPosts;
    setPosts(newPosts);
  }, [category, allPosts]);

  // If we are looking at a category, add a back button to go to ALL
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
      {posts.length > 0 ? (
        posts.map((post) => <BlogPostLink key={post.id} post={post} />)
      ) : (
        <div className="contentWidth contentSpacing">
          <p className="contentHeader">No posts yet.</p>
        </div>
      )}
    </div>
  );
}
