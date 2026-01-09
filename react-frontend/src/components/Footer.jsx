// src/components/Footer.jsx
import '../style/Footer.css';

function Footer() {
    return (
        <footer className="pixel-footer">

            {/* 1. WRAPPER: Holds the columns side-by-side */}
            <div className="footer-content">

                {/* Column 1: Company Info */}
                <div className="footer-column">
                    <h3 className="footer-heading">Kaki Gamerz Corp.</h3>
                    <p>Leveling up reality since 1969.</p>
                </div>

                {/* Column 2: Contact Us */}
                <div className="footer-column">
                    <h3 className="footer-heading">Contact Us</h3>
                    <ul className="footer-links-list">
                        <li className="contact-info-item">
                            <i className="fa fa-map-marker"></i>
                            <span>USM, Penang, Malaysia</span>
                        </li>
                        <li className="contact-info-item">
                            <i className="fa fa-phone"></i>
                            <span>+60 19-88579</span>
                        </li>
                        <li className="contact-info-item">
                            <i className="fa fa-envelope"></i>
                            <span>kakigamerz@gmail.com</span>
                        </li>
                    </ul>
                </div>

            </div>


            {/* 2. BOTTOM SECTION: Sits underneath the wrapper */}
            <div className="footer-bottom">
                <p>&copy; 2026 Kaki Gamerz Corp. All rights reserved.</p>
            </div>

        </footer>
    );
}

export default Footer;