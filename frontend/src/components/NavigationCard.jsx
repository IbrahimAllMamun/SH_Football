// src/components/NavigationCard.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationCard = ({ isVisible, setIsVisible }) => {
  const cardRef = useRef(null);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsVisible]);

  // Function to handle link click
  const handleLinkClick = () => {
    setIsVisible(false); // Close the navigation card
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className={``}
      >
        <div className="flex font-kanit items-center">
          <Link
            to="/"
            className={`text-white text-lg mb-2 p-6 bg-green-400/70 rounded-3xl shadow-lg transform transition-all duration-300 
        ${isVisible ? 'scale-100' : 'scale-90'}`}
            onClick={handleLinkClick}
          >
            Component 1
          </Link>
          <Link
            to="/teams"
            className="text-white text-lg mb-2"
            onClick={handleLinkClick}
          >
            Component 2
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </div>
  );
};

NavigationCard.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default NavigationCard;
