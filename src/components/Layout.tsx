import { useTranslation } from "react-i18next";
import "../styles/components/Layout.styles.scss";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  return (
    <main className="layout-container">
      <Header />
      <div>
        <button onClick={() => i18n.changeLanguage("id")}>indo</button>
        <button onClick={() => i18n.changeLanguage("en")}>english</button>
      </div>
      <div className="layout-div">{children}</div>
      <Footer />
    </main>
  );
}

export default Layout;
