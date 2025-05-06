import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Login from './login'; // Import the Login component

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isHelpPopUpOpen, setIsHelpPopUpOpen] = useState(false);
  const [isTrainQuestionPopUpOpen, setIsTrainQuestionPopUpOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, file });
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message && form.file) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setForm({ name: '', email: '', message: '', file: null });
        setPreviewUrl(null);
        alert('Your message has been sent with the file!');
      }, 1500);
    } else {
      alert('Please fill out all fields and attach a file.');
    }
  };

  const renderPreview = () => {
    if (!previewUrl || !fileType) return null;

    if (fileType.startsWith('image/')) {
      return <img src={previewUrl} alt="Preview" style={styles.previewMedia} />;
    } else if (fileType.startsWith('audio/')) {
      return <audio controls style={styles.previewMedia} src={previewUrl} />;
    } else if (fileType.startsWith('video/')) {
      return <video controls style={styles.previewMedia} src={previewUrl} />;
    }

    return <p style={styles.previewMedia}>Preview not supported</p>;
  };

  const openHelpPopUp = () => {
    setIsHelpPopUpOpen(true);
  };

  const closeHelpPopUp = () => {
    setIsHelpPopUpOpen(false);
    setIsTrainQuestionPopUpOpen(true); // Open the second pop-up after the first is closed
  };

  const closeTrainQuestionPopUp = () => {
    setIsTrainQuestionPopUpOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state when login is successful
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <div style={styles.card}>
          <h2 style={styles.heading}>Contact Me</h2>

          <div style={styles.formContainer}>
            <h3 style={styles.formHeading}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={styles.input}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                style={styles.textarea}
              ></textarea>

              <label style={styles.fileLabel}>Add picture, audio, or video:</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="image/*,audio/*,video/*"
                style={styles.fileInput}
              />
              <div style={styles.fileName}>
                {form.file ? `Attached: ${form.file.name}` : 'No file attached'}
              </div>

              {renderPreview()}

              <button type="submit" style={styles.submitButton} disabled={isSubmitted}>
                {isSubmitted ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div style={styles.socialLinks}>
            <a
              href="https://www.instagram.com/senapathi_jayanth_?igsh=YTdoYTR5eWxkeHI3"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaInstagram size={35} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573106943121"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaFacebook size={35} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaTwitter size={35} />
            </a>
            <a
              href="mailto:jayanth@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaEnvelope size={35} />
            </a>
          </div>
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} /> // Show Login if not logged in
      )}

      {/* Floating Help Desk Button */}
      <div style={styles.helpDesk} onClick={openHelpPopUp}>
        <FaQuestionCircle size={30} style={styles.helpIcon} />
      </div>

      {/* First Help Pop-Up */}
      {isHelpPopUpOpen && (
        <div style={styles.helpPopUp}>
          <div style={styles.helpPopUpContent}>
            <h3 style={styles.helpPopUpTitle}>How can I assist you?</h3>
            <p style={styles.helpPopUpMessage}>
              Please let me know what assistance you need. You can ask any questions you have regarding railway services or anything else!
            </p>
            <button style={styles.closeHelpButton} onClick={closeHelpPopUp}>Close</button>
          </div>
        </div>
      )}

      {/* Second Pop-Up for Railway Questions with Hyperlinks */}
      {isTrainQuestionPopUpOpen && (
        <div style={styles.helpPopUp}>
          <div style={styles.helpPopUpContent}>
            <h3 style={styles.helpPopUpTitle}>Railway Related Questions</h3>
            <ul style={styles.helpPopUpMessage}>
              <li>
                <strong>What time does the Godavari Express depart?</strong>
                <br />
                The Godavari Express typically departs at 6:00 PM from its origin station. You can check the exact schedule <a href="https://www.irctc.co.in/" style={styles.hyperlink}>here</a>.
              </li>
              <li>
                <strong>How can I book tickets for the East Coast Express?</strong>
                <br />
                You can book tickets for the East Coast Express on the <a href="https://www.irctc.co.in/" style={styles.hyperlink}>IRCTC website</a>.
              </li>
            </ul>
            <button style={styles.closeHelpButton} onClick={closeTrainQuestionPopUp}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, rgba(255, 94, 94, 0.8), rgba(87, 94, 255, 0.8))',
    padding: '10px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: '700',
  },
  formContainer: {
    textAlign: 'left',
  },
  formHeading: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  textarea: {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    height: '150px',
    transition: 'all 0.3s ease',
  },
  fileLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '5px',
  },
  fileInput: {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
  },
  fileName: {
    marginTop: '5px',
    color: '#555',
    fontSize: '12px',
  },
  submitButton: {
    padding: '12px 25px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  previewMedia: {
    maxWidth: '100%',
    marginTop: '10px',
  },
  socialLinks: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  socialIcon: {
    color: '#333',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  helpDesk: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#008CBA',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  helpIcon: {
    color: 'white',
  },
  helpPopUp: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  helpPopUpContent: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '80%',
    textAlign: 'center',
  },
  helpPopUpTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  helpPopUpMessage: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
  },
  closeHelpButton: {
    padding: '10px 20px',
    backgroundColor: '#f44',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  hyperlink: {
    color: '#008CBA',
    textDecoration: 'none',
  },
};

export default Contact;
