import { useState, useMemo } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  // <-- new state for search term

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

  const categories = useMemo(() => {
    if (!Array.isArray(courseData)) return [];
    const catSet = new Set();
    courseData.forEach(course => {
      course.categories.forEach(cat => catSet.add(cat));
    });
    return Array.from(catSet).sort();
  }, [courseData]);

  const basicTabs = ['all', 'beginner', 'gevorderd', 'populair'];
  const fullTabs = [...basicTabs, ...categories];

  const tabLabels = {
    all: 'Alle Cursussen',
    beginner: 'Cursussen voor Beginners',
    gevorderd: 'Gevorderde Cursussen',
    populair: 'Meest Bekeken Cursussen',
  };
  categories.forEach(cat => {
    tabLabels[cat] = cat.charAt(0).toUpperCase() + cat.slice(1);
  });

  // Filter courses by active tab first
  const filteredByTab = useMemo(() => {
    if (!Array.isArray(courseData)) return [];

    switch (activeTab) {
      case 'beginner':
        return courseData.filter(course => course.level === 'Beginner');
      case 'gevorderd':
        return courseData.filter(course => course.level === 'Gevorderd');
      case 'populair':
        return [...courseData].sort((a, b) => b.views - a.views);
      case 'all':
        return courseData;
      default:
        return courseData.filter(course => course.categories.includes(activeTab));
    }
  }, [activeTab, courseData]);

  // Further filter by search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm) return filteredByTab;

    return filteredByTab.filter(course => {
      // Search in title and description (adjust as needed)
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

      <div className='dashboard-content' style={{ position: 'relative' }}>
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

          <CourseList courses={filteredCourses} />
        </section>

        <aside className='sidebar'>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>

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
      </div>
    </section>
  );
};

export default Dashboard;
