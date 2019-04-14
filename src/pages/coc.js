import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">Code of Conduct</h1>
    </section>
    <section className="section">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="content">
            <p>
              Pylondinium Girls is dedicated to providing a respectful,
              harassment-free community for everyone. We do not tolerate
              harassment or bullying of any community member in any form. This
              does not only extend to participants and mentors from the
              workshop, but to anyone who you may interact during the workshop
              or anyone attending any of the other events in the conference.
              Harassment includes offensive verbal/electronic comments related
              to personal characteristics or choices, sexual images or comments
              in public or online spaces, deliberate intimidation, bullying,
              stalking, following, harassing photography or recording, sustained
              disruption of talks, IRC chats, electronic meetings, physical
              meetings or other events, inappropriate physical contact, or
              unwelcome sexual attention. Participants asked to stop any
              harassing or bullying behavior are expected to comply immediately.
              If a participant engages in harassing behavior, representatives of
              the community may take reasonable action they deem appropriate,
              including warning the offender, expulsion from the event, or
              expulsion from mailing lists, IRC chats, discussion boards and
              other electronic communications channels to resolve the issue.
              This may include expulsion from the whole conference. If you are
              being harassed, notice that someone else is being harassed, or
              have any other concerns, please act to intercede or ask for help
              from any member of the Pylondinium conference, IRC chat admins,
              website admins, or organizers/representatives of any physical
              events put on under the auspices of Pylondinium Girls. This Code
              of Conduct has been adapted from the{" "}
              <a
                className="emphasis"
                href="https://www.pyladies.com/CodeOfConduct/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pyladies Code of Conduct
              </a>{" "}
              and is licensed under a
              <a
                className="emphasis"
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
              >{" "}
                Creative Commons Attribution-Share Alike 3.0 Unported license
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);
