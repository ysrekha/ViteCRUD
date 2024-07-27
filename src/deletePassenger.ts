// Import the API key or endpoint path from the keyPath module
import API_KEY_PATH from './keyPath';

// Asynchronous function to delete a passenger from the API
export async function deletePassenger(passengerId: string): Promise<void> {
    try {
        // Make a DELETE request to the API with the specific passenger ID
        await fetch(`${API_KEY_PATH}/${passengerId}`, {
            method: 'DELETE'  // HTTP method for deleting resources
        });
        // Optionally handle the response if needed (e.g., check status or process response)
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error deleting passenger:', error);
        // Optionally rethrow the error to allow further handling by the caller
        throw error;
    }
}
