import { Sun, Moon, House, User } from 'lucide-react';

function ThemeToggle({ theme, themeToggle }) {
  const Icon = theme === "light" ? <Sun /> : <Moon />
    return (
      <button className="icon button" onClick={() => themeToggle(theme)}>
        { Icon }
      </button>
    );
  }

// The header function
export default function Header({ theme, themeToggle }) {
  return (
    <header>
      <nav>
        <div className="siteTitle">Michanoku Blog</div>
        <div className="icons">
          <a className="icon link" href="#">
            <House/>
          </a>
          <button className="icon button">
            <User />
          </button>
          <ThemeToggle theme={theme} themeToggle={themeToggle}/>
        </div>
      </nav>
    </header>
  );
}
