# Trip Planner

## Live Demo
**You can see the `Trip Planner` project Live On:** [Here](https://webdev-proj-front.vercel.app/)


## Overview

Trip Planner is a comprehensive web application designed to assist users in planning their trips. 
By leveraging advanced AI models, this web application requires just two user inputs - Country and Trip Type (Car or Bicycle), to generate a comprehensive and detailed trip itinerary.
It provides detailed information about points of interest, routes, and images, leveraging technologies like React for the frontend and Node.js for the backend, with data stored in MongoDB. The application features an interactive map with draggable waypoints, responsive design, and the ability to fetch and display relevant images for a seamless trip planning experience.

## Features

- Display points of interest on a map using Leaflet.
- Route planning with draggable waypoints.
- Fetch and display images related to the trip.
- Responsive design for various screen sizes.

## Technologies Used

### Frontend

- React
- Redux Toolkit
- Leaflet
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/natikozel/webdev-ai-project.git
    cd trip-planner
    ```

2. Install dependencies for both frontend and backend:

    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the `frontend` directory and add the following:

        ```dotenv
        REACT_APP_SERVER_ENDPOINT_URL=http://localhost:8080
        ```

    - Create a `.env` file in the `backend` directory and add the following:

        ```dotenv
        PORT=8080
        GROQ_API_KEY=your_groq_api_key
        MONGODB_URI=your_mongodb_uri
        STABLEHORDE_API_KEY=your_stablehorde_api_key
        STABLEHORDE_API_POST_URL=https://stablehorde.net/api/v2/generate/async
        STABLEHORDE_API_STATUS_URL=https://stablehorde.net/api/v2/generate/status
        ```

### Running the Application

1. Start the backend server:

    ```sh
    cd backend
    npm start
    ```

2. Start the frontend development server:

    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

### Frontend

- `src`
    - `components`: React components
    - `store`: Redux slices and store configuration
    - `App.css`: Global styles
    - `index.js`: Entry point

### Backend

- `src`
    - `middleware`: Express middleware
    - `models`: Mongoose models
    - `routes`: Express routes
- `api`
    - `index.js` : Entry point
 

## **Images:**

### Initial Form
- Shows the form where you choose which country you want to travel and which type do you want the trip to be (currently either Car or Bicycle trips)

  ![cropped](https://i.ibb.co/Jv3tST8/1.png)

### Trip Image

- With the usage of StableHorde's API, the web app makes use of an intelligent AI model that generates an image based on a given prompt.
- To the left side is the prompt that created the image on the right side.

  ![cropped](https://i.ibb.co/yFJq6DZ/3.png)

### Trip cards
- Card components that breaks down daily activities for easy review, planning and displays itinerary details on that specific day.
- Also clickable to view a route map for that particular day.

  ![cropped](https://i.ibb.co/2nfrwxr/2.png)

### Trip Route
- Integrated with Leaflet and an OSRM server, the web app creates a detailed routing machine and displays it intuitvely and fun.

  ![cropped](https://i.ibb.co/L6GN5SD/4.png)


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
