# Rondaze Backend

Rondaze Backend is a Node.js application that connects to a Supabase database to manage high scores for a game. This project uses Express.js for the server framework and Supabase for the database.

## Project Structure

```
rondaze-backend
├── src
│   ├── server.js               # Entry point of the application
│   ├── controllers
│   │   └── highScoresController.js # Handles high scores logic
│   ├── routes
│   │   └── highScoresRoutes.js  # Defines routes for high scores
│   └── db
│       └── supabaseClient.js    # Configured Supabase client
├── package.json                  # NPM configuration file
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd rondaze-backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:

   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-api-key>
   ```

4. Start the server:
   ```
   npm start
   ```

## API Usage

### Get High Scores

- **Endpoint:** `GET /highscores`
- **Description:** Retrieves the list of high scores from the database.

### Add High Score

- **Endpoint:** `POST /highscores`
- **Description:** Adds a new high score to the database.
- **Request Body:**
  ```json
  {
    "name": "PlayerName",
    "score": 100
  }
  ```

## License

This project is licensed under the MIT License.
