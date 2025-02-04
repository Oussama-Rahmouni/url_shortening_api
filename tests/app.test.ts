import request from 'supertest';
import app from '../src/app';
import Url from '@/models/index'; // Import the model to mock it

// Mock the database model
jest.mock('@/models/index');

describe('POST /shorten', () => {
  it('should shorten a URL', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing URL
    (Url.prototype.save as jest.Mock).mockResolvedValue({
      baseUrl: 'https://example.com',
      shortnedId: 'Guz5YE',
    });

    const res = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: 'https://example.com' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('shortnedId', 'Guz5YE');
  }, 10000); // Increase timeout to 10 seconds

  it('should return 400 for invalid URL', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: 'invalid-url' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'URL not valid');
  }, 10000); // Increase timeout to 10 seconds
});

describe('GET /:shortnedId', () => {
  it('should redirect to the original URL', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue({
      baseUrl: 'https://exampyle.com',
      shortnedId: 'f5M5lm',
    });

    const res = await request(app).get('/api/f5M5lm');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('baseUrl', 'https://exampyle.com');
  }, 10000); // Increase timeout to 10 seconds

  it('should return 400 for invalid short ID', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/invalidShortId');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Shortned ID do not exist');
  }, 10000); // Increase timeout to 10 seconds
});

afterAll(async () => {
  // Close any open handles (e.g., database connections)
  jest.resetAllMocks(); // Reset all mocks
});