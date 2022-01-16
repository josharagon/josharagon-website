import "./App.scss";
import me from "./img/me.png";
import toolsLight from "./img/toolsLight.png";
import toolsDark from "./img/toolsDark.png";
import github from "./img/github.png";
import instagram from "./img/instagram.png";
import linkedin from "./img/linkedin.png";
import twitter from "./img/twitter.png";
import youtube from "./img/youtube.png";
import airagon from "./img/airagon.png";
import fightImg from "./img/fighttm.jpeg";
import * as React from "react";
import { Component } from "react";
import Form from "./Form.js";
import ProjectContainer from "./Projects.js";
import Carousel from "./Carousel.js";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js";
import { Link } from "react-scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          id: 1,
          name: "FitLit Fitness Tracker",
          description: "A brownfield project",
          preview:
            "https://user-images.githubusercontent.com/72054706/109868661-27e6bf80-7c25-11eb-90a7-eab43cfddc43.png",
          githubLink: "https://github.com/josharagon/FitLit-Activity-Tracker",
          liveLink: "",
        },
        {
          id: 2,
          name: "What's Cookin' Recipe Site",
          description:
            "What's Cookin' is a recipe website created with a focus on Test Driven Design, multi-class integration, wireframing, and responsive layout",
          preview:
            "https://github.com/josharagon/whats-cookin-starter-kit/raw/main/src/images/homeScreen.png",
          githubLink: "https://github.com/josharagon/whats-cookin-starter-kit",
          liveLink:
            "https://connorandersonlarson.github.io/whats-cookin-starter-kit/src/index.html",
        },
        {
          id: 3,
          name: "Intention Timer",
          description:
            "Intention-timer is a program that allows a user to time and keep track of productive tasks.",
          preview: "https://gyazo.com/4288834067944e522ba4c0535f9d24b1.png",
          githubLink: "https://github.com/josharagon/intention-timer",
          liveLink: "https://aemiers.github.io/intention-timer/",
        },
        {
          id: 4,
          name: "Pear",
          description:
            "A community driven application where senior devs can offer a helping hand for review requests.",
          preview:
            "https://camo.githubusercontent.com/95a738dc2f4dd094ec98c18bc08176d8cfe8337437e054d3edc3bf677521874f/68747470733a2f2f6779617a6f2e636f6d2f30313864313961636630633638356537663564376133623030306335353562642e706e67",
          githubLink: "https://github.com/josharagon/stretch-project",
          liveLink: "",
        },
        {
          id: 5,
          name: "Airagon",
          description: "A Sneaker Automation Application",
          preview: airagon,
          githubLink: "",
          liveLink: "",
        },
        {
          id: 6,
          name: "Fight™",
          description: "",
          preview: fightImg,
          githubLink: "",
          liveLink: "https://fighttm.com/",
        },
      ],
      isDarkMode: false,
      theme: "light",
    };
  }

  themeToggler = () => {
    this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
    this.toggleDarkMode(this.state.theme === "light" ? true : false);
  };
  toggleDarkMode = (checked) => {
    this.setState({ isDarkMode: checked });
  };

  renderToolImg = () => {
    if (this.state.theme === "light") {
      return (
        <img src={toolsLight} className="my-toolbox" alt="toolbox light"></img>
      );
    } else {
      return (
        <img src={toolsDark} className="my-toolbox" alt="toolbox dark"></img>
      );
    }
  };

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <>
          <GlobalStyles />
          <nav className="nav-bar">
            <p>Josh Aragon</p>
            <div className="nav-links">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <p>about me</p>
              </Link>
              <Link
                activeClass="active"
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <p>my work</p>
              </Link>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <p>contact me</p>
              </Link>
              <DarkModeSwitch
                style={{ marginBottom: ".35rem" }}
                checked={this.state.isDarkMode}
                size={30}
                onClick={this.themeToggler}
              />
            </div>
          </nav>
          <section className="hello-container">
            <div className="hello-me">
              <h1>hello!</h1>
              <h2>I'm Josh, a software developer in Brighton, CO</h2>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <p className="work-with-me"> Work With Me</p>
              </Link>
            </div>
            <img src={me} className="me-image" height="500px" alt="me"></img>
          </section>
          <section className="my-work" id="projects">
            <h1>my projects</h1>
            <ProjectContainer projects={this.state.projects} />
          </section>
          <section className="my-work" id="projects">
            <h1>my design gallery</h1>
            <div className="carousel-holder">
              <Carousel />
            </div>
          </section>
          <section className="about-me" id="about">
            <div className="tools-about">
              {this.renderToolImg()}
              <div className="more-about">
                <h1 className="summary-head">more about me</h1>
                <p className="my-summary">
                  19 year old software developer who attended and graduated
                  Turing School of Software & Design. Strong passion for
                  learning. Currently learning Next.js and AWS. I found coding
                  my freshman year of highschool and fell in love. Outside of
                  coding my main passion is automobiles. I love going to the
                  meets on the weekend with my brother and some friends.
                </p>
                <div className="social-links">
                  <a
                    href="https://www.github.com/josharagon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={github}
                      className="social-logo"
                      alt="my github"
                    ></img>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/joshua-aragon-854275206/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={linkedin}
                      className="social-logo"
                      alt="my linkedin"
                    ></img>
                  </a>
                  <a
                    href="https://www.twitter.com/aragondev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={twitter}
                      className="social-logo"
                      alt="my twitter"
                    ></img>
                  </a>
                  <a
                    href="https://www.instagram.com/joshjaragon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={instagram}
                      className="social-logo"
                      alt="my instagram"
                    ></img>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCmZMN0KRFaMr86GeBEoNZIA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={youtube}
                      className="social-logo"
                      alt="my youtube channel"
                    ></img>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <Form />
        </>
      </ThemeProvider>
    );
  }
}

export default App;
