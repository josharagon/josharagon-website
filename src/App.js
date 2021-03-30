import './App.scss';
import me from './img/me.png'
import * as React from 'react';
import { Component } from 'react'
import Card from './Card.js'
import ProjectContainer from './Projects.js'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [ {id: 1, name: 'FitLit Fitness Tracker', description: '', preview: 'https://user-images.githubusercontent.com/72054706/109868661-27e6bf80-7c25-11eb-90a7-eab43cfddc43.png', githubLink: 'https://github.com/josharagon/FitLit-Activity-Tracker', liveLink: ''}
      ],
      isDarkMode: false,
      theme: 'light'
    }
  }


  // const[isDarkMode, setDarkMode] = useState(false);
  // const[theme, setTheme] = useState('light');
   themeToggler = () => {
    this.state.theme === 'light' ? this.setState({theme: 'dark'}) : this.setState({theme: 'light'})
    this.toggleDarkMode(this.state.theme === 'light' ? (true) : (false))
  }
   toggleDarkMode = (checked: boolean) => {
    this.setState({isDarkMode: checked});
  };

  render() {
  return(
    <ThemeProvider theme = { this.state.theme === 'light' ? lightTheme : darkTheme}>
  <>
    <GlobalStyles />
    <nav className='nav-bar'>
      <a href=''>Josh Aragon</a>
      <div className='nav-links'>
        <a href='#aboutMe'>about me</a>
        <a href='#myWork'>my work</a>
        <a href='#contactForm'>contact Me</a>
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
        <a className='work-with-me' href='#contactForm'> Work With Me</a>
      </div>
      <img src={me} className='me-image' height='500px'></img>
    </section>
    <section className='my-work'>
      <h1>my projects</h1>
      <ProjectContainer projects={this.state.projects} />
    </section>
  </>
    </ThemeProvider >
  );
  }
}

export default App;
