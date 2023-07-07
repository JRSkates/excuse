//require('dotenv').config();
const request = require('supertest');
const { Configuration, OpenAIApi } = require('openai');
const app = require('../../app');
const ExcuseController = require('../../controllers/excuseGenerator');

jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(),
}));

describe('GET /excuse', () => {
  it('should return an excuse', async () => {
    OpenAIApi.mockImplementationOnce(() => ({
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
      }));
    const response = await request(app)
      .get('/excuse');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ excuse: 'I am late' });
    //expect(ExcuseController.generateExcuse).toHaveBeenCalledTimes(1);
  });

  it('should handle errors and return an error response', async () => {
    OpenAIApi.mockImplementationOnce(() => ({
      createChatCompletion: jest.fn().mockRejectedValueOnce(new Error('Failed to generate excuse.'))
    }))
    const response = await request(app)
      .get('/excuse');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({error: 'Failed to generate excuse.'})
  })
});
