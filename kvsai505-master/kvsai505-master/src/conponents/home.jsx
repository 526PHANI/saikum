import React, { useState } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
}

const slideData = [
  { title: 'Godavari Express', number: '12728', description: 'Runs daily between Visakhapatnam and Hyderabad Deccan.', src: '/rail101.jpg' },
  { title: 'East Coast Express', number: '18645', description: 'Operates between Howrah Junction and Hyderabad Deccan.', src: '/rail102.jpg' },
  { title: 'East Coast Express', number: '18646', description: 'Operates between Hyderabad Deccan and Howrah Junction.', src: '/rail103.jpg' },
  { title: 'Visakhapatnam–Hyderabad Godavari Superfast Express', number: '12727', description: 'Departs Visakhapatnam at 6:23 PM.', src: '/rail104.jpg' },
  { title: 'Visakhapatnam–Secunderabad Special', number: '07098', description: 'Departs Visakhapatnam at 8:49 PM on Mondays.', src: '/rail105.jpg' },
  { title: 'Visakhapatnam–Chennai Egmore Special', number: '08557', description: 'Departs Visakhapatnam at 8:14 PM on Saturdays.', src: '/rail106.jpg' },
  { title: 'Arunachal Express', number: '12508', description: 'Departs at 4:07 PM.', src: '/rail107.jpg' },
  { title: 'Secunderabad–Silchar SF Express', number: '12513', description: 'Departs at 3:03 AM.', src: '/rail108.jpg' },
  { title: 'Silchar–Secunderabad SF Express', number: '12514', description: 'Departs at 4:07 PM.', src: '/rail109.jpg' },
  { title: 'Silchar–Coimbatore Express', number: '12516', description: 'Departs at 3:58 PM on Tuesdays.', src: '/rail110.jpg' },
  { title: 'Gurudev SF Express', number: '12660', description: 'Departs at 3:09 PM.', src: '/rail111.jpg' },
  { title: 'Falaknuma Express', number: '12703', description: 'Departs at 11:17 PM.', src: '/rail112.jpg' }
];

const fuse = new Fuse(slideData, {
  keys: ['title', 'number'],
  threshold: 0.4,
});

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [error, setError] = useState('');

  const handleVoiceSearch = () => {
    if (!recognition) {
      alert('Your browser does not support voice recognition');
      return;
    }

    setError('');
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setSearchText(transcript);
    };

    recognition.onerror = () => {
      setError('Voice recognition failed. Try again.');
    };
  };

  const filteredSlides = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : slideData;

  const handleSlideClick = (index) => {
    setSelectedSlide(index);
  };

  const closeModal = () => setSelectedSlide(null);

  return (
    <Container>
      <Header>RailView YLM 🚆</Header>

      <SearchContainer>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by train name or number..."
        />
        <SearchButton><FaSearch /></SearchButton>
        <VoiceButton onClick={handleVoiceSearch}><FaMicrophone /></VoiceButton>
      </SearchContainer>

      {error && <ErrorText>{error}</ErrorText>}

      <SlideContainer>
        {filteredSlides.length > 0 ? (
          filteredSlides.map((slide, index) => (
            <Slide key={index} onClick={() => handleSlideClick(index)}>
              <ImageContainer imageUrl={slide.src}></ImageContainer>
              <SlideInfo>
                <h3>{slide.title}</h3>
                <p>{slide.number}</p>
              </SlideInfo>
            </Slide>
          ))
        ) : (
          <p>No trains found.</p>
        )}
      </SlideContainer>

      {selectedSlide !== null && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{filteredSlides[selectedSlide].title}</h2>
            <p>{filteredSlides[selectedSlide].description}</p>
            <button onClick={closeModal}>Close</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`padding: 20px; text-align: center;`;
const Header = styled.h1`color: #0288d1; margin-bottom: 20px;`;
const SearchContainer = styled.div`display: flex; justify-content: center; align-items: center; margin-bottom: 20px;`;
const Input = styled.input`
  padding: 10px; font-size: 16px; width: 300px;
  border: 1px solid #ccc; border-radius: 8px 0 0 8px;
`;
const SearchButton = styled.button`
  background: #0288d1; color: white; padding: 10px;
  border: none; border-radius: 0; cursor: pointer;
`;
const VoiceButton = styled.button`
  background: #00bfa5; color: white; padding: 10px;
  border: none; border-radius: 0 8px 8px 0; cursor: pointer;
`;
const ErrorText = styled.p`color: red; font-weight: bold;`;

const SlideContainer = styled.div`
  display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;
`;
const Slide = styled.div`
  width: 250px; padding: 10px; background: #f8f8f8;
  border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { 
    transform: scale(1.05); 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); 
  }
`;

const ImageContainer = styled.div`
  width: 100%; height: 180px; 
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const SlideInfo = styled.div`
  margin-top: 15px;
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-transform: capitalize;
  }
  p {
    font-size: 14px;
    color: #777;
    margin-top: 5px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5); display: flex;
  align-items: center; justify-content: center; z-index: 999;
`;
const ModalContent = styled.div`
  background: white; padding: 20px; border-radius: 10px;
  max-width: 500px; text-align: center;
  button {
    margin-top: 20px; background-color: #0288d1; color: white;
    padding: 10px 20px; border: none; border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;a
    &:hover { background-color: #0277bd; }
  }
`;
