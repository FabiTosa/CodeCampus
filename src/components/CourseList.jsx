import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, favorites, onToggleFavorite }) => {
  if (!courses || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isFavorite={favorites?.has(course.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
};

export default CourseList;
