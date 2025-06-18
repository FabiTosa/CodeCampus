import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContactPage.css';

const ContactPage = () => {
  return (
    <section className="contact-page">
      <h2>Neem contact met ons op</h2>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Naam:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Bericht:
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit">Verstuur</button>
      </form>
      <Link to="/" className="back-button">Terug naar Dashboard</Link>
    </section>
  );
};

export default ContactPage;
