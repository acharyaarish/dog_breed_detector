# Dog Breed Detector

## Description

The Dog Breed Detector is a web application that allows users to identify the breed of a dog from an image. Users can upload a picture of a dog, and the application will predict the breed using a pre-trained machine learning model. The app also displays random dog images using the Dog CEO API for users to guess the breed.

## Features

- Displays a random dog image from the Dog CEO API for users to guess the breed.
- Provides feedback on correct or incorrect guesses.
- Maintains a leaderboard of scores.

## Installation

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the frontend application:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the backend server:
    ```bash
    node index.js
    ```

## Usage

1. Open your web browser and go to `http://localhost:3000` to view the frontend.
2. Use the application to upload an image of a dog or view a random dog image from the Dog CEO API.
3. The application will display the predicted breed of the dog.
4. Play the game by guessing the breed of the displayed dog image.
5. Submit your score to the leaderboard.

## Project Structure

```plaintext
dog_breed_detector/
├── .ebextensions/
├── flask.config
├── backend/
│   ├── node_modules/
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Game.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── ...
├── node_modules/
└── ...
```

- `backend/`: Contains the backend server code using Node.js and Express.
- `frontend/`: Contains the frontend code using React.
- `src/components/`: Contains React components for the frontend.
- `App.js`: The main React component that manages the game state.
- `index.js`: Entry point for both backend and frontend applications.
- `package.json`: Lists the dependencies and scripts for both backend and frontend projects.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact Information

For any questions or suggestions, please contact me.
