import { render } from '@testing-library/react';
import React, { Component } from 'react'
import './Card.scss'


class Card extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            preview: '',
        }
    }




    render() {
        return (
            <article className='project-cards'>
                <h2>name</h2>
                <p>description</p>
                <img className='preview-image' src={'https://user-images.githubusercontent.com/72054706/109868661-27e6bf80-7c25-11eb-90a7-eab43cfddc43.png'}></img>
                <div className='card-footer'>
                <a>github link</a>
                <a>view live</a>
                </div>
            </article>
        )
    }
}



export default Card;