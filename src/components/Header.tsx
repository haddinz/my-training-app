import { Link } from "react-router-dom";
import "../styles/components/Header.style.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { languageState } from "../utils/slice/languageSlice";

function Header() {
  const { i18n } = useTranslation();
  const data = useSelector((state: RootState) => state.language.value);
  const dispatch = useDispatch<AppDispatch>();
  const options = [
    { value: "en", label: "en", name: "English" },
    { value: "id", label: "id", name: "Indonesia" },
  ];

  const [dropdown, setDropdown] = useState<string>(data);

  const changehandle = async (value: string) => {
    setDropdown(value);
    dispatch(languageState(value));
    i18n.changeLanguage(value);
  };

  return (
    <header className="header-container">
      <div>
        <nav className="nav-title">
          <Link to={"/"} className="link-title">
            Selectors
          </Link>
        </nav>

        <nav className="nav-ul">
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
          <select
            className="link-select"
            value={dropdown}
            onChange={(e) => changehandle(e.target.value)}
          >
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}

export default Header;
