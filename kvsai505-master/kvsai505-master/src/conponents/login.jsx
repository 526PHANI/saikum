import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const [flipped, setFlipped] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleLogin = () => {
    if (password) {
      onLoginSuccess();
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      // You can add real signup logic here
    }
  };

  return (
    <div style={styles.page}>
      <style>{styles.keyframes}</style>

      <div style={styles.scene}>
        <div
          style={{
            ...styles.card,
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front: Login Form */}
          <div style={{ ...styles.face, ...styles.front }}>
            <h2 style={styles.title}>YLMJAY Login</h2>
            <input type="email" placeholder="Email" style={styles.input} />
            <div style={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button style={styles.button} onClick={handleLogin}>Login</button>
            <p onClick={() => setFlipped(true)} style={styles.link}>
              Don’t have an account? Sign Up
            </p>
          </div>

          {/* Back: Sign Up Form */}
          <div style={{ ...styles.face, ...styles.back }}>
            <h2 style={styles.title}>Create Your YLMJAY Account</h2>
            <div style={styles.row}>
              <input
                type="text"
                placeholder="First Name"
                style={{ ...styles.input, marginRight: '10px' }}
              />
              <input
                type="text"
                placeholder="Last Name"
                style={{ ...styles.input, marginLeft: '10px' }}
              />
            </div>
            <input type="email" placeholder="Email" style={styles.input} />
            <div style={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div style={styles.passwordWrapper}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                style={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordMatchError && (
              <p style={styles.error}>Passwords do not match!</p>
            )}
            <button onClick={handleSignupSubmit} style={styles.button}>Sign Up</button>
            <p onClick={() => setFlipped(false)} style={styles.link}>
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.copyright}>© 2025 YLMJAY. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    background: 'url(/rail501.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  scene: {
    width: '400px',
    height: '500px',
    perspective: '1000px',
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s ease-in-out',
  },
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    boxSizing: 'border-box',
    animation: 'colorSlide 5s ease infinite',
  },
  front: {
    zIndex: 2,
  },
  back: {
    transform: 'rotateY(180deg)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '15px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#232f3e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  link: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#0077b6',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  keyframes: `
    @keyframes colorSlide {
      0% { background-color: #E3F2FD; }
      50% { background-color: #BBDEFB; }
      100% { background-color: #E3F2FD; }
    }
  `,
  passwordWrapper: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '20px',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '20px',
    fontSize: '14px',
    color: '#fff',
  },
  copyright: {
    margin: '0',
    fontSize: '14px',
    color: '#fff',
    opacity: '0.7',
  },
};

export default Login;
