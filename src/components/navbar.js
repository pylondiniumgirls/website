import React from "react";
import { Link } from "gatsby";

import "./style.scss";

const Navbar = () => {
  const navbar = React.createRef();
  let navbarOpen = false;

  const toggleNavbar = () => {
    navbarOpen = !navbarOpen;

    navbar.current.className = `navbar-menu ${navbarOpen ? "is-active" : ""}`;
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="icons/favicon.png" alt="favicon" />
          </a>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleNavbar}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarMenu" className="navbar-menu" ref={navbar}>
          <div className="navbar-start">
            <span className="navbar-item">
              <Link to="/details">Details</Link>
            </span>
            <div className="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Inscription</a>
              <div class="navbar-dropdown">
                <span className="navbar-item">
                  <Link to="/participants">Participants</Link>
                </span>
                <span className="navbar-item">
                  <Link to="/mentor">Mentor</Link>
                </span>
              </div>
            </div>
            <span className="navbar-item">
              <Link to="/faq">FAQ</Link>
            </span>
            <span className="navbar-item">
              <Link to="/people">People</Link>
            </span>
            <span className="navbar-item">
              <a
                href="https://twitter.com/pylondinium?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </span>
            <span className="navbar-item">
              <a
                href="https://pylondinium.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pylondinium
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
