import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteCourseIds, setFavoriteCourseIds] = useState(new Set());

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#e0e0e0';
      } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
      }
      return newMode;
    });
  };

  const toggleFavorite = (courseId) => {
    setFavoriteCourseIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const categories = useMemo(() => {
    if (!Array.isArray(courseData)) return [];
    const catSet = new Set();
    courseData.forEach(course => {
      course.categories.forEach(cat => catSet.add(cat));
    });
    return Array.from(catSet).sort();
  }, [courseData]);

  const basicTabs = ['all', 'beginner', 'gevorderd', 'populair', 'favorieten'];
  const fullTabs = [...basicTabs, ...categories];

  const tabLabels = {
    all: 'Alle Cursussen',
    beginner: 'Cursussen voor Beginners',
    gevorderd: 'Gevorderde Cursussen',
    populair: 'Meest Bekeken Cursussen',
    favorieten: 'Favorieten',
  };
  categories.forEach(cat => {
    tabLabels[cat] = cat.charAt(0).toUpperCase() + cat.slice(1);
  });

  const filteredByTab = useMemo(() => {
    if (!Array.isArray(courseData)) return [];

    switch (activeTab) {
      case 'beginner':
        return courseData.filter(course => course.level === 'Beginner');
      case 'gevorderd':
        return courseData.filter(course => course.level === 'Gevorderd');
      case 'populair':
        return [...courseData].sort((a, b) => b.views - a.views);
      case 'favorieten':
        return courseData.filter(course => favoriteCourseIds.has(course.id));
      case 'all':
        return courseData;
      default:
        return courseData.filter(course => course.categories.includes(activeTab));
    }
  }, [activeTab, courseData, favoriteCourseIds]);

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return filteredByTab;
    return filteredByTab.filter(course => {
      const searchableText = (course.title + ' ' + (course.description || '')).toLowerCase();
      return searchableText.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, filteredByTab]);

  const tabsToShow = showMoreFilters ? fullTabs : basicTabs;

  return (
    <section className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <header className='dashboard-header'>
        <nav className='tab-buttons'>
          {tabsToShow.map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabels[tab]}
            </button>
          ))}
          <button
            className={`toggle-filters-button ${showMoreFilters ? 'active' : ''}`}
            onClick={() => setShowMoreFilters(prev => !prev)}
          >
            {showMoreFilters ? 'Minder filters' : 'Meer filters'}
          </button>
        </nav>
      </header>

      <div className='dashboard-content'>
        <section className='main-content'>
          <h2>{tabLabels[activeTab]}</h2>
          <input
            type="text"
            placeholder="Zoek cursussen..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <CourseList
            courses={filteredCourses}
            favorites={favoriteCourseIds}
            onToggleFavorite={toggleFavorite}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              margin: '40px 0',
            }}
          >
            <Link
              to="/contact"
              style={{ color: 'blue', textDecoration: 'underline', fontSize: '16px' }}
            >
              Contact
            </Link>
            <Link
              to="/help"
              style={{ color: 'blue', textDecoration: 'underline', fontSize: '16px' }}
            >
              Help
            </Link>
          </div>
        </section>

        <aside className='sidebar'>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>

      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: darkMode ? '#0077ff' : '#f1f3f5',
          color: darkMode ? '#fff' : '#333',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </section>
  );
};

export default Dashboard;
