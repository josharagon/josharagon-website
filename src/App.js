import "./App.scss";
import me from "./assets/img/me.png";
import toolsLight from "./assets/img/toolsLight.png";
import toolsDark from "./assets/img/toolsDark.png";
import github from "./assets/img/github.png";
import instagram from "./assets/img/instagram.png";
import linkedin from "./assets/img/linkedin.png";
import twitter from "./assets/img/twitter.png";
import youtube from "./assets/img/youtube.png";
import airagon from "./assets/img/airagon.png";
import fightImg from "./assets/img/fighttm.jpeg";
import carMeetApp from "./assets/img/car-meet-app.png";
import focusRs from "./assets/img/focus-rs-full.png";
import crateCo from "./assets/img/crateco.png";
import setsFindr from "./assets/img/setfindr.png";
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
import SplashScreen from "./SplashScreen/SplashScreen.js";
import CustomScrollBar from "./CustomScrollBar/CustomScrollBar.js";
import MusicPlayer from "./MusicPlayer/MusicPlayer.js";
import Dashboard from "./Dashboard/Dashboard.js";
import Bio from "./Modal/Modal.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          id: 1,
          name: "SetsFindr",
          description: "Uses Youtube API to find and play random House+UKG dj sets.",
          preview: setsFindr,
          githubLink: "https://github.com/josharagon/dj-sets",
          liveLink: "https://dj-sets-jg6yglvjd-josharagons-projects.vercel.app/",
        },
        {
          id: 2,
          name: "Crate.co Track Extractor",
          description:
            "A lightweight Chrome extension that simplifies the process of extracting track links from Crate.co playlists.",
          preview: crateCo,
          liveLink:
            "https://chromewebstore.google.com/detail/spinnin-beans-crateco-tra/obkchoadnpbikoebnbmeijmpffacckpi?hl=en",
        },
        {
          id: 3,
          name: "UndrGround (car-meet-app)",
          description:
            "My largest project yet. Built with Expo, Firebase, and React Native. A car meet app for car enthusiasts. Currently in development.",
          preview:
            "https://user-images.githubusercontent.com/69175998/159408917-9244cc8b-9718-468c-ba38-94b19fad2993.png",
          githubLink: "https://github.com/josharagon/car-meet-app",
          liveLink: "",
        },
        {
          id: 4,
          name: "Pear",
          description:
            "A community driven application where senior devs can offer a helping hand for review requests.",
          preview:
            "https://camo.githubusercontent.com/06e42656a0a64acff5e7e28620f0b73c547ce63944f475f3259ab69adfe8160d/68747470733a2f2f692e6779617a6f2e636f6d2f35363635383466306365343733663636353432613664346634623264613963392e676966",
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
          description:
            "Innovative gaming software. Fight provides world class analytics, clip recording, social media, cloud data, and match systems.",
          preview:
            "https://user-images.githubusercontent.com/69175998/159409180-f10ac60a-e6b3-49a0-a267-41c211e77ec1.jpg",
          githubLink: "",
          liveLink: "https://fighttm.com/",
        },
      ],
      isDarkMode: true,
      theme: "dark",
      isDashboardActive: false,
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

  toggleDashboardActive = () => {
    this.setState((prevState) => {
      // Toggle the class based on the prevState of isDashboardActive
      if (!prevState.isDashboardActive) {
        document.body.classList.add("dashboard-active");
      } else {
        document.body.classList.remove("dashboard-active");
      }

      // Return the toggled state
      return { isDashboardActive: !prevState.isDashboardActive };
    });
  };

  render() {
    return (
      <>
        {this.state.isDashboardActive ? (
          <Dashboard onExitClick={this.toggleDashboardActive} />
        ) : (
          <ThemeProvider
            theme={this.state.theme === "light" ? lightTheme : darkTheme}
          >
            <GlobalStyles />
            {/* <SplashScreen /> */}
            <nav className="nav-bar">
              <div className="name-music-container">
                <p>Josh Aragon</p>
                {/* <MusicPlayer isDarkMode={this.state.isDarkMode} /> */}
              </div>
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
              <div className="me-image-container">
                <img
                  src={focusRs}
                  className="me-image"
                  height="500px"
                  alt="me"
                  onClick={this.toggleDashboardActive}
                />
                <div className="hover-text">Let's Race</div>
              </div>
            </section>
            <section className="my-work" id="projects">
              <h1>my projects</h1>
              <ProjectContainer
                projects={this.state.projects}
                theme={this.state.theme}
              />
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
                    Support Software engineer at SeachSpring. Strong passion for
                    learning. I found coding my freshman year of highschool and
                    fell in love. Outside of coding my main passion is
                    automobiles and DJing. I love going to the car meets on the
                    weekend. I also love to DJ to relax, it is a constant search
                    for new music and a way to express myself.
                  </p>
                  <Bio theme={this.state.theme} />
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
                      href="https://www.linkedin.com/in/joshuajaragon/"
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
                      href="https://www.instagram.com/purecarmedia"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={instagram}
                        className="social-logo"
                        alt="my instagram"
                      ></img>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <Form />
            <CustomScrollBar />
          </ThemeProvider>
        )}
      </>
    );
  }
}

export default App;
