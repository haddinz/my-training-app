import "../styles/components/Layout.styles.scss"
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="layout-container">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
