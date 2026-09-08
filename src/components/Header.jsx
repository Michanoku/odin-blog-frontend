// A single blog post link1
// function Header() {
//   return (
//     "test"
//   );
// }

// The header function
export default function Header() {
  return (
      <header>
        <nav>
          <div className="siteTitle">Michanoku Blog</div>
          <div className="icons">
            <a href="#">Home</a>
            <button>User</button>
            <button>DarkMode</button>
          </div>
        </nav>
      </header>
  );
}
