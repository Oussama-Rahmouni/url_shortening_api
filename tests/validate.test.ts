import request from 'supertest';
import app from '@/app'; // Import your Express app

describe('POST /api/shorten', () => {
  it('should return 200 and the shortened URL when the baseUrl is valid', async () => {
    const validBaseUrl = 'https://oussama-rahmouni.netlify.app'; // Valid URL

    const response = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: validBaseUrl });

    // Check that the response status is 200 and contains the expected shortened URL
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/cUZtGO/); // Match the shortened URL pattern
  });

  it('should return 400 if baseUrl is missing', async () => {
    const response = await request(app).post('/api/shorten').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('URL is required');
  });

  it('should return 400 if baseUrl is invalid', async () => {
    const invalidBaseUrl = 'invalid-url'; // Invalid URL

    const response = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: invalidBaseUrl });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid URL format');
  });
});
