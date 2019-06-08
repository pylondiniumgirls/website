import React from "react";

import Helmet from "../components/helmet";
import Navbar from "../components/navbar";

import picture_ana from "../images/ana-picture.jpg";
import bloomberg_logo from "../images/bloomberg-logo.png";

export default () => {
  const mentors = [
    {
      name: "Mabel Delgado",
      twitter: "@mabeldelgado",
      picture:
        "https://pbs.twimg.com/profile_images/1022230803642810377/bNjeKYAg_400x400.jpg",
      url: ""
    },
    {
      name: "Karina",
      twitter: "@karina__in",
      picture:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      url: ""
    },
    {
      name: "Ivan",
      twitter: "",
      picture:
        "https://pbs.twimg.com/profile_images/998650798799183872/EUwx-UFR_400x400.jpg",
      url: ""
    },
    {
      name: "Victor Munoz",
      twitter: "",
      picture:
        "https://en.gravatar.com/userimage/23575299/ac9cc68990ceae99e79c6adfd2e66838.jpg?size=native",
      url: ""
    },
    {
      name: "John Sandall",
      twitter: "@john_sandall",
      picture:
        "http://www.artofinference.com/wp-content/uploads/2015/04/john-circle.png",
      url: "https://coefficient.ai"
    },
    {
      name: "Alex Wilmer",
      twitter: "",
      picture:
        "https://pbs.twimg.com/profile_images/707836806/mugshot-2010_square_small_400x400.jpg",
      url: "https://github.com/moreati"
    }
  ];

  const items = [];

  for (const mentor of mentors) {
    let name;
    if (mentor.url) {
      name = (
        <a href={mentor.url} target="_blank" rel="noopener noreferrer">
          {mentor.name}
        </a>
      );
    } else {
      name = <span>{mentor.name}</span>;
    }
    items.push(
      <div className="column is-half">
        <img
          className="centered people"
          src={mentor.picture}
          alt={mentor.name}
        />
        <div className="has-text-centered">{name}</div>
        {mentor.twitter && (
          <div className="has-text-centered">{mentor.twitter}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Helmet />
      <Navbar />
      <section className="container">
        <h1 className="title has-text-centered">People</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="column">
              This workshop is completely organized by volunteers who have
              dedicated their time to make this the best possible experience.
              For that reason, we would like to thank the following people:
            </div>
            <img className="centered people" src={picture_ana} alt="ana" />
            <div className="content has-text-centered">Ana Lopez</div>
          </div>
        </div>
      </section>
      <section className="section">
        <h3 className="title is-3 has-text-centered">Mentors</h3>
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="columns is-multiline">{items}</div>
          </div>
        </div>
      </section>
      <section className="container">
        <h3 className="title is-3 has-text-centered">Sponsors</h3>
        <img
          className="centered logo"
          src={bloomberg_logo}
          alt="bloomberg-logo"
        />
      </section>
      <section className="section">
        <h3 className="title is-3 has-text-centered">Contact us</h3>
        <div className="columns is-centered">
          <div className="column is-half">
            If you have any questions about the workshop, you have any problems
            registering as a participant or a mentor, or you want to talk to us
            about anything in particular, you can contact in our{" "}
            <a className="emphasis" href="mailto: pylondiniumgirls@gmail.com">
              email
            </a>{" "}
            or you can leave us a message in our{" "}
            <a
              className="emphasis"
              href="https://twitter.com/pylondiniumgir1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
