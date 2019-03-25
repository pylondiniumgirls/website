import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">Frequently Asked Questions</h1>
    </section>
    <section className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-2">
          <div className="column">
            <h5 className="title is-5">
              Do I need to have any previous knowledge?
            </h5>
            <p>
              The workshop is aimed at complete beginners and no previous
              knowledge about programming or building websites is required to
              particapte. However, if you do have some basic previous knowledge
              (for example, you have done some previous HTML or CSS in the
              past), we encourage you to apply because we are sure you will
              still have a great time learning about a lot of other things such
              as Python and Django.
            </p>
          </div>
          <div className="column">
            <h5 className="title is-5">
              Is there any restriction on who can apply to participate in the
              workshop?
            </h5>
            <p>
              Everybody is welcome to apply. We are trans-inclusive and
              encourage applications from all women and non-binary people.
              However, applications from people belonging to minorities and
              underrepresented groups in technology will have priority.
            </p>
          </div>
          <div className="column">
            <h5 className="title is-5">Is food included?</h5>
            <p>
              Yes, food is included and, as the workshop, it will be free. All
              of this is possible thanks to our wonderful sponsor, Bloomberg,
              who will provide lunch and drinks and snacks during the day.
            </p>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="column">
            <h5 className="title is-5">
              Will computers be provided during the workshop?
            </h5>
            <p>
              Unfortunately we cannot lend you any computers; therefore, you
              will need to bring your own laptop with you. Bringing your own
              laptop will also enhance your experience, because you will be able
              to take home all the work you did during the day, show it to your
              family and friends and continue working on it if you wish to.
            </p>
          </div>
          <div className="column">
            <h5 className="title is-5">
              Then, if I need to bring my laptop, do I need any particular
              software preinstalled?
            </h5>
            <p>
              In order to be able to follow the tutorial of the workshop you
              will need to have installed Git, a code editor, Python and Django
              in your computer. For a better experience during the workshop, we
              encourage you to have everything installed in advance. As we know
              that this is an arduous task for somebody new to programming, we
              will try to assign you a mentor that will help you install
              everything you need in the days before the workshop. However, if
              you don't have everything ready at your arrival, you will also
              have the opportunity to install everything needed in the morning.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);
