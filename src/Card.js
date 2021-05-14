import React from 'react'
import './Card.scss'


const Card = ({name, description, preview, githubLink, liveLink}) => {

        return (
            <article className='project-cards'>
                <h2>{name}</h2>
                <p>{description}</p>
                <img className='preview-image' src={preview} alt={`${name} preview`}></img>
                <div className='card-footer'>
                <a href={githubLink} target="_blank" rel="noreferrer">github link</a>
                {liveLink &&
                <a href={liveLink} target="_blank" rel="noreferrer">view live</a> }
                </div>
            </article>
        )
}



export default Card;