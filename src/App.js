import './App.scss';
import me from './img/me.png'
import * as React from 'react';
import Card from './Card.js'
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js"

const App = (props) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
    toggleDarkMode(theme === 'light' ? (true) : (false))
  }
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
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
              checked={isDarkMode}
              size={30}
              onClick={themeToggler}
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
          <div className='my-project-container'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          </div>
        </section>
      </>
    </ThemeProvider>
  );

}

export default App;
