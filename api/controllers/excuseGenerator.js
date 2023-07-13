require("dotenv").config();
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const PromptBuilder = require("../models/promptBuilder");

const ExcuseController = {
  generateExcuse: async (req, res) => {
    const promptBuilder = new PromptBuilder();
    try {
      const eventType = req.query.eventType;
      let eonetEvent = null;

      if (req.query.toggle === "true") {
        const eonetResponse = await axios.get(
          "https://eonet.gsfc.nasa.gov/api/v3/events"
        );
        const events = eonetResponse.data.events;
        eonetEvent = events[0].title;
        console.log(eonetEvent);
      }
      let messages = promptBuilder.constructPrompt(eventType, eonetEvent);

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });

      console.log(chatCompletion.data.choices[0].message.content);
      return res
        .status(200)
        .json({ excuse: chatCompletion.data.choices[0].message.content });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to generate excuse." });
    }
  },
};

module.exports = ExcuseController;
