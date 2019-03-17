import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

import ana from "../images/ana-picture.jpg";
import bloomberg from "../images/bloomberg-logo.png";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">People</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="column">
            This workshop is completely organized by volunteers, who have
            dedicated their time to make this the best possible experience. For
            that reason, we would like to thank the following people:
          </div>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <figure className="image is-128x128">
                <img className="is-rounded" src={ana} alt="ana" />
                <div className="content has-text-centered">Ana Lopez</div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="container">
      <h3 className="title is-3 has-text-centered">Sponsors</h3>
      <div className="columns is-centered">
        <div className="column is-narrow">
            <img src={bloomberg} alt="bloomberg-logo"/>
        </div>
      </div>
    </div>
    <section className="section">
      <h3 className="title is-3 has-text-centered">Contact us</h3>
      <div className="columns is-centered">
        <div className="column is-half">
          If you have any questions about the workshop, you have any problems
          registering as a participant or a mentor, or you want to talk to us
          about anything in particular, you can contact in our{" "}
          <a href="mailto: pylondiniumgirls@gmail.com">email</a> or you can
          leave us a message in our{" "}
          <a href="https://twitter.com/pylondinium?lang=en">twitter account</a>
        </div>
      </div>
    </section>
  </div>
);
