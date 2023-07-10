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
      messages: [
        {role: 'system', content: `
        You will receive a description an event.
        Return a fake excuse that no one would believe that the describer of the event can use to get out of it. Make it funny.
        If you do not receive a description, please return an excuse with the same constraints which can be used for any event.
        `},
        { role: 'user', content: `${req.query.eventType}` },
      ]
    });
    
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

// original prompt:

// Can you give me an example of a fake excuse that no one would believe