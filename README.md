# Dog Breed Detector

Dog Breed Detector is a fun and interactive web application where users can guess the breed of a randomly displayed dog image. The project consists of a frontend built with React and a backend built with Node.js. The game provides feedback on whether the user's guess is correct or not.

![351970878-ba7c42b3-37ca-452e-8f50-610943cfca72](https://github.com/user-attachments/assets/fdea1e9f-abee-4902-9c6e-41e3c4f4265a)
Frontend - User Interface

![351970923-1d172949-3692-4152-b1b6-a41d2c66e125 (1)](https://github.com/user-attachments/assets/4468d99e-25d1-40b4-8e0b-6647886473bf)
GamePlay - Backend using DogCeo API and NodeJS

![351970971-216d0798-2f13-43ff-a638-cd9d070e719f (1)](https://github.com/user-attachments/assets/67b42bbc-2d36-4ecf-817d-cadec4c81aff)
The Game saves highest score and stores that in MYSQL from AWS RDS

## Features
- Displays a random dog image and offers multiple choice options for guessing the breed.
- Provides immediate feedback on whether the guess is correct.
- Uses AWS RDS for the database to store user data and game statistics.

## Prerequisites
To run this project, you need to have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later)
- AWS RDS (MySQL)

## Setup and Installation

### Clone the Repository
```bash
git clone https://github.com/acharyaarish/dog_breed_detector.git
cd dog_breed_detector
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - **AWS RDS MySQL Setup:**
     - Go to the [AWS Management Console](https://aws.amazon.com/console/) and navigate to RDS.
     - Create a new MySQL instance.
     - Configure your instance with the desired settings (instance type, storage, etc.).
     - Set the database name to `dog_breed_detector` (or your preferred name).
     - Note down the endpoint, username, and password for your database instance.
   - Create a `.env` file in the backend directory and add the following configuration:
     ```
     DB_HOST=your_rds_endpoint
     DB_USER=your_database_username
     DB_PASSWORD=your_database_password
     DB_NAME=dog_breed_detector
     ```
   Replace `your_rds_endpoint`, `your_database_username`, and `your_database_password` with your actual AWS RDS credentials.

4. Run the database migrations to create the necessary tables:
   ```bash
   npx sequelize db:migrate
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The backend server will start on `http://localhost:5000`.

### Start the Frontend Application
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will start on `http://localhost:3000`.

## Usage
- Open your web browser and go to `http://localhost:3000`.
- A random dog image will be displayed with multiple choice options for the breed.
- Select the breed you think matches the image.
- The application will tell you if your guess was correct or not.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please reach out through [GitHub Issues](https://github.com/acharyaarish/dog_breed_detector/issues).

