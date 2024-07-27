

// Import the API key or endpoint path from the keyPath module
import API_KEY_PATH from './keyPath';

// Import Bootstrap CSS for styling and Bootstrap JavaScript bundle for functionality
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Import custom CSS for additional styling specific to your application
import './style.css';

// Asynchronous function to fetch passengers data from the API
export async function fetchPassengers() {
    try {
        // Make a GET request to the API to retrieve the list of passengers
        const passengersResponse = await fetch(API_KEY_PATH);
        
        // Check if the response status is OK (status code in the range 200-299)
        if (!passengersResponse.ok) {
            // If response is not OK, throw an error with a descriptive message
            throw new Error('Failed to fetch passengers data');
        }

        // Parse the JSON response to get the passengers data
        const passengersData = await passengersResponse.json();
        
        // Return the parsed passengers data
        return passengersData;
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching passengers:', error);
        
        // Re-throw the error to allow further handling by the caller of this function
        throw error;
    }
}
