import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HelpPage.css';

const HelpPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <section className='help-page'>
      <button
        onClick={goBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '10px 15px',
          backgroundColor: '#f1f3f5',
          color: '#333',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background-color 0.3s ease, color 0.3s ease',
          fontWeight: '600',
          fontSize: '16px',
        }}
      >
        Terug
      </button>

     

      <div className='help-content'>
        <article className='help-section'>
          <h3>🔍 Cursussen zoeken</h3>
          <p>Gebruik de zoekbalk bovenaan om snel een cursus te vinden op titel of beschrijving.</p>
        </article>

        <article className='help-section'>
          <h3>📂 Filters gebruiken</h3>
          <p>Kies een tabblad zoals <strong>Beginner</strong>, <strong>Populair</strong>, of je favoriete categorie om het cursusaanbod te filteren.</p>
        </article>

        <article className='help-section'>
          <h3>❤️ Favorieten beheren</h3>
          <p>Klik op het hartje bij een cursus om deze toe te voegen aan je favorieten. Je vindt ze terug onder het tabblad <strong>Favorieten</strong>.</p>
        </article>

        <article className='help-section'>
          <h3>🌙 Donkere modus</h3>
          <p>Klik rechtsboven op de knop <strong>Dark Mode</strong> om te wisselen tussen licht en donker thema.</p>
        </article>

        <article className='help-section'>
          <h3>🎥 Video's bekijken</h3>
          <p>Klik op <strong>Bekijk Video</strong> om de cursus in een nieuw tabblad te openen. De cursus wordt dan gemarkeerd als bekeken.</p>
        </article>
      </div>
    </section>
  );
};

export default HelpPage;
