import React, { Component } from 'react'
import './Form.scss'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }
    
    handeChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
      }
    
      onEmailChange = (event) => {
        this.setState({email: event.target.value})
      }
    
      onMessageChange = (event) => {
        this.setState({message: event.target.value})
      }
    
      handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3001/send', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(
          (response) => (response.json())
            ).then((response)=> {
          if (response.status === 'success') {
            alert("Message Sent."); 
            this.resetForm()
          } else if(response.status === 'fail') {
            alert("Message failed to send.")
          }
        })
      }

    render() {
        return(
          <div className="my-form" id='contact'>
            <h1>contact me</h1>
            <form className='contact-form' id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
              <div className="form-group">
                <input type="text" className="input-bars" placeholder='Name' value={this.state.name} onChange={this.onNameChange.bind(this)} />
              </div>
              <div className="form-group">
                <input type="email" className="input-bars" aria-describedby="emailHelp" placeholder='Email' value={this.state.email} onChange={this.onEmailChange.bind(this)} />
              </div>
              <div className="form-group">
                <textarea className="input-bars" rows="5" placeholder='Message' value={this.state.message} onChange={this.onMessageChange.bind(this)} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        );
      }

}


export default Form;