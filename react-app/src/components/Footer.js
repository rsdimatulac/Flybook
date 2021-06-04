import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div>© 2021 Flybook. No rights reserved.</div>
            <div className="footer__links">

                <a href="https://rsdimatulac.github.io/" style={{ textDecoration: "none" }}><p className="about__link">About the Developer</p></a>
                <a href="https://github.com/rsdimatulac/Flybook">
                    <FaGithub id="github" />
                </a>
                <a href="https://www.linkedin.com/in/renerosedimatulac/">
                    <FaLinkedinIn id="linkedin" />
                </a>
            </div>
        </div>
    )
}

export default Footer;
