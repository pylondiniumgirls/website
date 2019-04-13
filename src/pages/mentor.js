import React from "react";
import { FaTwitter } from "react-icons/fa";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

function Request(form) {
  function validate() {
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Validate first name
    inputErrors.firstName = !nameRegex.test(formData.get("first_name"));

    // Validate last name
    inputErrors.lastName = !nameRegex.test(formData.get("last_name"));

    // Validate email
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    inputErrors.email = !emailRegex.test(formData.get("email"));

    inputErrors.companyName = formData.get("company_name") === "";

    // If the mentor has django experience, teling us about their django
    // experience is required.
    if (formData.get("django_experience") === "true") {
      inputErrors.djangoExperienceNotes =
        formData.get("django_experience_notes") === "";
    }

    // At least one os needs to be selected
    inputErrors.os = formData.getAll("os").length === 0;

    // If website info has been selected, the name of the mentor for
    // the website is required.
    if (formData.get("website_info") === "true") {
      inputErrors.websiteInfoName = formData.get("website_info_name") === "";
    }

    // It is required to read and accept the coc
    inputErrors.coc = formData.get("coc") !== "accept";

    return !Object.keys(inputErrors).some(key => inputErrors[key]);
  }

  let inputErrors = {
    firstName: false,
    lastName: false,
    email: false,
    companyName: false,
    djangoExperienceNotes: false,
    os: false,
    websiteInfoName: false,
    coc: false
  };

  let formData = new FormData(form);
  let data = {
    type: "mentor",
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    email: formData.get("email"),
    companyName: formData.get("company_name"),
    djangoExperience: formData.get("django_experience") === "true",
    djangoExperienceNotes: formData.get("django_experience_notes"),
    os: formData.getAll("os"),
    windowsAccepted: formData.get("windows_accepted") === "true",
    canHelpInstalling: formData.get("can_help_installing") === "true",
    dietary: formData.get("dietary") || "None",
    about: formData.get("about")
  };

  if (formData.get("website_info") === "true") {
    let websiteInfo = {
      name: formData.get("website_info_name")
    };

    let websiteInfoPicture = formData.get("website_info_picture");
    if (websiteInfoPicture) {
      websiteInfo["picture"] = websiteInfoPicture;
    }

    let websiteInfoTwitter = formData.get("website_info_twitter");
    if (websiteInfoTwitter) {
      websiteInfo["twitter"] = websiteInfoTwitter;
    }

    let websiteInfoUrl = formData.get("website_info_url");
    if (websiteInfoUrl) {
      websiteInfo["website"] = websiteInfoUrl;
    }

    data["website_info"] = websiteInfo;
  }

  return {
    data: data,
    errors: inputErrors,
    isValid: validate
  };
}

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
      submitted: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let request = new Request(event.target);

    if (request.isValid()) {
      console.log(JSON.stringify(request.data));
      /*fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
      });*/
      this.setState({ submitted: true });
      event.target.reset();
    } else {
      this.setState({ submitted: false });
    }

    this.setState({ errors: request.errors });
  }

  render() {
    const errors = this.state.errors;
    const success = this.state.submitted;
    const hasErrors = Object.keys(errors).some(key => errors[key]);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className={errors.firstName ? "input is-danger" : "input"}
                name="first_name"
                type="text"
              />
              {errors.firstName && (
                <p className="help is-danger">
                  Invalid first name: first name can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className={errors.lastName ? "input is-danger" : "input"}
                name="last_name"
                type="text"
              />
              {errors.lastName && (
                <p className="help is-danger">
                  Invalid last name: last name can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className={errors.email ? "input is-danger" : "input"}
                name="email"
                type="text"
              />
              {errors.email && <p className="help is-danger">Invalid email</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Company Name</label>
            <div className="control">
              <input
                className={errors.companyName ? "input is-danger" : "input"}
                name="company_name"
                type="text"
              />
              {errors.companyName && (
                <p className="help is-danger">
                  Please provide the name of the company you work for
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you have any experience in Django?
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="django_experience"
                  value="true"
                  checked
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="django_experience" value="false" /> No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">
              If you have experience in Django, could you tell us a bit more
              about it?
            </label>
            <div className="control">
              <textarea
                className={
                  errors.djangoExperienceNotes
                    ? "textarea is-danger"
                    : "textarea"
                }
                name="django_experience_notes"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Which operating system would you feel comfortable working with?
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
              {errors.os && (
                <p className="help is-danger">
                  Please check at least one checkbox
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                If needed, will you be available before the event to help your
                group (maximum 3 people) to install Python and Django on their
                laptops through Google Hangouts / Skype / e-mail?
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="can_help_installing"
                  value="true"
                  checked
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="can_help_installing" value="false" />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Do you have any dietary requirements?
              </label>
              <div className="control">
                <textarea className="textarea" name="dietary" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Would you like to feature on the event website?
              </label>
              <p className="help">
                We would like to give you visibility on the website of the
                event, so we can show your contribution to the workshop and the
                Python community. If your answer is 'Yes', we will need you to
                also answer the next four questions. Otherwise, you can skip
                them.
              </p>
              <label className="radio">
                <input type="radio" name="website_info" value="true" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="website_info" value="false" checked />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Name to use on the website</label>
            <div className="control">
              <input
                className={errors.websiteInfoName ? "input is-danger" : "input"}
                name="website_info_name"
                type="text"
              />
              {errors.websiteInfoName && (
                <p className="help is-danger">
                  This field is required and it can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Picture (optional)</label>
            <p className="help">
              Let us know a URL where we can find a picture of you if you want
              to have it associated to your name on the website.
            </p>
            <div className="control">
              <input
                className="input"
                name="website_info_picture"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Twitter (optional)</label>
            <p className="help">
              Let us know your Twitter handler to link to your profile.
            </p>
            <div className="control">
              <input
                className="input"
                name="website_info_twitter"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Web page (optional)</label>
            <p className="help">
              Let us know your web page, your Linkedin profile, Github user...
              to have a link underneath your profile.
            </p>
            <div className="control">
              <input className="input" name="website_info_url" type="text" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Is there anything else you would like to tell us about yourself?
              </label>
              <div className="control">
                <textarea className="textarea" name="about" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="coc" value="accept" /> I've read
                and understood the Code of Conduct for the workshop
              </label>
              {errors.coc && (
                <p className="help is-danger">
                  It is required from you to read and accept the Code of Conduct
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit application</button>
            </div>
          </div>
          {success && (
            <h5 className="subtitle is-5 is-success">
              Thank you for registering! You will receive an answer by the end
              of May.
            </h5>
          )}
          {hasErrors && (
            <h5 className="subtitle is-5 is-failure">
              Sorry, we couldn't submit the registration. Make sure all of the
              required fields are filled and valid.
            </h5>
          )}
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
          <h3 className="subtitle is-3 has-text-centered">
            The application will close on 19th May.
          </h3>
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
