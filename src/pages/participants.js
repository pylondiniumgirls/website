import React from "react";
import { FaTwitter } from "react-icons/fa";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">Participant inscription</h1>
    </section>
    <section className="hero is-primary is-bold is-large">
      <div class="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            We are sorry but the inscription is not open yet!
          </h1>
          <div className="buttons is-centered">
            <a className="button is-medium is-link">
              <span className="icon">
                <FaTwitter size="fa"/>
              </span>
              <a href="https://twitter.com/pylondinium?lang=en">
                Keep connected
              </a>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);
