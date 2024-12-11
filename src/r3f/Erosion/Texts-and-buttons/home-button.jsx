import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom for navigation.
import styles from './home-button.module.css'; // Import CSS module for styling the component.

const HomeButton = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook to programmatically navigate between routes.

  return (
    <div className={styles.navbar}> {/* Container styled as a navigation bar using the CSS module. */}
      <button 
        className={styles.backButton} // Style the button using the 'backButton' class from the CSS module.
        onClick={() => navigate('/world')} // Navigate to the '/world' route when the button is clicked.
      >
        ← Go Back {/* Display text with a left arrow indicating a navigation action. */}
      </button>
    </div> 
  );
};

export default HomeButton; // Export the HomeButton component for use in other parts of the application.
