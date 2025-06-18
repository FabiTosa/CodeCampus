// CourseCard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';

const USER_ID = 'u123'; // Replace with actual user ID logic if needed
const API_URL = 'http://localhost:3001';

const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {
  const [seenCourses, setSeenCourses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/users/${USER_ID}/seen`)
      .then((res) => res.json())
      .then((data) => {
        if (data.seenCourses) setSeenCourses(data.seenCourses);
      });
  }, []);

  const markAsSeen = (courseId) => {
    fetch(`${API_URL}/api/users/${USER_ID}/seen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    }).then(() => {
      setSeenCourses((prev) =>
        prev.includes(courseId) ? prev : [...prev, courseId]
      );
    });
  };

  if (!course)
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );

  const openCourseVideo = (url, courseId) => {
    return () => {
      if (url) {
        window.open(url, '_blank');
        markAsSeen(courseId); // Mark course as seen
      } else {
        console.warn('Geen video-URL beschikbaar');
      }
    };
  };

  const isSeen = seenCourses.includes(course.id);

  return (
    <Link to={`/courses/${course.id}`} className='course-card-link'>
      <article className={`course-card ${isSeen ? 'seen' : ''}`}>
        <figure className='course-image'>
          <img
            src={course.imageUrl}
            alt={course.title || 'Cursus afbeelding'}
          />
          <button
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(course.id);
            }}
            title={
              isFavorite
                ? 'Verwijder uit favorieten'
                : 'Voeg toe aan favorieten'
            }
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </figure>
        <div className='course-content'>
          <h3>
            {course.title}{' '}
            {isSeen && <span className='seen-badge'>(Bekeken)</span>}
          </h3>
          <p className='course-description'>{course.description}</p>
          <dl className='course-details'>
            <div>
              <dt className='visually-hidden'>Niveau</dt>
              <dd className='level'>Niveau: {course.level}</dd>
            </div>
            <div>
              <dt className='visually-hidden'>Duur</dt>
              <dd className='duration'>Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className='course-stats'>
            <span className='members'>{course.members} leden</span>
            <span className='views'>{course.views} weergaven</span>
            <span className='rating'>⭐ {course.rating}</span>
          </footer>
          <div className='course-actions'>
            <button
              className='course-button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openCourseVideo(course.videoUrl, course.id)();
              }}
            >
              Bekijk Video
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;
