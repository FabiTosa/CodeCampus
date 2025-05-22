import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
  if (!course)
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );

  const openCourseVideo = (url) => {
    return () => {
      if (url) {
        window.open(url, '_blank'); 
      } else {
        console.warn('Geen video-URL beschikbaar');
      }
    };
  };

  return (
    <Link to={`/courses/${course.id}`} className='course-card-link'>
      <article className='course-card'>
        <figure className='course-image'>
          <img src={course.imageUrl} alt={course.title || 'Cursus afbeelding'} />
        </figure>
        <div className='course-content'>
          <h3>{course.title}</h3>
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
                openCourseVideo(course.videoUrl)();
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
