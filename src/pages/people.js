import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

import picture_ana from "../images/ana-picture.jpg";
import bloomberg_logo from "../images/bloomberg-logo.png";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">People</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="column">
            This workshop is completely organized by volunteers who have
            dedicated their time to make this the best possible experience. For
            that reason, we would like to thank the following people:
          </div>
          <img className="centered people" src={picture_ana} alt="ana" />
          <div className="content has-text-centered">Ana Lopez</div>
        </div>
      </div>
    </section>
    <section className="container">
      <h3 className="title is-3 has-text-centered">Sponsors</h3>
      <img className="centered logo" src={bloomberg_logo} alt="bloomberg-logo" />
    </section>
    <section className="section">
      <h3 className="title is-3 has-text-centered">Contact us</h3>
      <div className="columns is-centered">
        <div className="column is-half">
          If you have any questions about the workshop, you have any problems
          registering as a participant or a mentor, or you want to talk to us
          about anything in particular, you can contact in our{" "}
          <a className="emphasis" href="mailto: pylondiniumgirls@gmail.com">
            email
          </a>{" "}
          or you can leave us a message in our{" "}
          <a
            className="emphasis"
            href="https://twitter.com/pylondiniumgir1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter account
          </a>
        </div>
      </div>
    </section>
  </div>
);
