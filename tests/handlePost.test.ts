import request from 'supertest';
import app from '@/app'; // Import your Express app

describe('POST /api/shorten', () => {
  // Test Case 1: Should return 200 and the shortened URL when the baseUrl is valid
  it('should return 200 and a shortened URL when the baseUrl is valid', async () => {
    const validBaseUrl = 'https://oussama-rahmouni.netlify.app'; // Valid URL

    const response = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: validBaseUrl });

    // Check that the response status is 200
    expect(response.status).toBe(200);

    // Check that the response contains the shortened URL (e.g., matching a pattern)
    expect(response.body.message).toMatch(/^http:\/\/localhost:5000\/api\/[a-zA-Z0-9]{6}$/); // Match the shortened URL format
  });

  // Test Case 2: Should return 400 if baseUrl is missing
  it('should return 400 if baseUrl is missing', async () => {
    const response = await request(app)
      .post('/api/shorten')
      .send({}); // Send empty body

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('URL is required');
  });

  // Test Case 3: Should return 400 if baseUrl is invalid
  it('should return 400 if baseUrl is invalid', async () => {
    const invalidBaseUrl = 'invalid-url'; // Invalid URL

    const response = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: invalidBaseUrl });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid URL format');
  });

  // Test Case 4: Should return 500 if there is a server error (e.g., database issue)
  it('should return 500 if there is a server error', async () => {
    // Mocking a database failure or any internal server error
    // In a real test, you can mock the ShortenUrlService or simulate a failure
    const validBaseUrl = 'https://oussama-rahmouni.netlify.app';

    jest.spyOn(ShortenUrlService, 'makeShorter').mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: validBaseUrl });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('An error occurred');
  });
});
