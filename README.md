# GRAND CIRCUS EXPRESS EXERCISE 1

Task: Continuing from Express Lab 1, add a front-end to display the shopping cart items from your back-end API.

What does the application do?

When the user visits /index.html, an AngularJS application is displayed, which fetches the shopping cart items from the API and displays them beautifully.

## Build Specifications:

### Server Side

1. Create a public folder that will house your front-end files. Adjust the server.js file accordingly to ensure Express is going to be using the public folder.

### Client (Angular) Side

1. Build an Angular app within the public folder.
2. Create a CartService in Angular. Give it a getAllItems() method that uses $http to make a GET request to your /cart-items API.
3. Display the cart items from the service on the page.
4. For this part of the exercise, we do NOT yet need to handle POST, PUT, and DELETE on the Angular side.