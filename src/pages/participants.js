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
    <section className="hero is-primary is-bold is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            We are sorry but the inscription is not open yet!
          </h1>
          <div className="buttons is-centered">
            <div className="button is-medium is-link is-in-hero">
              <span className="icon">
                <FaTwitter size="fa" />
              </span>
              <a
                href="https://twitter.com/pylondinium?lang=en"
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
          <h1 className="title has-text-centered">The inscription is open!</h1>
        </div>
      </div>
    </section>
    <section className="section is-hidden-touch is-hidden-tablet">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Are you under 18?</label>
              <p className="help">
                If you are under 18, you will need to bring a legal guardian
              </p>
              <label className="radio">
                <input type="radio" name="yes-under-18-question" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="no-under-18-question" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Which operating system do you use?
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
                What is your current level of experience with programming?
              </label>
              <label className="checkbox">
                <input type="checkbox" name="beginner-experience-question" />{" "}
                I'm a total beginner, I don't know anything about it
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="html-or-css-experience-question" />{" "}
                I've tried some HTML or CSS before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="javascript-experience-question" />{" "}
                I've tried some Javascript before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="python-experience-question" /> I've
                done a few lessons of Python
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="website-experience-question" />{" "}
                I've built a website before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="programmer-experience-question" />{" "}
                I work as a programmer
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                If you checked anything other than beginner, could you tell us a
                bit more about your programming knowledge?
              </label>
              <div className="control">
                <textarea className="textarea" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                What is your current occupation? Are you a student?
              </label>
              <div className="control">
                <textarea className="textarea" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Why are you interested in attending the workshop? Tell us a bit
                about your motivations and aspirations.
              </label>
              <div className="control">
                <textarea className="textarea" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you have any dietary requirements?
              </label>
              <div className="control">
                <textarea className="textarea" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="coc-question" />{" "}
                I've read and understood the Code of Conduct for the workshop
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
