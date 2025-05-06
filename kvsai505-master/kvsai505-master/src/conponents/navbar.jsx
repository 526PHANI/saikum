import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(100); // Default brightness to 100

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  useEffect(() => {
    const appendKeyframes = (id, rules) => {
      if (!document.getElementById(id)) {
        const style = document.createElement('style');
        style.id = id;
        style.innerHTML = rules;
        document.head.appendChild(style);
      }
    };

    appendKeyframes('keyframes-style', `
      @keyframes colorChange {
        0% { color: #FFD700; }
        50% { color: #FF6347; }
        100% { color: #32CD32; }
      }

      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes scale3D {
        0% { transform: rotateY(0deg) scale(1); }
        50% { transform: rotateY(10deg) scale(1.1); }
        100% { transform: rotateY(0deg) scale(1); }
      }

      /* Mobile screen adjustments */
      @media screen and (max-width: 768px) {
        .navbar-links {
          display: none !important;
        }

        .hamburger {
          display: flex !important;
        }

        .sidebar {
          display: block !important;
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          background-color: #232F3E;
          width: 250px;
          padding-top: 60px;
        }

        .logoText {
          font-size: 18px;
        }

        .logoImage {
          width: 30px;
          height: 30px;
        }

        .navbar-links {
          gap: 10px;
        }

        .link {
          font-size: 14px;
        }

        .hamburger .bar {
          width: 20px;
          height: 2px;
        }

        .sidebar {
          font-size: 14px;
        }

        button {
          font-size: 14px;
        }
      }
    `);
  }, []);

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <nav style={{ ...styles.nav, ...theme.nav, filter: `brightness(${brightness}%)` }}>
      <div style={styles.logoWrapper}>
        <img src="/trainlogonav.png" alt="Logo" style={styles.logoImage} />
        <h2 style={styles.logoText}>Yellamanchilli Railway</h2>
      </div>

      <div className="navbar-links" style={styles.links}>
        <NavLink to="/" label="Home" delay="0.3s" />
        <NavLink to="/projects" label="Projects" delay="0.6s" />
        <NavLink to="/ss" label="Yellamanchilli News" delay="0.9s" />
        <NavLink to="/contact" label="Contact" delay="1.2s" />
        <NavLink to="/login" label="Login" delay="1.5s" />
        <button onClick={toggleTheme} style={theme.toggleBtn}>
          {isDarkMode ? '☀ Bright' : '🌙 Dark'}
        </button>
        {/* Slider for adjusting brightness */}
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={handleBrightnessChange}
          style={styles.brightnessSlider}
        />
      </div>

      <div className="hamburger" style={styles.hamburger} onClick={toggleMenu}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>

      {isMenuOpen && (
        <div className="sidebar" style={{ ...styles.sidebar, ...theme.sidebar }}>
          {["Home", "Projects", "Yellamanchilli News", "Contact", "Login"].map((label, i) => (
            <Link key={label} to={`/${label.toLowerCase().replace(/\s/g, '')}`} style={styles.sideLink}>
              {label}
            </Link>
          ))}
          <button onClick={toggleTheme} style={theme.toggleBtn}>
            {isDarkMode ? '☀ Bright' : '🌙 Dark'}
          </button>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to = "/", label = "Home", delay }) => (
  <Link
    to={to}
    style={{
      ...styles.link,
      animationDelay: delay,
    }}
  >
    {label}
  </Link>
);

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    height: '80px',
    position: 'relative',
    zIndex: 10,
    transition: '0.3s ease all',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    animation: 'colorChange 3s infinite ease-in-out',
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
  link: {
    color: '#FFD700', // Bright yellow color for the 3D effect
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    opacity: 0,
    animation: 'fadeIn 0.6s ease forwards, scale3D 1s ease forwards',
    animationFillMode: 'forwards',
    transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out', // Smooth transition
    padding: '8px 12px', // Added padding for clickable areas
    borderRadius: '5px', // Rounded edges for links
    cursor: 'pointer',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)', // 3D yellow shadow effect
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  sidebar: {
    position: 'absolute',
    top: '80px',
    left: 0,
    width: '100%',
    textAlign: 'center',
    padding: '15px 0',
    display: 'none',
  },
  sideLink: {
    display: 'block',
    margin: '10px 0',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  brightnessSlider: {
    width: '100px',
    marginLeft: '20px',
  },
};

const themes = {
  dark: {
    nav: {
      backgroundColor: '#131921',
      color: '#fff',
    },
    toggleBtn: {
      backgroundColor: '#FF9900',
      color: '#000',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    sidebar: {
      backgroundColor: '#232F3E',
      color: '#fff',
    },
  },
  light: {
    nav: {
      backgroundColor: '#f4f4f4',
      color: '#333',
    },
    toggleBtn: {
      backgroundColor: '#2196F3',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
    sidebar: {
      backgroundColor: '#e0e0e0',
      color: '#000',
    },
  },
};

export default Navbar;
