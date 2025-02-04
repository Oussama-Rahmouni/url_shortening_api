# URL Shortener API

This is a URL Shortener API that allows users to shorten URLs, retrieve original URLs using shortened IDs, and bulk shorten URLs via CSV file uploads. The API also supports setting expiration times for the shortened URLs and validation on input URLs. 

## Features

- **Shorten a Single URL**
- **Retrieve Original URL**
- **Bulk URL Shortening**
- **Expiration Dates**
- **URL Validation**
- **Custom Error Handling**
- **CI/CD Integration**

## API Endpoints

- **POST `/shorten`**: Shortens a single URL.
- **GET `/:{shortenedId}`**: Retrieves the original URL from a shortened ID.
- **POST `/bulk-shorten`**: Upload a CSV file to bulk shorten URLs.

## Project Structure

This project follows a clean and scalable structure, with the following main folders:

- **`src/`**: Contains the source code of the application.
  - **`controllers/`**: Handles incoming HTTP requests and interacts with services.
  - **`middleware/`**: Custom middleware for validation, authentication, etc.
  - **`models/`**: Mongoose models for MongoDB schemas.
  - **`routes/`**: API route definitions.
  - **`config/`**: Handles database connection, with multple essays.
  - **`services/`**: Business logic for URL shortening and data handling.
  - **`utils/`**: Helper functions and utilities.
  - **`server.ts`**: Main entry point to start the Express server.
  - **`app.ts`**: Main insance of express .

- **`dist/`**: Compiled JavaScript files after TypeScript transpiling (generated after running the build script).
- **`tests/`**: Contains unit and integration tests to validate the application’s behavior.
- **`package.json`**: Lists the dependencies, scripts, and other configurations.

    Copy
