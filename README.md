# URL Shortener API

## Features
Shorten a Single URL: Convert long URLs into shortened IDs.

Retrieve Original URL: Fetch the original URL using the shortened ID.

Bulk URL Shortening: Upload a CSV file to shorten multiple URLs at once.

Expiration Dates: Set expiration times for shortened URLs (24h, 48h, 7d).

Validation: Ensure URLs are valid and HTTPS (with warnings for HTTP).

Error Handling: Custom error handling for better debugging and user feedback.

CI/CD Integration: Automated testing, linting, and deployment using GitHub Actions.

- Shorten a single URL (`POST /shorten`)
- Retrieve the original URL from a shortened ID (`GET /{shortenedId}`)
- Bulk URL shortening via CSV file upload (`POST /bulk-shorten`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/url-shortener-api.git
   cd url-shortener-api

2. Install packages 
    ```bash
n   pm install

3. DB CONNECTION
    ```bash
        DB_CONNECTION=the db url
        CLIENT_URL=http://localhost:3000
        PORT=3000


npm run build 

npm run dev


CI/CD
This project is integrated with GitHub Actions for continuous integration and delivery. The pipeline includes:

Linting and formatting
Testing
Deployment to production 