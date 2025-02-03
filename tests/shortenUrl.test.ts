import ShortenUrlService from '@/services/index';
import Url from '@/models/index';
import mongoose from 'mongoose';

// Mock the Url model
jest.mock('@/models/index');

describe('ShortenUrlService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('makeShorter', () => {
    it('should shorten a URL and save it to the database', async () => {
      const baseUrl = '/api/shorten';
      const duration = '24h';
      const mockUrl = {
        baseUrl,
        shortnedId: 'https://welcomeinmyshortenurl.com',
        expiration: new Date(),
      };

      // Mock the save method
      (Url.prototype.save as jest.Mock).mockResolvedValue(mockUrl);

      const result = await ShortenUrlService.makeShorter(baseUrl, duration);

      expect(result).toEqual(mockUrl);
      expect(Url.prototype.save).toHaveBeenCalled();
    });

    it('should throw an error if saving to the database fails', async () => {
      const baseUrl = '/api/shorten';
      const duration = '24h';

      // Mock the save method to throw an error
      (Url.prototype.save as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ShortenUrlService.makeShorter(baseUrl, duration)).rejects.toThrow('Database error');
    });
  });

  describe('getBase', () => {
    it('should retrieve the original URL using the shortened ID', async () => {
      const shortnedId = 'abc123';
      const mockUrl = {
        baseUrl: '/api/6VVqY4',
        shortnedId,
        expiration: new Date(),
      };

      // Mock the findOne method
      (Url.findOne as jest.Mock).mockResolvedValue(mockUrl);

      const result = await ShortenUrlService.getBase(shortnedId);

      expect(result).toEqual(mockUrl);
      expect(Url.findOne).toHaveBeenCalledWith({ shortnedId });
    });

    it('should return null if the shortened ID does not exist', async () => {
      const shortnedId = 'invalidId';

      // Mock the findOne method to return null
      (Url.findOne as jest.Mock).mockResolvedValue(null);

      const result = await ShortenUrlService.getBase(shortnedId);

      expect(result).toBeNull();
    });
  });

  describe('verifyBase', () => {
    it('should verify if a URL already exists in the database', async () => {
      const baseUrl = 'https://welcomeinmyshortenurl.com';
      const mockUrl = {
        baseUrl,
        shortnedId: 'abc123',
        expiration: new Date(),
      };

      // Mock the findOne method
      (Url.findOne as jest.Mock).mockResolvedValue(mockUrl);

      const result = await ShortenUrlService.verifyBase(baseUrl);

      expect(result).toEqual(mockUrl);
      expect(Url.findOne).toHaveBeenCalledWith({ baseUrl });
    });

    it('should return null if the URL does not exist in the database', async () => {
      const baseUrl = 'https://nonexistent.com';

      // Mock the findOne method to return null
      (Url.findOne as jest.Mock).mockResolvedValue(null);

      const result = await ShortenUrlService.verifyBase(baseUrl);

      expect(result).toBeNull();
    });
  });
});