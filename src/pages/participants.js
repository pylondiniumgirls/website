import React from "react";
import axios from "axios";
import { FaTwitter } from "react-icons/fa";
import { navigate } from "gatsby";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

class Request {
  namesRegex = /^[a-zA-Z\s]+$/;
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(form) {
    this.formData = {
      type: "attendee",
      first_name: "",
      last_name: "",
      email: "",
      legal_age: "true",
      legal_guardian_first_name: "",
      legal_guardian_last_name: "",
      legal_guardian_email: "",
      os: [],
      experience: [],
      experience_notes: "",
      working_status: "",
      company_name: "",
      motivations: "",
      financial_help: "false",
      financial_help_notes: "",
      financial_help_amount: "",
      occupation: "",
      dietary: "",
      coc: false,
      ...form
    };

    this.errors = {
      firstName: false,
      lastName: false,
      email: false,
      legalGuardianFirstName: false,
      legalGuardianLastName: false,
      legalGuardianEmail: false,
      os: false,
      experience: false,
      experienceNotes: false,
      workingStatus: false,
      companyName: false,
      motivations: false,
      financialHelpNotes: false,
      coc: false
    };
  }

  get data() {
    return { ...this.formData };
  }

  isValid() {
    this.errors.firstName = !this.namesRegex.test(this.formData.first_name);
    this.errors.lastName = !this.namesRegex.test(this.formData.last_name);
    this.errors.email = !this.emailRegex.test(this.formData.email);

    if (this.formData.legal_age !== "true") {
      this.errors.legalGuardianFirstName = !this.namesRegex.test(
        this.formData.legal_guardian_first_name
      );
      this.errors.legalGuardianLastName = !this.namesRegex.test(
        this.formData.legal_guardian_last_name
      );
      this.errors.legalGuardianEmail = !this.emailRegex.test(
        this.formData.legal_guardian_email
      );
    }

    // It is compulsory to select an os
    this.errors.os = this.formData.os.length === 0;

    // It is compulsory to select a level of experience
    this.errors.experience = this.formData.experience.length === 0;

    // If the experience is not beginner, it is compulsory to say something
    // about this experience
    if (
      this.formData.experience.filter(elem => elem !== "beginner").length !== 0
    ) {
      this.errors.experienceNotes = this.formData.experience_notes === "";
    } else {
      this.errors.experienceNotes = false;
    }

    // Check that they have selected only one checkbox in the occupation
    // field
    if (this.formData.working_status === "") {
      this.errors.workingStatus = true;
    } else {
      // If they have selected "Other", make sure that they are provided
      // the name of the company.
      if (this.formData.working_status === "other") {
        this.errors.companyName = this.formData.company_name === "";
      }
      this.errors.workingStatus = false;
    }

    // It is required to explain the motivations for the workshop
    this.errors.motivations = this.formData.motivations === "";

    // If they are asking for financial aid, it is required to explain the reason
    if (this.formData.financial_help === "true") {
      this.errors.financialHelpNotes =
        this.formData.financial_help_notes === "";
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
  constructor(props) {
    super(props);
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
      } catch(error) {
        this.setState({ submitError: true });
      }
    } else {
      this.setState({ errors: request.errors });
    }
  };

  render() {
    const errors = this.state.errors;
    const formData = this.state.form;
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
                  Invalid first name: the first name can only have letters
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
                  Invalid last name: the last name can only have letters
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
              <label className="label" htmlFor="legal_age">
                Are you under 18? *
              </label>
              <p className="help">
                If you are under 18, you will need to bring a legal guardian
              </p>
              <label className="radio">
                <input
                  type="radio"
                  name="legal_age"
                  value="false"
                  onChange={this.handleChange}
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="legal_age"
                  value="true"
                  onChange={this.handleChange}
                  defaultChecked
                />{" "}
                No
              </label>
            </div>
          </div>
          {formData.legal_age &&
            formData.legal_age === "false" && (
              <div className="field">
                <div className="control">
                  <label className="label" htmlFor="legal_guardian">
                    If you answered 'Yes' to the previous question, please
                    provide the details for your legal guardian
                  </label>
                  <div className="control">
                    <input
                      maxLength="50"
                      className={
                        errors.legalGuardianFirstName
                          ? "input is-danger"
                          : "input"
                      }
                      name="legal_guardian_first_name"
                      type="text"
                      placeholder="First name"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.legalGuardianFirstName && (
                    <p className="help is-danger">
                      Invalid first name: the first name can only have letters
                    </p>
                  )}
                  <div className="control">
                    <input
                      maxLength="50"
                      className={
                        errors.legalGuardianLastName
                          ? "input is-danger"
                          : "input"
                      }
                      name="legal_guardian_last_name"
                      type="text"
                      placeholder="Last name"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.legalGuardianLastName && (
                    <p className="help is-danger">
                      Invalid last name: the last name can only have letters
                    </p>
                  )}
                  <div className="control">
                    <input
                      maxLength="50"
                      className={
                        errors.legalGuardianEmail ? "input is-danger" : "input"
                      }
                      name="legal_guardian_email"
                      type="text"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.legalGuardianEmail && (
                    <p className="help is-danger">Invalid email</p>
                  )}
                </div>
              </div>
            )}
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="os">
                Which operating system do you use? *
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
              <label className="label" htmlFor="experience">
                What is your current level of experience with programming? *
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="beginner"
                  onChange={this.handleListChange}
                />{" "}
                I'm a total beginner, I don't know anything about it
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="html_css"
                  onChange={this.handleListChange}
                />{" "}
                I've tried some HTML or CSS before
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="javascript"
                  onChange={this.handleListChange}
                />{" "}
                I've tried some Javascript before
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="python"
                  onChange={this.handleListChange}
                />{" "}
                I've done a few lessons of Python
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="website"
                  onChange={this.handleListChange}
                />{" "}
                I've built a website before
              </label>
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="experience"
                  value="professional"
                  onChange={this.handleListChange}
                />{" "}
                I work as a programmer
              </label>
              {errors.experience && (
                <p className="help is-danger">
                  Please select at least one checkbox about your level of
                  experience
                </p>
              )}
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
                  maxLength="250"
                  className={
                    errors.experienceNotes ? "textarea is-danger" : "textarea"
                  }
                  name="experience_notes"
                  placeholder=""
                  onChange={this.handleChange}
                />
                {errors.experienceNotes && (
                  <p className="help is-danger">
                    As you selected an experience different than beginner, this
                    field is required
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="working_status">
                What is your current working status? *
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="working_status"
                  value="unemployed"
                  onChange={this.handleChange}
                />{" "}
                I am unemployed
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="working_status"
                  value="student"
                  onChange={this.handleChange}
                />{" "}
                I am a student
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="working_status"
                  value="student"
                  onChange={this.handleChange}
                />{" "}
                I am retired
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="working_status"
                  value="other"
                  onChange={this.handleChange}
                />{" "}
                Other
              </label>
              {formData.working_status &&
                formData.working_status === "other" && (
                  <div className="control">
                    <input
                      maxLength="50"
                      className={
                        errors.companyName ? "input is-danger" : "input"
                      }
                      name="company_name"
                      type="text"
                      placeholder="Name of the company you work for"
                      onChange={this.handleChange}
                    />
                  </div>
                )}
              {errors.workingStatus && (
                <p className="help is-danger">
                  Please select the option that best applies to your current
                  working status.
                </p>
              )}
              {errors.companyName && (
                <p className="help is-danger">
                  Please, tell us what is the name of the company you work for.
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="occupation">
                Please, tell us a bit more about your studies or occupation.
              </label>
              <div className="control">
                <textarea
                  maxLength="250"
                  className="textarea"
                  name="occupation"
                  placeholder=""
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="motivations">
                Why are you interested in attending the workshop? Tell us a bit
                about your motivations and aspirations. *
              </label>
              <div className="control">
                <textarea
                  maxLength="250"
                  className={
                    errors.motivations ? "textarea is-danger" : "textarea"
                  }
                  name="motivations"
                  placeholder=""
                  onChange={this.handleChange}
                />
                {errors.motivations && (
                  <p className="help is-danger">This field is required</p>
                )}
              </div>
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
              <label className="label" htmlFor="financial_help">
                Do you need any financial help to attend the workshop? *
              </label>
              <p className="help">
                Unfortunately, our resources are limited and we cannot promise
                that we will be able to provide financial help to attend the
                workshop. However, we will try our best. If you are selected to
                receive financial help, we will inform you about it in your
                workshop acceptance email.
              </p>
              <label className="radio">
                <input
                  type="radio"
                  name="financial_help"
                  value="true"
                  onChange={this.handleChange}
                />{" "}
                Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="financial_help"
                  value="false"
                  onChange={this.handleChange}
                  defaultChecked
                />{" "}
                No
              </label>
            </div>
          </div>
          {formData.financial_help &&
            formData.financial_help === "true" && (
              <div className="field">
                <div className="control">
                  <label className="label" htmlFor="financial_help_notes">
                    Please, explain why you need the financial help
                  </label>
                  <div className="control">
                    <textarea
                      maxLength="250"
                      className={
                        errors.financialHelpNotes
                          ? "textarea is-danger"
                          : "textarea"
                      }
                      name="financial_help_notes"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </div>
                  {errors.financialHelpNotes && (
                    <p className="help is-danger">
                      This field is required if you said you needed financial
                      aid
                    </p>
                  )}
                </div>
              </div>
            )}
          {formData.financial_help &&
            formData.financial_help === "true" && (
              <div className="field">
                <label className="label" htmlFor="financial_help_amount">
                  How much money would you need?
                </label>
                <div className="control">
                  <input
                    maxLength="70"
                    className="input"
                    name="financial_help_amount"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            )}
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
              <a href="mailto: pylondiniumgirls@gmail.com">email</a>.
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
      <h1 className="title has-text-centered">Participant registration</h1>
    </section>
    <section className="hero is-primary is-bold is-medium is-hidden-touch is-hidden-tablet">
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
    <section className="hero is-primary is-bold is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">The registration is open!</h1>
          <h3 className="subtitle is-3 has-text-centered">
            The application process will close on 19 May.
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
