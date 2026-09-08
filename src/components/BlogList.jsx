// A single blog post link1
function BlogPost({ post }) {
  return (
    <div className="blogPost">
      <div className="upperInfo">
        <div className="authorName">{ post.author.username }</div>
        <div className="publishedAt">{ post.publishedAt }</div>
        <div className="category">{ post.category }</div>
      </div>
      <div className="mainContent">
        <img className="blogImage" src="{ post.category }"/>
        <div className="bodyPreview">{ post.body }TRUNCATED</div>
        <a className="postLink" href="{ post.url }"></a>
      </div>
    </div>
  );
}

// The list of blog articles
export default function ScoreBoard({ posts }) {
  return (
    <div className="blogList"> 
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}
