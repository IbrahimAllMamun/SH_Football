// src/components/NavigationCard.jsx
import  { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className={`p-6 rounded shadow-lg transform transition-all duration-300 
        ${isVisible ? 'scale-100' : 'scale-90'}`}
      >
        <h2 className="text-white text-3xl mb-4">Navigation</h2>
        <div className="flex flex-col items-center">
            hello
          {/* <Link to="/component1" className="text-white text-lg mb-2">Component 1</Link>
          <Link to="/component2" className="text-white text-lg mb-2">Component 2</Link>
          <Link to="/component3" className="text-white text-lg mb-2">Component 3</Link> */}
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
