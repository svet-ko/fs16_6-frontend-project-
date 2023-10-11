# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Technologies

1. Used the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website.
2. Created 4 pages: 
  - Home page
  - Page for all products
  - Single product page
  - Cart page (only available if user logins)
  - About page
  - User's profile page (only available if user logins)
  - Error page
  - Login and Register pages

3. Created Redux store for following features:
  ### product reducer: 
      - get all products
      - find a single products
      - filter products by categories
      - sort products by price
      - create, update and delete a product (enabled update & delete features only for admin of the webapp)
  ### user reducer: 
    - get all users,
    - register and login
  ### cart reducer:
    - add product to cart
    - remove products
    - update products's quantity in cart
4. Set certain routes to be private. Route to user profile page and to his cart is not accessible if user has not logged in.
5. Use pagination when fetching/displaying all the products
6. Implement unit testing for the reducers
7. Implemented performance optimization by debouncing fetching products, that fit's user's input title
7. Deployed the application
Deployment link: [https://main--marvelous-torte-2b4ae0.netlify.app/](https://main--marvelous-torte-2b4ae0.netlify.app/).

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
