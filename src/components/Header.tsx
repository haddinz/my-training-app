import { Link } from "react-router-dom";
import "../styles/components/Header.style.scss";

function Header() {
  return (
    <header className="header-container">
      <div>
        <nav>
          <Link to={"/"} className="link-name">
            Selectors
          </Link>
          
        </nav>

        <nav>
          <ul>
            <li>
              <Link to={"/"} className="link-li">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/contact/add"} className="link-li">
                Add Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
