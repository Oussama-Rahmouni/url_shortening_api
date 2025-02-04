import request from 'supertest';
import app from '../src/app';
import Url from '../src/models/index'; 
import ShortenUrlService from '../src/services/index';

// Mock the database model and service methods
jest.mock('../src/models/index');
jest.mock('../src/services/index');

describe('POST /shorten', () => {
  it('should shorten a URL successfully', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing URL
    (ShortenUrlService.makeShorter as jest.Mock).mockResolvedValue({
      shortnedId: 'Guz5YE',
      expiration: '2025-12-31',
    });

    const res = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: 'https://example.com' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('shortnedId', 'Guz5YE');
    expect(res.body).toHaveProperty('expiration', '2025-12-31');
  });

  it('should return 400 for invalid URL format', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ baseUrl: 'invalid-url' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'URL not valid');
  });


});

describe('GET /:shortnedId', () => {

  it('should return 400 for invalid short ID format', async () => {
    const res = await request(app).get('/api/invalidShortId');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Shortned ID do not exist');
  });

  it('should return 400 if shortened URL does not exist', async () => {
    // Mock the database response
    (Url.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/invalidShortId');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Shortned ID do not exist');
  });
});

describe('POST /bulk-shorten', () => {
 
  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app)
      .post('/api/bulk-shorten')
      .send({}); // Simulate no file

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'No file uploaded');
  });

  
});

afterAll(async () => {
  jest.resetAllMocks(); // Reset all mocks
});
