import React, { useState, useEffect } from 'react';
import Login from './login'; // Assuming the Login component is in the same folder

const NewsApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  const newsItems = [
    {
      title: '🚆 Train Service Updates',
      summary: 'Recent changes in train schedules, including new stops and additional routes to improve connectivity.',
      link: 'https://mylittleviewsonrailways.travel.blog/stopping-trains-at-ylm',
    },
    {
      title: '🏗️ Station Modernization',
      summary: 'Upgrades to platforms, digital signboards, and clean facilities to enhance passenger experience.',
      link: 'https://mylittleviewsonrailways.travel.blog/improvement-of-station',
    },
    {
      title: '✉️ Public Letters',
      summary: 'Open letters and petitions written to the Railway Minister about pressing issues.',
      link: 'https://mylittleviewsonrailways.travel.blog/letters-to-railway-minister',
    },
  ];

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set user as logged in on successful login
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoggedIn) {
    // If not logged in, show the Login page
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <header style={styles.header}>
        <h1 style={styles.title}>Railway News Portal</h1>
      </header>

      <main style={styles.main}>
        <section style={styles.sliderSection}>
          <div style={styles.slider}>
            <button onClick={prevItem} style={styles.navBtn}>⟵</button>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{newsItems[currentIndex].title}</h2>
              <p style={styles.cardSummary}>{newsItems[currentIndex].summary}</p>
              <a href={newsItems[currentIndex].link} target="_blank" rel="noopener noreferrer" style={styles.cardLink}>
                Read More ↗
              </a>
              <p style={styles.counter}>{currentIndex + 1} / {newsItems.length}</p>
            </div>
            <button onClick={nextItem} style={styles.navBtn}>⟶</button>
          </div>
        </section>

        <section style={styles.blogSection}>
          <h3 style={styles.blogTitle}>More from the Blog</h3>
          <ul style={styles.blogList}>
            <li><a href="https://mylittleviewsonrailways.travel.blog/stopping-trains-at-ylm" target="_blank" rel="noreferrer" style={styles.blogLink}>Stopping Trains at YLM</a></li>
            <li><a href="https://mylittleviewsonrailways.travel.blog/improvement-of-station" target="_blank" rel="noreferrer" style={styles.blogLink}>Improvement of Station</a></li>
            <li><a href="https://mylittleviewsonrailways.travel.blog/letters-to-railway-minister" target="_blank" rel="noreferrer" style={styles.blogLink}>Letters to Railway Minister</a></li>
          </ul>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2025 Railway Updates. Stay connected. Stay informed.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    backgroundImage: 'url(/rail501.jpg)', // Image from public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    zIndex: 0,
  },
  header: {
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: '42px',
    color: '#e50914',
    margin: 0,
  },
  main: {
    flex: 1,
    padding: '50px 20px',
    zIndex: 1,
  },
  sliderSection: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  card: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    padding: '40px',
    borderRadius: '20px',
    width: '420px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '26px',
    marginBottom: '14px',
    color: '#ffcc00',
  },
  cardSummary: {
    fontSize: '17px',
    lineHeight: '1.7',
    marginBottom: '22px',
  },
  cardLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '17px',
  },
  counter: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#aaa',
  },
  navBtn: {
    fontSize: '30px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  blogSection: {
    textAlign: 'center',
  },
  blogTitle: {
    fontSize: '30px',
    marginBottom: '20px',
    color: '#00fa9a',
  },
  blogList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  blogLink: {
    display: 'block',
    margin: '12px 0',
    color: '#00aced',
    textDecoration: 'none',
    fontSize: '19px',
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: '20px',
    textAlign: 'center',
    zIndex: 1,
  },
  footerText: {
    color: '#aaa',
    fontSize: '15px',
  },
};

export default NewsApp;
