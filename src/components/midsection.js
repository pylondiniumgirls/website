import React from "react";
import { Link } from "gatsby";

import "./style.scss";

const Midsection = () => (
  <div>
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="content">
              Would you like to learn how to build websites, but don't know
              where to start? Are you excited about programming but are not sure
              how to begin your journey? Then this workshop might be perfect for
              you.
            </div>
            <div className="content">
              Join us on Friday 14th June at Bloomberg for a free one-day
              workshop that will take place as part of the Pylondinium
              Conference, 2019 edition. During this workshop, you will be able
              to learn how to build websites from scratch using Python, Django,
              HTML and CSS.
            </div>
            <div className="buttons is-centered">
              <Link className="button is-medium is-link" to="/inscription">
                Participant
              </Link>
              <Link className="button is-medium is-link" to="/mentor">
                Mentor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Midsection;
