import { useState } from "react";
// COMPONENT IMPORT EXAMPLE: import COMPMENT from "./components/COMPONENT.jsx";
// ASSET IMPORT EXAMPLE: import ASSET from "./assets/ASSET.FILEENDING";
import "./styles/index.css";

const variable = "something";

function App() {
  // USE STATE EXAMPLE
  // const [state, setState] = useState(0);

  return (
    <>
      <header>
        {/* THIS IS A COMMENT */}
        <div className="CLASS">
            <Component variable={variable} />
        </div>
      </header>
      <main>
      </main>
    </>
  );
}

export default App;
