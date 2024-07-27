// Import the path to the API key or endpoint
import API_KEY_PATH from './keyPath';

// Define the type for a new passenger object
type NewPassenger = {
    name: {
        firstName: string;  // The first name of the passenger
        lastName: string;   // The last name of the passenger
    };
    from: string;  // The starting location of the passenger
    to: string;    // The destination location of the passenger
    id?: string;   // Optional ID for the passenger (might be assigned by the API)
};

// Asynchronous function to add a new passenger to the API
export async function addPassenger(newPassenger: NewPassenger) {
    try {
        // Make a POST request to the API with the new passenger data
        const response = await fetch(API_KEY_PATH, {
            method: 'POST',  // HTTP method used for the request
            headers: {
                'Content-Type': 'application/json'  // Specify that we're sending JSON data
            },
            body: JSON.stringify(newPassenger)  // Convert the passenger object to a JSON string
        });

        // Check if the response status is OK (status code in the range 200-299)
        if (!response.ok) {
            // If response is not OK, throw an error with a descriptive message
            throw new Error('Failed to add new passenger');
        }

        // Parse the JSON response to get the created passenger object with ID
        const createdPassengerWithId = await response.json();
        
        // Return the created passenger object with ID
        return createdPassengerWithId;
    } catch (error) {
        // Log any errors that occurred during the fetch operation
        console.error('Error adding new passenger:', error);
        
        // Re-throw the error so it can be handled by the caller of this function
        throw error;
    }
}
