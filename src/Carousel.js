import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image from "./img/airagon.png";
import image2 from "./img/instagram.png";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import carMeet from "./img/car-meet-app.png";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src={image} />
          <p className="legend">Clean UI</p>
        </div>
        <div>
          <img src={carMeet} />
          <p className="legend">From Imagination to Real Life</p>
        </div>
      </Carousel>
    );
  }
}

export default DemoCarousel;
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
