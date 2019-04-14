import React from "react";
import { FaTwitter } from "react-icons/fa";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

class Request {
  namesRegex = /^[a-zA-Z\s]+$/;
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(form) {
    this.formData = new FormData(form);

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
    const legalAge = this.formData.get("legal_age") === "true";

    return {
      type: "attendee",
      firstName: this.formData.get("first_name"),
      lastName: this.formData.get("last_name"),
      email: this.formData.get("email"),
      legalAge: legalAge,
      legalGuardianFirstName: legalAge
        ? ""
        : this.formData.get("legal_guardian_first_name"),
      legalGuardianLastName: legalAge
        ? ""
        : this.formData.get("legal_guardian_last_name"),
      legalGuardianEmail: legalAge ? "" : this.formData.get("legal_guardian_email"),
      os: this.formData.getAll("os"),
      experience: this.formData.getAll("experience"),
      experienceNotes: this.formData.get("experience_notes"),
      workingStatus: this.formData.getAll("working_status")[0],
      companyName: this.formData.get("company_name"),
      occupation: this.formData.get("occupation"),
      motivations: this.formData.get("motivations"),
      dietary: this.formData.get("dietary") || "None",
      financialHelp: this.formData.get("financial_help") === "true",
      financialHelpNotes: this.formData.get("financial_help_notes"),
      financialHelpAmount: this.formData.get("financial_help_amount")
    };
  }

  isValid() {
    this.errors.firstName = !this.namesRegex.test(this.formData.get("first_name"));
    this.errors.lastName = !this.namesRegex.test(this.formData.get("last_name"));
    this.errors.email = !this.emailRegex.test(this.formData.get("email"));

    const legalAge = this.formData.get("legal_age") === "true";
    if (!legalAge) {
      this.errors.legalGuardianFirstName = !this.namesRegex.test(
        this.formData.get("legal_guardian_first_name")
      );
      this.errors.legalGuardianLastName = !this.namesRegex.test(
        this.formData.get("legal_guardian_last_name")
      );
      this.errors.legalGuardianEmail = !this.emailRegex.test(
        this.formData.get("legal_guardian_email")
      );
    }

    // It is compulsory to select an os
    this.errors.os = this.formData.getAll("os").length === 0;

    // It is compulsory to select a level of experience
    const experience = this.formData.getAll("experience");
    this.errors.experience = experience.length === 0;

    // If the experience is not beginner, it is compulsory to say something
    // about this experience
    if (experience.filter(elem => elem !== "beginner").length !== 0) {
      this.errors.experienceNotes = this.formData.get("experience_notes") === "";
    } else {
      this.errors.experienceNotes = false;
    }

    // Check that they have selected only one checkbox in the occupation
    // field
    const workingStatus = this.formData.getAll("working_status");
    if (workingStatus.length !== 1) {
      this.errors.workingStatus = true;
    } else {
      // If they have selected "Other", make sure that they are provided
      // the name of the company.
      const companyName = this.formData.get("company_name");
      if (workingStatus[0] === "other" && companyName === "") {
        this.errors.companyName = true;
      } else {
        this.errors.companyName = false;
      }
      this.errors.workingStatus = false;
    }

    // It is required to explain the motivations for the workshop
    this.errors.motivations = this.formData.get("motivations") === "";

    // It is required to read and accept the coc
    this.errors.coc = this.formData.get("coc") !== "accept";

    // If they are asking for financial aid, it is required to explain the reason
    if (this.formData.get("financial_help") === "true") {
      this.errors.financialHelpNotes =
        this.formData.get("financial_help_notes") === "";
    }

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
      errors: {},
      submitted: false
    };
  }

  handleSubmit = event => {
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
  };

  render() {
    const errors = this.state.errors;
    const success = this.state.submitted;
    const hasErrors = Object.keys(errors).some(key => errors[key]);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="first_name">
              First Name
            </label>
            <div className="control">
              <input
                className={errors.firstName ? "input is-danger" : "input"}
                name="first_name"
                type="text"
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
              Last Name
            </label>
            <div className="control">
              <input
                className={errors.lastName ? "input is-danger" : "input"}
                name="last_name"
                type="text"
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
                <input type="radio" name="legal_age" value="false" /> Yes
              </label>
              <br />
              <label className="radio">
                <input type="radio" name="legal_age" value="true" defaultChecked /> No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="legal_guardian">
                If you answered 'Yes' to the previous question, please provide
                the details for your legal guardian
              </label>
              <div className="control">
                <input
                  className={
                    errors.legalGuardianFirstName ? "input is-danger" : "input"
                  }
                  name="legal_guardian_first_name"
                  type="text"
                  placeholder="First name"
                />
              </div>
              {errors.legalGuardianFirstName && (
                <p className="help is-danger">
                  Invalid first name: the first name can only have letters
                </p>
              )}
              <div className="control">
                <input
                  className={
                    errors.legalGuardianLastName ? "input is-danger" : "input"
                  }
                  name="legal_guardian_last_name"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              {errors.legalGuardianLastName && (
                <p className="help is-danger">
                  Invalid last name: the last name can only have letters
                </p>
              )}
              <div className="control">
                <input
                  className={
                    errors.legalGuardianEmail ? "input is-danger" : "input"
                  }
                  name="legal_guardian_email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              {errors.legalGuardianEmail && (
                <p className="help is-danger">Invalid email</p>
              )}
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
              {errors.os && (
                <p className="help is-danger">
                  Please select at least one operative system
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="experience">
                What is your current level of experience with programming?
              </label>
              <label className="checkbox">
                <input type="checkbox" name="experience" value="beginner" /> I'm
                a total beginner, I don't know anything about it
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="experience" value="html_css" />{" "}
                I've tried some HTML or CSS before
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
                <input type="checkbox" name="experience" value="professional" />{" "}
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
                  className={
                    errors.experienceNotes ? "textarea is-danger" : "textarea"
                  }
                  name="experience_notes"
                  placeholder=""
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
                What is your current working status?
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="working_status"
                  value="unemployed"
                />{" "}
                I am unemployed
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="working_status" value="student" />{" "}
                I am a student
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="working_status" value="student" />{" "}
                I am retired
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" name="working_status" value="other" />{" "}
                Other
              </label>
              <div className="control">
                <input
                  className={errors.companyName ? "input is-danger" : "input"}
                  name="company_name"
                  type="text"
                  placeholder="Name of the company you work for"
                />
              </div>
              {errors.workingStatus && (
                <p className="help is-danger">
                  Please select the checkbox that best applies to your current
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
                  className={
                    errors.motivations ? "textarea is-danger" : "textarea"
                  }
                  name="motivations"
                  placeholder=""
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
                <textarea className="textarea" name="dietary" placeholder="" />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="financial_help">
                Do you need any financial help to attend the workshop?
              </label>
              <p className="help">
                Unfortunately, our resources are limited and we cannot promise
                that we will be able to provide financial help to attend the
                workshop. However, we will try our best. If you are selected to
                receive financial help, we will inform you about it in your
                workshop acceptance email.
              </p>
              <label className="radio">
                <input type="radio" name="financial_help" value="true" /> Yes
              </label>
              <br />
              <label className="radio">
                <input
                  type="radio"
                  name="financial_help"
                  value="false"
                  defaultChecked
                />{" "}
                No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="financial_help_notes">
                Please, explain why you need the financial help
              </label>
              <div className="control">
                <textarea
                  className={
                    errors.financialHelpNotes
                      ? "textarea is-danger"
                      : "textarea"
                  }
                  name="financial_help_notes"
                  placeholder=""
                />
              </div>
              {errors.financialHelpNotes && (
                <p className="help is-danger">
                  This field is required if you said you needed financial aid
                </p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="financial_help_amount">
              How much money would you need?
            </label>
            <div className="control">
              <input
                className="input"
                name="financial_help_amount"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="coc" value="accept" />
                I've read and understood the Code of Conduct for the workshop
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
          <h3 className="subtitle is-3 has-text-centered">
            The application process will close on 19 May.
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
