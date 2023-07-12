//require('dotenv').config();
const axios = require('axios');
const request = require('supertest');
const { Configuration, OpenAIApi } = require('openai');
const app = require('../../app');
const ExcuseController = require('../../controllers/excuseGenerator');

jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(),
}));

jest.mock('axios');

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

  it("should return an excuse with EONET when toggle is on", async () => {
    OpenAIApi.mockClear();
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

    const eonetResponseMock = {
      data: {
        events: [
          {
            title: 'Earthquake',
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(eonetResponseMock);

    const response = await request(app)
      .get('/excuse')
      .query({ eventType: 'Some event', toggle: 'on' });

    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body).toEqual({
      excuse: 'I am late',
    });
  });
});
