import React from 'react';
import { useNavigate } from 'react-router-dom';  // Hook to programmatically navigate between routes
import styles from './home-button.module.css';  // Import custom CSS module for button styles

/**
 * HomeButton component renders a button that navigates to a specified route when clicked.
 * - Uses `useNavigate` from `react-router-dom` for navigation.
 * - The button’s label is passed as a prop and can be customized.
 * - Styles are applied using CSS modules for custom appearance.
 */
const HomeButton = ({ label }) => {
  const navigate = useNavigate();  // Hook to access navigation functions

  // Function to handle button click and navigate to the '/world' route
  const handleClick = () => {
    navigate('/world');  // Navigate to the '/world' route
  };

  return (
    <button className={styles.homeButton} onClick={handleClick}>
      {label}  {/* Button text is passed as the 'label' prop */}
    </button>
  );
};

export default HomeButton;  // Export the HomeButton component
