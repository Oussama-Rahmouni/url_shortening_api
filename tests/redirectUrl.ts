import request from 'supertest';
import app from '@/app'; // Import your Express app

describe('GET /api/:shortened_id', () => {
  it('should return 200 and redirect to the original URL when a valid shortenedId is provided', async () => {
    const shortenedId = 'cUZtGO'; // Example valid shortenedId

    // Simulate sending a GET request to your /api/:shortened_id route
    const response = await request(app).get(`/api/${shortenedId}`);

    // Check if the response status is 302 (redirection)
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('https://oussama-rahmouni.netlify.app'); // Ensure the URL is the correct redirect
  });

  it('should return 404 if shortenedId is not found', async () => {
    const invalidShortenedId = 'invalidID'; // Invalid shortenedId

    const response = await request(app).get(`/api/${invalidShortenedId}`);

    // Check if the response status is 404 and the error message is correct
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Shortened URL not found');
  });
});
