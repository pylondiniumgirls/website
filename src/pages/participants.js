import React from "react";
import { FaTwitter } from "react-icons/fa";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";


function Request(form) {
  function validate() {
    // Validate first name
    let first_name = formData.get("first_name");
    inputErrors.first_name = first_name.toLowerCase() === first_name.toUpperCase();

    // Validate last name
    let last_name = formData.get("last_name");
    inputErrors.last_name = last_name.toLowerCase() === last_name.toUpperCase();

    // Validate email
    let email_regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    inputErrors.email = !email_regex.test(formData.get("email"));

    // It is compulsory to select an os
    inputErrors.os = formData.getAll("os").length === 0;

    // It is compulsory to select a level of experience
    let experience = formData.getAll("experience");
    inputErrors.experience = experience.length === 0;

    // If the experience is not beginner, it is compulsory to say something
    // about this experience
    if (experience.filter(elem => elem !== "beginner").length !== 0) {
      inputErrors.experience_notes = formData.get("experience_notes") === "";
    } else {
      inputErrors.experience_notes = false;
    }

    // It is required to explain the motivations for the workshop
    inputErrors.motivations = formData.get("motivations") === "";

    // It is required to read and accept the coc
    inputErrors.coc = formData.get("coc") !== "accept";

    return !Object.keys(inputErrors).some((key) => inputErrors[key]);
  }

  let inputErrors = {
    first_name: false,
    last_name: false,
    email: false,
    os: false,
    experience: false,
    experience_notes: false,
    motivations: false,
    coc: false
  };

  let formData = new FormData(form);
  let data = {
    type: "attendee",
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    legal_age: formData.get("legal_age") === "true",
    os: formData.getAll("os"),
    experience: formData.getAll("experience"),
    experience_notes: formData.get("experience_notes"),
    occupation: formData.get("occupation"),
    motivations: formData.get("motivations"),
    dietary: formData.get("dietary") || 'None',
  };

  return {
    data: data,
    errors: inputErrors,
    isValid: validate
  }
}

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
      submitted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let request = new Request(event.target);

    if(request.isValid()) {
      console.log(JSON.stringify(request.data));
      /*fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
      });*/
      this.setState({submitted: true});
      event.target.reset();
    } else {
      this.setState({submitted: false});
    }

    this.setState({errors: request.errors});
    window.scrollTo(0, 0);
  }

  render() {
    const errors = this.state.errors;
    const success = this.state.submitted;
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    return (
      <div>
        {
          success &&
          <h5 className="subtitle is-5 is-success">
            Thank you for registrating!
            You will receive an answer by the end of May.
          </h5>
        }
        {
          hasErrors &&
          <h5 className="subtitle is-5 is-failure">
            Sorry, we couldn't submit the registration.
            Make sure all of the required fields are filled and valid.
          </h5>
        }
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="first_name">
              First Name
            </label>
            <div className="control">
              <input
                className={errors.first_name ? "input is-danger" : "input"}
                name="first_name"
                type="text"
              />
              {
                errors.first_name &&
                <p className="help is-danger">
                  Invalid first name: the first name can only have letters
                </p>
              }
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="last_name">
              Last Name
            </label>
            <div className="control">
              <input
                className={errors.last_name ? "input is-danger" : "input"}
                name="last_name"
                type="text"
              />
              {
                errors.last_name &&
                <p className="help is-danger">
                  Invalid last name: the last name can only have letters
                </p>
              }
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
              <input
                className={errors.email ? "input is-danger" : "input"}
                name="email"
                type="email"
              />
              {errors.email && <p className="help is-danger">Invalid email</p>}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="legal_age">
                Are you under 18?
              </label>
              <p className="help">
                If you are under 18, you will need to bring a legal guardian
              </p>
              <label className="radio">
                <input type="radio" name="legal_age" value="true" checked /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="legal_age" value="false" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="os">
                Which operating system do you use?
              </label>
              <label className="checkbox">
                <input type="checkbox" name="os" value="macos" /> Mac OS X
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="os" value="windows" /> Windows
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="os" value="linux" /> Linux
              </label>
              {
                errors.os &&
                <p className="help is-danger">
                  Please select at least one operative system
                </p>
              }
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="experience">
                What is your current level of experience with programming?
              </label>
              <label className="checkbox">
                <input type="checkbox" name="experience" value="beginner" /> I'm a
                total beginner, I don't know anything about it
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="html_css" /> I've
                tried some HTML or CSS before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="javascript" />{" "}
                I've tried some Javascript before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="python" /> I've
                done a few lessons of Python
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="website" /> I've
                built a website before
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="professional" /> I
                work as a programmer
              </label>
              {
                errors.experience &&
                <p className="help is-danger">
                  Please select at least one checkbox about your level of experience
                </p>
              }
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="experience_notes">
                If you checked anything other than beginner, could you tell us a
                bit more about your programming knowledge?
              </label>
              <div className="control">
                <textarea
                  className={errors.experience_notes ? "textarea is-danger" : "textarea"}
                  name="experience_notes"
                  placeholder=""
                />
                {
                  errors.experience_notes &&
                  <p className="help is-danger">
                    As you selected an experience different than beginner,
                    this field is required
                  </p>
                }
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="occupation">
                What is your current occupation? Are you a student?
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="occupation"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="motivations">
                Why are you interested in attending the workshop? Tell us a bit
                about your motivations and aspirations.
              </label>
              <div className="control">
                <textarea
                  className={errors.motivations ? "textarea is-danger" : "textarea"}
                  name="motivations"
                  placeholder=""
                />
                {
                  errors.motivations &&
                  <p className="help is-danger">This field is required</p>
                }
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="dietary">
                Do you have any dietary requirements?
              </label>
              <div className="control">
                <textarea className="textarea" name="dietary" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="coc" value="accept"/>
                I've read and understood the Code of Conduct for the workshop
              </label>
              {
                errors.coc &&
                <p className="help is-danger">
                  It is required from you to read and accept the Code of Conduct
                </p>
              }
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">
                Submit application
              </button>
            </div>
          </div>
        </form>
    </div>
    );
  }
}

export default () => (
  <div>
    <Helmet />
    <Navbar />
    <section className="section">
      <h1 className="title has-text-centered">Participant registration</h1>
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
          <MyForm />
        </div>
      </div>
    </section>
  </div>
);
