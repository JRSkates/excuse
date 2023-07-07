require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const ExcuseController = {
    generateExcuse: async (req, res) => {
      try {
      const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Can you give me an example of a fake excuse that no one would believe' }]
    });

    //console.log(chatCompletion.data.choices);
    console.log(chatCompletion.data.choices[0].message.content);
    return res.status(200).json({excuse: chatCompletion.data.choices[0].message.content})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Failed to generate excuse.'})
  }
}
}

//ExcuseController.generateExcuse();

module.exports = ExcuseController;
