import React, { useState, useEffect } from 'react';
import Login from './login'; // Import the Login component

const Ss = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventSlide, setEventSlide] = useState(0);
  const [meetingSlide, setMeetingSlide] = useState(0);

  const news = [
    { title: "Yellamanchilli Station Upgrades Completed", link: "https://www.examplelink.com/news1", image: "https://source.unsplash.com/800x400/?train,station" },
    { title: "New Waiting Lounge Inaugurated", link: "https://www.examplelink.com/news2", image: "https://source.unsplash.com/800x400/?railway,lounge" },
    { title: "Digital Signage Boards Installed", link: "https://www.examplelink.com/news3", image: "https://source.unsplash.com/800x400/?digital,station" },
    { title: "Improved Sanitation Facilities", link: "https://www.examplelink.com/news4", image: "https://source.unsplash.com/800x400/?railway,toilet" },
    { title: "CCTV Surveillance Boosted", link: "https://www.examplelink.com/news5", image: "https://source.unsplash.com/800x400/?cctv,security" }
  ];

  const events = [
    { title: "Annual Festival at Yellamanchilli", date: "May 15, 2025" },
    { title: "Train Station Art Exhibition", date: "June 10, 2025" },
    { title: "Community Railway Meet-Up", date: "July 20, 2025" },
  ];

  const meetings = [
    { title: "Monthly Community Meeting", date: "May 10, 2025" },
    { title: "Station Development Forum", date: "June 5, 2025" },
    { title: "Annual Review with Station Management", date: "August 25, 2025" },
  ];

  useEffect(() => {
    const newsInterval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % news.length), 3000);
    const eventInterval = setInterval(() => setEventSlide((prev) => (prev + 1) % events.length), 3000);
    const meetingInterval = setInterval(() => setMeetingSlide((prev) => (prev + 1) % meetings.length), 3000);

    return () => {
      clearInterval(newsInterval);
      clearInterval(eventInterval);
      clearInterval(meetingInterval);
    };
  }, [news.length, events.length, meetings.length]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with actual login logic
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Main Station Page
  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <div style={styles.logo}><h2>Yellamanchilli Station</h2></div>
        <nav style={styles.navbar}>
          <a href="#news">News</a>
          <a href="#events">Events</a>
          <a href="#meetings">Meetings</a>
          <a href="#location">Location</a>
        </nav>
      </header>

      {/* News */}
      <div id="news" style={styles.carouselContainer}>
        <h2>Latest News</h2>
        <div style={styles.sliderContainer}>
          {news.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                opacity: currentSlide === index ? 1 : 0,
                transform: currentSlide === index ? 'translateX(0)' : 'translateX(100%)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <img src={item.image} alt="News" style={styles.newsImage} />
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.newsLink}>
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div id="events" style={styles.carouselContainer}>
        <h2>Upcoming Events</h2>
        <div style={styles.sliderContainer}>
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                opacity: eventSlide === index ? 1 : 0,
                transform: eventSlide === index ? 'translateX(0)' : 'translateX(100%)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <p>{event.title} - {event.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meetings */}
      <div id="meetings" style={styles.carouselContainer}>
        <h2>Upcoming Meetings</h2>
        <div style={styles.sliderContainer}>
          {meetings.map((meeting, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                opacity: meetingSlide === index ? 1 : 0,
                transform: meetingSlide === index ? 'translateX(0)' : 'translateX(100%)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <p>{meeting.title} - {meeting.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div id="location" style={styles.locationContainer}>
        <h3>About Yellamanchilli Railway Station</h3>
        <p>
          Yellamanchilli Railway Station is a major railway station located in the town of Yellamanchili in Andhra Pradesh, India...
        </p>
      </div>

      {/* Google Map */}
      <div style={styles.mapsContainer}>
        <h3>Find Us on the Map</h3>
        <div style={styles.mapFrame}>
          <iframe
            width="100%" height="400" id="gmap_canvas"
            src="https://maps.google.com/maps?q=Yelamanchili%20Railway%20Station&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
            title="Yellamanchilli Railway Station"
          ></iframe>
        </div>
        <a href="https://www.google.com/maps/place/Yelamanchili+Railway+Station" target="_blank" rel="noopener noreferrer" style={styles.mapLink}>
          View on Google Maps
        </a>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Yellamanchilli Railway Station. All Rights Reserved.</p>
        <p><a href="/about" style={styles.footerLink}>About Us</a> | <a href="/contact" style={styles.footerLink}>Contact Us</a></p>
      </footer>
    </div>
  );
};

const styles = {
  // Add your styles here
};

export default Ss;
