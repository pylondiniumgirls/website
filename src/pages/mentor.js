import React from "react";
import { FaTwitter } from "react-icons/fa";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">Mentor registration</h1>
    </section>
    <section className="hero is-primary is-bold is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            We are sorry but the registration is not open yet!
          </h1>
          <div className="buttons is-centered">
            <div className="button is-medium is-link is-in-hero">
              <span className="icon">
                <FaTwitter size="fa" />
              </span>
              <a
                href="https://twitter.com/pylondiniumgir1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Keep connected
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="hero is-primary is-bold is-medium is-hidden-touch is-hidden-tablet">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">The registration is open!</h1>
        </div>
      </div>
    </section>
    <section className="section is-hidden-touch is-hidden-tablet">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you have any experience in Django?
              </label>
              <label className="radio">
                <input type="radio" name="yes-experience-question" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="no-experience-question" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">
              If you have experience in Django, could you tell us a bit more
              about it?
            </label>
            <div className="control">
              <textarea className="textarea" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Which operating system do you prefer to work with?
              </label>
              <label className="checkbox">
                <input type="checkbox" name="mac-os-question" /> Mac OS X
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="windows-os-question" /> Windows
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="linux-os-question" /> Linux
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                If there was not a group that will use the operative system you
                have selected, would you be ok working with a Windows group?
              </label>
              <label className="radio">
                <input type="radio" name="yes-windows-question" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="no-windows-question" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you think you will have enough time before the event to help
                your group (maximum 3 people) to install Python and Django on
                their laptops through Google Hangouts / Skype / e-mail?
              </label>
              <label className="radio">
                <input type="radio" name="yes-help-question" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="no-help-question" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you have any dietary requirements?
              </label>
              <div className="control">
                <textarea className="textarea" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Please, tell us a bit about yourself.
              </label>
              <div className="control">
                <textarea className="textarea" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Would you like to figure in the event website?
              </label>
              <p className="help">
                We would like to give you visibility in the webiste of the
                event, so we can show your contribution to the workshop and the
                Python community in general. If your answer is 'Yes', we will
                need you to also answer the next four questions. Otherwise, you
                can skip them.
              </p>
              <label className="radio">
                <input type="radio" name="yes-help-question" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="no-help-question" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">
              What name would you like to use in the website?
            </label>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Personal picture (optional)</label>
            <p className="help">
              Let us know a URL where we can find a personal picture of you if
              you want to have it associated to your name in the website.
              Otherwise, leave this field in blank and we will put a placeholder
              instead.
            </p>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Twitter (optional)</label>
            <p className="help">
              Let us know you Twitter handler if you would like to have a link
              underneath your profile. Otherwise, leave this field blank.
            </p>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Web page (optional)</label>
            <p className="help">
              Let us know your web page, your Linkedin profile, Github user...
              to have a link underneath your profile. Otherwise, leave this
              field blank.
            </p>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="coc-question" /> I've read and
                understood the Code of Conduct for the workshop
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit application</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
