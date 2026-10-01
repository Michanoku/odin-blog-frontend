import { BlogPost } from "./blog/BlogPost.jsx";
import { BlogPostList } from "./blog/BlogPostList.jsx";
import "../../styles/content/ContentSection.css";

export function ContentSection({ user, postId, category, setCategories }) {
  const content = postId ? (
    <BlogPost postId={postId} user={user} setCategories={setCategories} />
  ) : (
    <BlogPostList setCategories={setCategories} category={category ?? null} />
  );

  return (
    <section>{content}</section>
  );
}
