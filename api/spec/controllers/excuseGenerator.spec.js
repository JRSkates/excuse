//require('dotenv').config();
const request = require('supertest');
const { Configuration, OpenAIApi } = require('openai');
const app = require('../../app');
const ExcuseController = require('../../controllers/excuseGenerator');

jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(() => ({
    createChatCompletion: jest.fn().mockResolvedValueOnce({
      data: {
        choices: [
          {
            message: {
              content: 'I am late'
            }
          }
        ]
      }
    })
  }))
}));

describe('GET /excuse', () => {
  it('should return an excuse', async () => {
    const response = await request(app)
      .get('/excuse');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ excuse: 'I am late' });
    //expect(ExcuseController.generateExcuse).toHaveBeenCalledTimes(1);
  });
});
