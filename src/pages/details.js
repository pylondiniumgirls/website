import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

export default () => {
  const BingAPIKey = "Ai8gXmSJ-FYoFMnzUjdgjwntoRXFJ0UJEANF4gsokEFLCHcQWuqunj81-TFNJeMr";
  
  const Bloomberg = "51.512794,-0.090699";
  const pushpin = `${Bloomberg};46`;

  const imagerySet = "Road";
  const mapSize = "960,350";

  const MapUriDesktop = `
https://dev.virtualearth.net/REST/v1/Imagery/Map/
${imagerySet}/${Bloomberg}/18?
pushpin=${pushpin}&mapSize=${mapSize}&key=${BingAPIKey}`;

  const MapUriMobile = `
https://dev.virtualearth.net/REST/v1/Imagery/Map/
${imagerySet}/${Bloomberg}/19?
pushpin=${pushpin}&mapSize=${mapSize}&key=${BingAPIKey}`;

  return (
    <div>
      <Helmet />
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">Details</h1>
          <div className="columns">
            <div className="column is-half">
              <div className="content">
                <h4 className="subtitle is-4 has-text-centered">&nbsp;</h4>
                <p>
                  We strongly believe in the value of diversity, and these
                  events aim to kickstart and support women and underrepresented
                  groups in tech. The workshop is aimed at{" "}
                  <strong>complete beginners</strong> and no previous knowledge
                  about programming is required to participate. It will be in
                  the form of a tutorial which you will work on in small groups
                  guided by a mentor, so you will be able to learn at your own
                  pace and have all your questions answered.
                </p>
                <p>
                  The event is <strong>totally free</strong>. As a workshop
                  attendee you will have:
                </p>
                <ul>
                  <li>
                    A one-full day <strong>intensive workshop</strong> where you
                    will learn how to build your first website with Django.
                  </li>
                  <li>Lunch, snacks and drinks during the day.</li>
                </ul>
                <p>
                  We are trans-inclusive and encourage applications from all
                  women and non-binary people. Please note that everyone is
                  welcome to apply and applications from people belonging to
                  minorities and underrepresented groups in technololgy will
                  have priority.
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="content">
                <h4 className="subtitle is-4 has-text-centered">Agenda</h4>
                <p>
                  <strong>Friday 14th June 2019</strong>
                </p>
                <p>
                  <strong>8:30</strong> Guest arrival
                </p>
                <p>
                  <strong>9:00</strong> Welcome and introductions
                </p>
                <p>
                  <strong>9:30</strong> Workshop
                </p>
                <p>
                  <strong>13:00</strong> Lunch and networking
                </p>
                <p>
                  <strong>14:30</strong> Workshop continues
                </p>
                <p>
                  <strong>18:00</strong> Event close
                </p>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="content">
                <h4 className="subtitle is-4 has-text-centered">Location</h4>
                <p>Bloomberg LP, 3 Queen Victoria Street, London, EC4N 4TQ</p>

                <div id="locationMap">
                  <img src={MapUriDesktop} className="is-hidden-mobile" />
                  <img src={MapUriMobile} className="is-hidden-tablet" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
