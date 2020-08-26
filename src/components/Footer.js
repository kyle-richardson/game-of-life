import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = (props) => {
    return (
        <div className="footer-container">
            <p style={{ marginTop: "10px" }}>
                Made with <FontAwesomeIcon icon={faHeart} color={"red"} /> by Kyle
                Richardson
            </p>
            <div className="footer-icons">
                <a
                    className="mail-icon"
                    href="mailto:kyle.richardson1@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a
                    className="github-icon"
                    href="https://github.com/kyle-richardson"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    className="linkedin-icon"
                    href="https://linkedin.com/in/kyle-m-richardson"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
