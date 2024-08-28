import { Trans } from "react-i18next"
import "../styles/components/Footer.styles.scss"

function Footer() {
    return (
        <footer className="footer-container">
            <p>© 2024 All rights reserved.</p>
            <Trans i18nKey={"welcomeMessage"}></Trans>
        </footer>
    )
}

export default Footer