import { BlogPost } from "./blog/BlogPost.jsx";
import { BlogPostList } from "./blog/BlogPostList.jsx";
import "../../styles/content/contentSection.css";

// Shows the content section, either a blogpost if an ID was sent or the list of posts
export function ContentSection({ user, postId, category, setCategories }) {
  const content = postId ? (
    <BlogPost postId={postId} user={user} setCategories={setCategories} />
  ) : (
    <BlogPostList setCategories={setCategories} category={category ?? null} />
  );

  return <section>{content}</section>;
}
