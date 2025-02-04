import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary

describe('POST /shorten', () => {
  it('should shorten a URL', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({ baseUrl: 'https://example.com' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('shortnedId');
  });

  it('should return 400 for invalid URL', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({ baseUrl: 'invalid-url' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'URL not valid');
  });
});

describe('GET /:shortnedId', () => {
  it('should redirect to the original URL', async () => {
    const res = await request(app).get('/validShortId');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('baseUrl');
  });

  it('should return 400 for invalid short ID', async () => {
    const res = await request(app).get('/invalidShortId');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Shortned ID do not exist');
  });
});

describe('POST /bulk-shorten', () => {
  it('should shorten URLs from a CSV file', async () => {
    const res = await request(app)
      .post('/bulk-shorten')
      .attach('file', 'path/to/test.csv'); // Adjust the path to a test CSV file

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('shortenedUrls');
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/bulk-shorten');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'No file uploaded');
  });
});