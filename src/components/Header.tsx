import { Link } from "react-router-dom";
import "../styles/components/Header.style.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { languageState } from "../utils/slice/languageSlice";

function Header() {
  const navbarMenu = [
    { key: "home", url: "/" },
    { key: "addContact", url: "/contact/add" },
  ];

  const { i18n, t } = useTranslation();
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
            {navbarMenu.map((item, index) => (
              <li key={index}>
                <Link to={item.url} className="link-li">
                  {t(`navbar.${item.key}`)}
                </Link>
              </li>
            ))}
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
