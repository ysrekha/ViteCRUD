// Import the API key path for making requests
import API_KEY_PATH from './keyPath';

// Define the type for the passenger object being updated
type UpdatedPassenger = {
    name: {
        firstName: string;  // Passenger's first name
        lastName: string;   // Passenger's last name
    };
    from: string;          // Starting location of the passenger
    to: string;            // Destination location of the passenger
    id: string;            // Unique identifier of the passenger
};

// Function to update an existing passenger in the API
export async function updatePassenger(updatedPassenger: UpdatedPassenger) {
    try {
        // Make an HTTP PUT request to update the passenger's data
        const response = await fetch(`${API_KEY_PATH}/${updatedPassenger.id}`, {
            method: 'PUT', // HTTP method to update the resource
            headers: {
                'Content-Type': 'application/json' // Indicate that the request body contains JSON
            },
            body: JSON.stringify(updatedPassenger) // Convert the updatedPassenger object to a JSON string
        });

        // Check if the response was successful
        if (!response.ok) {
            // If not successful, throw an error with a message
            throw new Error('Failed to update passenger');
        }

        // Parse the JSON response from the server
        const updatedPassengerData = await response.json();
        // Return the updated passenger data
        return updatedPassengerData;
    } catch (error) {
        // Log any errors encountered during the request
        console.error('Error updating passenger:', error);
        // Re-throw the error for further handling if needed
        throw error;
    }
}
