import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { GiTechnoHeart as Technologies } from "react-icons/gi";
import "./Footer.css";

const Footer = () => {
    const [showTechnologies, setShowTechnologies] = useState(false);

    return (
        <div className="footer">
            <div>© 2021 Flybook. No rights reserved.</div>
            {showTechnologies &&
                <div className="footer__technologies">
                    <p>Built with</p>
                    <i class="devicon-javascript-plain"></i>
                    <i class="devicon-python-plain"></i>
                    <i class="devicon-flask-original"></i>
                    <i class="devicon-react-original"></i>
                    <i class="devicon-redux-original"></i>
                    <i class="devicon-sqlalchemy-plain"></i>
                    <i class="devicon-postgresql-plain"></i>
                    <i class="devicon-html5-plain"></i>
                    <i class="devicon-css3-plain"></i>
                    <i class="devicon-amazonwebservices-plain"></i>
                    <i class="devicon-docker-plain"></i>
                </div>}
            <div className="footer__links">
                <a href="https://rsdimatulac.github.io/" style={{ textDecoration: "none" }}>
                    <p className="about__link">About the Developer</p>
                </a>
                <div className="technologies" onMouseEnter={() => setShowTechnologies(true)} onMouseLeave={() => setShowTechnologies(false)}>
                    <Technologies />
                </div>
                <a href="https://github.com/rsdimatulac/Flybook">
                    <FaGithub id="github" />
                </a>
                <a href="https://www.linkedin.com/in/renerosedimatulac/">
                    <FaLinkedinIn id="linkedin" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
