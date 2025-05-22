import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/coursesData.js'; 
import '../styles/CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!course) {
    return (
      <section className='course-detail'>
        <h2>Cursus niet gevonden</h2>
        <Link to="/" className="back-link">Terug naar overzicht</Link>
      </section>
    );
  }

  return (
    <section className={`course-detail ${loaded ? 'fade-in' : ''}`}>
      <h2 className='course-title'>{course.title}</h2>
      <img
        src={course.imageUrl}
        alt={course.title}
        className='course-image'
      />
      <p className='course-description'>{course.detailedDescription || course.description}</p>

      <dl className='course-meta'>
        <div>
          <dt>Niveau</dt>
          <dd>{course.level}</dd>
        </div>
        <div>
          <dt>Duur</dt>
          <dd>{course.duration}</dd>
        </div>

        <div>
          <dt>Leden</dt>
          <dd>{course.members}</dd>
        </div>
        <div>
          <dt>Weergaven</dt>
          <dd>{course.views}</dd>
        </div>
        <div>
          <dt>Beoordeling</dt>
          <dd>⭐ {course.rating}</dd>
        </div>
        <div>
          <dt>Taal</dt>
          <dd>{course.language}</dd>
        </div>
        <div>
          <dt>Releasedatum</dt>
          <dd>{course.releaseDate}</dd>
        </div>
        <div>
          <dt>Certificaat</dt>
          <dd>{course.certification ? 'Ja' : 'Nee'}</dd>
        </div>
      </dl>

      <section className='course-extra'>
        <h3>Syllabus</h3>
        <ul>
          {course.syllabus.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3>Vereisten</h3>
        <ul>
          {course.requirements.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3>Doelgroep</h3>
        <p>{course.targetAudience}</p>
      </section>

      <a
        href={course.videoUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='video-link'
      >
        Bekijk Video
      </a>
      <br />
      <Link to='/' className='back-link'>
        Terug naar overzicht
      </Link>
    </section>
  );
};

export default CourseDetail;
