import React from 'react';
import emailjs from 'emailjs-com';

import './Form.scss';

function Form() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_dz7f6cd', 'template_23tvyob', e.target, 'user_wGMpB8C5I4eMQO2vSS533')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number"/>
      <input type="text" name="user_name" placeholder='Name*'/>
      <input type="email" name="user_email" placeholder='Email*'/>
      <textarea name="message" placeholder='Message*'/>
      <button type="submit" value="Send">Send</button>
    </form>
  );
}

export default Form;