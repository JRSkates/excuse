//require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const generateExcuse = require('./excuseGenerator');

// jest.mock('openai', () => ({
//     Configuration: jest.fn(),
//     OpenAIApi: jest.fn(() => ({
//       createChatCompletion: jest.fn().mockResolvedValueOnce({
//         data: {
//           choices: [
//             {
//               message: {
//                 content: 'I am late'
//               }
//             }
//           ]
//         }
//       })
//     }))
//   }));
  
  describe('generateExcuse', () => {
    // beforeEach(() => {
    //   Configuration.mockClear();
    //   OpenAIApi.mockClear();
    // });
  
    it('should generate an Excuse', async () => {
      await generateExcuse()
  
    //   expect(Configuration).toHaveBeenCalledTimes(1);
    //   expect(OpenAIApi).toHaveBeenCalledTimes(1);
    //   console.log(generateExcuse()); 
    //   expect(generateExcuse()).toHaveBeenCalledTimes(1);
      //console.log(createChatCompletion);
      //expect(createChatCompletion).toBe("I am late")
      //expect(OpenAIApi().createChatCompletion).toHaveBeenCalledTimes(1);
    });
  });
