import './App.scss';
import me from './img/me.png'
import toolsLight from './img/toolsLight.png'
import toolsDark from './img/toolsDark.png'
import github from './img/github.png'
import instagram from './img/instagram.png'
import linkedin from './img/linkedin.png'
import twitter from './img/twitter.png'
import youtube from './img/youtube.png'
import * as React from 'react';
import { Component } from 'react'
import Form from './Form.js'
import ProjectContainer from './Projects.js'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js"
import { Link, animateScroll as scroll } from 'react-scroll';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [{ id: 1, name: 'FitLit Fitness Tracker', description: '', preview: 'https://user-images.githubusercontent.com/72054706/109868661-27e6bf80-7c25-11eb-90a7-eab43cfddc43.png', githubLink: 'https://github.com/josharagon/FitLit-Activity-Tracker', liveLink: '' },
      { id: 2, name: 'What\'s Cookin\' Recipe Site', description: '', preview: 'https://github.com/josharagon/whats-cookin-starter-kit/raw/main/src/images/homeScreen.png', githubLink: 'https://github.com/josharagon/whats-cookin-starter-kit', liveLink: '' },
      { id: 3, name: 'Intention Timer', description: '', preview: 'https://gyazo.com/4288834067944e522ba4c0535f9d24b1.png', githubLink: 'https://github.com/josharagon/intention-timer', liveLink: 'https://aemiers.github.io/intention-timer/' },
      { id: 4, name: 'Tic Tac Toe', description: '', preview: '', githubLink: 'https://github.com/josharagon/Tic-Tac-Toe', liveLink: 'https://josharagon.github.io/Tic-Tac-Toe/' },
      { id: 5, name: 'Self Care Center', description: '', preview: 'https://user-images.githubusercontent.com/49926352/96159974-93c4c780-0ed2-11eb-9009-68501c2b5bd7.png', githubLink: ' https://github.com/josharagon/self-care-center/', liveLink: ' https://josharagon.github.io/self-care-center/' },
      { id: 6, name: 'Slap Jack', description: '', preview: 'https://gyazo.com/8d888576b91fe60b66f2011aa724db6f.png', githubLink: 'https://github.com/josharagon/SlapJack', liveLink: 'https://josharagon.github.io/SlapJack/' }
      ],
      isDarkMode: false,
      theme: 'light',
    }
  }

  themeToggler = () => {
    this.state.theme === 'light' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' })
    this.toggleDarkMode(this.state.theme === 'light' ? (true) : (false))
  }
  toggleDarkMode = (checked: boolean) => {
    this.setState({ isDarkMode: checked });
  };

  renderToolImg = () => {
    if (this.state.theme === 'light') {
      return (
        <img src={toolsLight} className='my-toolbox'></img>
      )
    } else {
      return (
        <img src={toolsDark} className='my-toolbox'></img>
      )
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <nav className='nav-bar'>
            <a>Josh Aragon</a>
            <div className='nav-links'>
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
              >
                <a>about me</a>
              </Link>
              <Link
                activeClass="active"
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <a>my work</a>
              </Link>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <a>contact me</a>
              </Link>
              <DarkModeSwitch
                style={{ marginBottom: '.35rem' }}
                checked={this.state.isDarkMode}
                size={30}
                onClick={this.themeToggler}
              />
            </div>
          </nav>
          <section className='hello-container'>
            <div className='hello-me'>
              <h1>hello!</h1>
              <h2>I'm Josh, a software developer in Brighton, CO</h2>
              <a className='work-with-me'> Work With Me</a>
            </div>
            <img src={me} className='me-image' height='500px'></img>
          </section>
          <section className='my-work' id='projects'>
            <h1>my projects</h1>
            <ProjectContainer projects={this.state.projects} />
          </section>
          <section className='about-me' id="about">
            <div className='tools-about'>
              {this.renderToolImg()}
              <div className='more-about'>
                <h1 className='summary-head'>more about me</h1>
                <p className='my-summary'> 19 year old software developer currently attending Turing School of Software & Design. Strong passion for learning. Currently learning React.
                I found coding my freshman year of highschool
                and fell in love. Outside of coding my main passion is automobiles.
                I love going to the meets on the weekend with my brother and some friends.
                </p>
                <div className='social-links'>
                  <a href='https://www.github.com/josharagon' target="_blank"><img src={github} className='social-logo' alt='my github'></img></a>
                  <a href='https://www.linkedin.com/in/joshua-aragon-854275206/' target="_blank"><img src={linkedin} className='social-logo' alt='my linkedin'></img></a>
                  <a href='https://www.twitter.com/aragondev' target="_blank"><img src={twitter} className='social-logo' alt='my twitter'></img></a>
                  <a href='https://www.instagram.com/joshjaragon' target="_blank"><img src={instagram} className='social-logo' alt='my instagram'></img></a>
                  <a href='https://www.youtube.com/channel/UCmZMN0KRFaMr86GeBEoNZIA' target="_blank"><img src={youtube} className='social-logo' alt='my youtube channel'></img></a>
                </div>
              </div>
            </div>
          </section>
          < Form />
        </>
      </ThemeProvider >
    );
  }
}

export default App;
