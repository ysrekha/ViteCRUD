// passengers.ts

// Import necessary modules and styles

// Import Bootstrap CSS for styling and Bootstrap JavaScript bundle for additional functionality
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Import jQuery for DOM manipulation and AJAX requests
import $ from 'jquery';

// Import custom CSS for additional styling specific to your application
import './style.css';

// Import functions for interacting with the API related to passengers
import { fetchPassengers } from './fetchPassengers';
import { addPassenger } from './addPassengers';
import { updatePassenger } from './updatePassengers';
import { deletePassenger } from './deletePassenger';

// Define the structure of a Passenger object
type Passenger = {
    id: string;  // Unique identifier for the passenger
    name: {
        firstName: string;  // Passenger's first name
        lastName: string;   // Passenger's last name
    };
    from: string;  // Starting location of the passenger
    to: string;    // Destination location of the passenger
}

// Initialize an array to hold passenger data
let passengers: Passenger[] = [];

// Select the container element where passengers will be rendered
const passengersContainer = $('#passengers-container');

// Function to render passengers data into the HTML
export async function renderPassengers() {
    // Clear previous content from the table body
    passengersContainer.empty();

    try {
        // Fetch the latest list of passengers from the API
        passengers = await fetchPassengers();
        
        // Loop through each passenger and create a table row for each
        passengers.forEach((passenger) => {
            const tr = $("<tr>"); // Create a new table row element

            // Populate the row with passenger data and a delete button
            tr.html(`
                <td>${passenger.name.firstName}</td>
                <td>${passenger.name.lastName}</td>
                <td>${passenger.from}</td>
                <td>${passenger.to}</td>
                <td>${passenger.id}</td>
                <td><button class="delete-button btn btn-danger">Delete</button></td>
            `);

            // Attach a click event handler to the delete button
            tr.find(".delete-button").on("click", async function () {
                try {
                    // Delete the passenger using the API
                    await deletePassenger(passenger.id);
                    // Update UI by removing the row from the table
                    tr.remove();
                    // Update local state (passengers array) to remove the deleted passenger
                    passengers = passengers.filter(p => p.id !== passenger.id);
                } catch (error) {
                    // Log any errors encountered during deletion
                    console.error('Error deleting passenger:', error);
                }
            });

            // Append the new row to the passengers container
            passengersContainer.append(tr);
        });
    } catch (error) {
        // Log any errors encountered during fetching or rendering
        console.error('Error rendering passengers:', error);
    }
}

// Event listener to handle adding a new passenger
export function setupAddPassengerForm() {
    // Select the form element for adding new passengers
    const addNewPassengerForm = $('#addNewPassengerForm');
    
    // Attach a submit event handler to the form
    addNewPassengerForm.on('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data to create a new passenger object
        const newPassenger = {
            name: {
                firstName: $('#newFirst').val() as string,
                lastName: $('#newLast').val() as string
            },
            from: $('#newOrigin').val() as string,
            to: $('#newDestination').val() as string
        };

        try {
            // Add the new passenger using the API
            const createdPassengerWithId = await addPassenger(newPassenger);
            // Update local state with the newly created passenger
            passengers.push(createdPassengerWithId);
            // Re-render the list of passengers to include the new one
            await renderPassengers();
            // Reset the form fields
            addNewPassengerForm.trigger('reset');
        } catch (error) {
            // Log any errors encountered during adding the passenger
            console.error('Error adding new passenger:', error);
        }
    });
}

// Event listener to handle updating an existing passenger
export function setupUpdatePassengerForm() {
    // Select the form element for updating passengers
    const updatePassengerForm = $('#updatePassengerForm');
    
    // Attach a submit event handler to the form
    updatePassengerForm.on('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data to create an updated passenger object
        const updatedPassenger: Passenger = {
            name: {
                firstName: $('#updateFirst').val() as string,
                lastName: $('#updateLast').val() as string
            },
            from: $('#updateOrigin').val() as string,
            to: $('#updateDestination').val() as string,
            id: $('#updateId').val() as string
        };
       
        try {
            // Update the passenger using the API
            await updatePassenger(updatedPassenger);
            // Find the index of the passenger in the local state to update it
            const indexToUpdate = passengers.findIndex(p => p.id === updatedPassenger.id);
            if (indexToUpdate !== -1) {
                // Update the passenger in the local state
                passengers[indexToUpdate] = updatedPassenger;
                // Re-render the list of passengers to reflect the changes
                await renderPassengers();
                // Reset the form fields
                updatePassengerForm.trigger('reset');
            } else {
                // Log an error if the passenger was not found in the local state
                console.error('Passenger not found in local list:', updatedPassenger);
            }
        } catch (error) {
            // Log any errors encountered during updating the passenger
            console.error('Error updating passenger:', error);
        }
    });
}
