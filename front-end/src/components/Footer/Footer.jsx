import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <Link to="/contact" className="menu-items">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="menu-items">
                        AboutUs
                    </Link>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;