import './App.scss';
import lightTheme from './img/lightTheme.svg'
import darkTheme from './img/darkTheme.svg'

function App() {
  return (
<>
<nav className='nav-bar'>
  <a>Josh Aragon</a>
  <div className='nav-links'>
    <a href='#aboutMe'>About me</a>
    <a href='#myWork'>My Work</a>
    <a href='#contactForm'>Contact Me</a>
    <button type='button'><img src={darkTheme} className='theme-logo'></img></button>
  </div>
</nav>
</>
  );
}

export default App;
