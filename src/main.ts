// main.ts

// Import necessary modules and styles

// Import Bootstrap CSS for styling and Bootstrap JavaScript bundle for functionality
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Import jQuery for handling DOM manipulation and AJAX requests
import $ from 'jquery';

// Import custom CSS for additional styling specific to your application
import './style.css';

// Import functions related to passenger management
import { renderPassengers, setupAddPassengerForm, setupUpdatePassengerForm } from './passengers';

// Initial setup when the document is ready
$(document).ready(function () {
    // Call the function to render the list of passengers on the page
    renderPassengers();

    // Call the function to setup the form for adding new passengers
    setupAddPassengerForm();

    // Call the function to setup the form for updating existing passengers
    setupUpdatePassengerForm();
});
