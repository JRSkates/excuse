require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const generateExcuse = async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Can you give me an excuse to get out of an event?' }]
  });

  //console.log(chatCompletion.data.choices);
  console.log(chatCompletion.data.choices[0].message.content);
};

generateExcuse();

module.exports = generateExcuse();
