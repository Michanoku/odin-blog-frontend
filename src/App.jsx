import { useState } from "react";
import Header from "./components/Header.jsx";
// ASSET IMPORT EXAMPLE: import ASSET from "./assets/ASSET.FILEENDING";
import "./styles/index.css";
import "./styles/header.css";

const variable = "something";

const dummyUsers = [
  {
    id: "user-1",
    username: "Jean-Michael Vincent",
    email: "jmv@example.com",
    author: true,
  },
  {
    id: "user-2",
    username: "HughJackman",
    email: "hugh@example.com",
    author: true,
  },
  {
    id: "user-3",
    username: "Reader42",
    email: "reader42@example.com",
    author: false,
  },
];

const dummyPosts = [
  {
    id: "post-1",
    createdAt: "2026-08-15T09:30:00.000Z",
    publishedAt: "2026-08-16T10:00:00.000Z",
    title: "My First Blog Post",
    body: "This is the first post on the blog. It contains some sample text so we can see what a normal blog post looks like in the frontend.",
    category: "Technology",
    slug: "my-first-blog-post",
    published: true,
    userId: "user-1",
    user: dummyUsers[0],
    comments: [
      {
        id: "comment-1",
        createdAt: "2026-08-17T12:15:00.000Z",
        body: "Great first post! Looking forward to reading more.",
        userId: "user-3",
        user: dummyUsers[2],
        postId: "post-1",
      },
      {
        id: "comment-2",
        createdAt: "2026-08-18T08:45:00.000Z",
        body: "I really like the design of this blog.",
        userId: "user-2",
        user: dummyUsers[1],
        postId: "post-1",
      },
    ],
  },

  {
    id: "post-2",
    createdAt: "2026-08-20T14:20:00.000Z",
    publishedAt: "2026-08-21T09:00:00.000Z",
    title: "Things I Learned While Building an Express API",
    body: `Building an API from scratch taught me quite a few things about authentication, middleware, database relationships, and testing.

The biggest lesson was that separating routes, controllers, and database queries makes the whole project much easier to reason about.

There is still plenty to learn, but the pieces are finally starting to fit together.`,
    category: "Programming",
    slug: "things-i-learned-while-building-an-express-api",
    published: true,
    userId: "user-2",
    user: dummyUsers[1],
    comments: [
      {
        id: "comment-3",
        createdAt: "2026-08-22T16:30:00.000Z",
        body: "The separation between controllers and database queries made a huge difference for me too.",
        userId: "user-1",
        user: dummyUsers[0],
        postId: "post-2",
      },
    ],
  },

  {
    id: "post-3",
    createdAt: "2026-08-25T07:10:00.000Z",
    publishedAt: null,
    title: "This Post Is Still Being Written",
    body: "This is an unpublished draft. It should be useful for testing what the frontend does when a post is not yet published.",
    category: "Personal",
    slug: "this-post-is-still-being-written",
    published: false,
    userId: "user-1",
    user: dummyUsers[0],
    comments: [],
  },

  {
    id: "post-4",
    createdAt: "2026-08-27T11:00:00.000Z",
    publishedAt: "2026-08-28T08:30:00.000Z",
    title: "A Much Longer Blog Post Title That Lets Us Test How the Layout Handles Titles With Lots of Text",
    body: "Sometimes you need an unnecessarily long title just to make sure your CSS does not fall apart. This post exists for exactly that reason.",
    category: "Design",
    slug: "a-much-longer-blog-post-title-that-lets-us-test-layout",
    published: true,
    userId: "user-2",
    user: dummyUsers[1],
    comments: [
      {
        id: "comment-4",
        createdAt: "2026-08-29T13:00:00.000Z",
        body: "Very important research.",
        userId: "user-3",
        user: dummyUsers[2],
        postId: "post-4",
      },
      {
        id: "comment-5",
        createdAt: "2026-08-30T10:20:00.000Z",
        body: "I appreciate the sacrifice made for CSS testing.",
        userId: "user-1",
        user: dummyUsers[0],
        postId: "post-4",
      },
      {
        id: "comment-6",
        createdAt: "2026-08-31T17:45:00.000Z",
        body: "This comment is here to make sure multiple comments look okay.",
        userId: "user-3",
        user: dummyUsers[2],
        postId: "post-4",
      },
    ],
  },
];



function App() {
  // Set the theme for the site
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const themeToggle = (theme) => {
    // Toggle the theme between light and dark
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme)
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  }
  
  return (
    <>
      <Header theme={theme} themeToggle={themeToggle}/>
      <main>
        <section></section>
        <aside></aside>
      </main>
    </>
  );
}

export default App;
