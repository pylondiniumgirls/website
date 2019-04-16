import React from "react";
import axios from "axios";
import { navigate } from "gatsby";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

class Request {
  nameRegex = /^[a-zA-Z\s]+$/;
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(form) {
    this.formData = {
      type: "mentor",
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      django_experience: "true",
      django_experience_notes: "",
      os: [],
      can_help_installing: "true",
      dietary: "",
      website_info: "false",
      website_info_name: "",
      website_info_twitter: "",
      website_info_url: "",
      about: "",
      coc: false,
      ...form
    };

    this.errors = {
      firstName: false,
      lastName: false,
      email: false,
      companyName: false,
      djangoExperienceNotes: false,
      os: false,
      websiteInfoName: false,
      coc: false
    };
  }

  get data() {
    return { ...this.formData };
  }

  isValid() {
    this.errors.firstName = !this.nameRegex.test(this.formData.first_name);
    this.errors.lastName = !this.nameRegex.test(this.formData.last_name);
    this.errors.email = !this.emailRegex.test(this.formData.email);

    this.errors.companyName = this.formData.company_name === "";

    // If the mentor has django experience, teling us about their django
    // experience is required.
    if (this.formData.django_experience === "true") {
      this.errors.djangoExperienceNotes =
        this.formData.django_experience_notes === "";
    }

    // At least one os needs to be selected
    this.errors.os = this.formData.os.length === 0;

    // If website info has been selected, the name of the mentor for
    // the website is required.
    if (this.formData.website_info === "true") {
      this.errors.websiteInfoName = this.formData.website_info_name === "";
    }

    // It is required to read and accept the coc
    this.errors.coc = !this.formData.coc;

    for (let errorType in this.errors) {
      if (this.errors[errorType]) {
        return false;
      }
    }

    return true;
  }
}

class MyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {},
      errors: {},
      submitError: false
    };
  }

  handleChange = event => {
    if (event.target.type === "radio" && !event.target.checked) {
      return;
    }

    let form = { ...this.state.form };
    form[event.target.name] = event.target.value;

    this.setState({ form: form });
  };

  handleListChange = event => {
    let form = { ...this.state.form };

    if (event.target.checked) {
      if (form[event.target.name]) {
        form[event.target.name].push(event.target.value);
      } else {
        form[event.target.name] = [event.target.value];
      }
    } else {
      if (form[event.target.name]) {
        let index = form[event.target.name].indexOf(event.target.value);
        if (index >= 0) {
          form[event.target.name].splice(index, 1);
        }
      }
    }

    this.setState({ form: form });
  };

  handleCocChange = event => {
    let form = { ...this.state.form };
    form[event.target.name] = event.target.checked;

    this.setState({ form: form });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let request = new Request(this.state.form);

    if (request.isValid()) {
      let url = process.env.GATSBY_URL;

      try {
        await axios.post(url, request.data);
        navigate("/form-submitted");
      } catch (error) {
        this.setState({ submitError: true });
      }
      this.setState({ errors: {} });
    } else {
      this.setState({ errors: request.errors });
    }
  };

  render() {
    const errors = this.state.errors;
    const hasErrors = Object.keys(errors).some(key => errors[key]);
    const submitError = this.state.submitError;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="first_name">
              First Name *
            </label>
            <div className="control">
              <input
                maxLength="50"
                className={errors.firstName ? "input is-danger" : "input"}
                name="first_name"
                type="text"
                onChange={this.handleChange}
              />
              {errors.firstName && (
                <p className="help is-danger">
                  Invalid first name: first name can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="last_name">
              Last Name *
            </label>
            <div className="control">
              <input
                maxLength="50"
                className={errors.lastName ? "input is-danger" : "input"}
                name="last_name"
                type="text"
                onChange={this.handleChange}
              />
              {errors.lastName && (
                <p className="help is-danger">
                  Invalid last name: last name can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email *
            </label>
            <div className="control">
              <input
                maxLength="50"
                className={errors.email ? "input is-danger" : "input"}
                name="email"
                type="email"
                onChange={this.handleChange}
              />
              {errors.email && <p className="help is-danger">Invalid email</p>}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="company_name">
                Company Name *
              </label>
              <input
                maxLength="50"
                className={errors.companyName ? "input is-danger" : "input"}
                name="company_name"
                type="text"
                onChange={this.handleChange}
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
              <label className="label" htmlFor="django_experience">
                Do you have any experience in Django? *
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="django_experience"
                  value="true"
                  onChange={this.handleChange}
                  defaultChecked
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="django_experience"
                  value="false"
                  onChange={this.handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="django_experience_notes">
              If you have experience in Django, could you tell us a bit more
              about it?
            </label>
            <div className="control">
              <textarea
                maxLength="250"
                className={
                  errors.djangoExperienceNotes
                    ? "textarea is-danger"
                    : "textarea"
                }
                name="django_experience_notes"
                placeholder=""
                onChange={this.handleChange}
              />
              {errors.os && (
                <p className="help is-danger">
                  As you selected that you had experience with Django, this
                  field is now required.
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="os">
                What operative systems would you feel comfortable working with?
                *
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="os"
                  value="macos"
                  onChange={this.handleListChange}
                />{" "}
                Mac OS X
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="os"
                  value="windows"
                  onChange={this.handleListChange}
                />{" "}
                Windows
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="os"
                  value="linux"
                  onChange={this.handleListChange}
                />{" "}
                Linux
              </label>
              {errors.os && (
                <p className="help is-danger">
                  Please select at least one operating system
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                If needed, will you be available before the event to help your
                group (maximum 3 people) to install Python and Django on their
                laptops through Google Hangouts / Skype / e-mail? *
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="can_help_installing"
                  value="true"
                  onChange={this.handleChange}
                  defaultChecked
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="can_help_installing"
                  value="false"
                  onChange={this.handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="dietary">
                Do you have any dietary requirements?
              </label>
              <div className="control">
                <textarea
                  maxLength="250"
                  className="textarea"
                  name="dietary"
                  placeholder=""
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="website_info">
                Would you like to feature on the event website? *
              </label>
              <p className="help">
                We would like to give you visibility on the website of the
                event, so we can show your contribution to the workshop and the
                Python community. If your answer is 'Yes', we will need you to
                also answer the next four questions. Otherwise, you can skip
                them.
              </p>
              <label className="radio">
                <input
                  type="radio"
                  name="website_info"
                  value="true"
                  onChange={this.handleChange}
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="website_info"
                  value="false"
                  onChange={this.handleChange}
                  defaultChecked
                />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="website_info_name">
              Name to use on the website
            </label>
            <div className="control">
              <input
                maxLength="50"
                className={errors.websiteInfoName ? "input is-danger" : "input"}
                name="website_info_name"
                type="text"
                onChange={this.handleChange}
              />
              {errors.websiteInfoName && (
                <p className="help is-danger">
                  This field is required and it can only contain letters
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="website_info_picture">
              Picture (optional)
            </label>
            <p className="help">
              Let us know a URL where we can find a picture of you if you want
              to have it associated to your name on the website.
            </p>
            <div className="control">
              <input
                maxLenght="90"
                className="input"
                name="website_info_picture"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="website_info_twitter">
              Twitter (optional)
            </label>
            <p className="help">
              Let us know your Twitter handler to link to your profile.
            </p>
            <div className="control">
              <input
                maxLength="90"
                className="input"
                name="website_info_twitter"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="website_info_url">
              Web page (optional)
            </label>
            <p className="help">
              Let us know your web page, your Linkedin profile, Github user...
              to have a link underneath your profile.
            </p>
            <div className="control">
              <input
                maxLength="90"
                className="input"
                name="website_info_url"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">
                Is there anything else you would like to tell us about yourself?
              </label>
              <div className="control">
                <textarea
                  maxLength="250"
                  className="textarea"
                  name="about"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="coc"
                  value="accept"
                  onChange={this.handleCocChange}
                />
                I've read and understood the{" "}
                <a href="/coc" className="emphasis">
                  Code of Conduct
                </a>{" "}
                for the workshop *
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
          {hasErrors && (
            <h5 className="subtitle is-5 is-failure">
              Sorry, we couldn't submit the registration. Make sure all of the
              required fields are filled and valid.
            </h5>
          )}
          {submitError && (
            <h5 className="subtitle is-5 is-failure">
              Sorry, there was an error while submitting your registration.
              Please, try later or contact us on our{" "}
              <a
                className="is-failure emphasis"
                href="mailto: pylondiniumgirls@gmail.com"
              >
                email
              </a>
              .
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
          <h1 className="title has-text-centered">The registration is open!</h1>
          <h3 className="subtitle is-3 has-text-centered">
            The application will close on 19th May.
          </h3>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <MyForm />
        </div>
      </div>
    </section>
  </div>
);
