import './App.scss';
import * as React from 'react';
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js"

const App = (props) => {
  console.log(props)
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
            <a href='#aboutMe'>About me</a>
            <a href='#myWork'>My Work</a>
            <a href='#contactForm'>Contact Me</a>
            <DarkModeSwitch
              style={{ marginBottom: '.35rem' }}
              checked={isDarkMode}
              size={30}
              onClick={themeToggler}
            />
          </div>
        </nav>
        <section className='hello-container'>

        </section>
      </>
    </ThemeProvider>
  );

}

export default App;
