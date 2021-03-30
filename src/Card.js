import { render } from '@testing-library/react';
import React, { Component } from 'react'
import './Card.scss'


const Card = ({name, description, preview, githubLink, liveLink}) => {

        return (
            <article className='project-cards'>
                <h2>{name}</h2>
                <p>{description}</p>
                <img className='preview-image' src={preview}></img>
                <div className='card-footer'>
                <a href={githubLink} target="_blank">github link</a>
                <a href={liveLink}>view live</a>
                </div>
            </article>
        )
}



export default Card;