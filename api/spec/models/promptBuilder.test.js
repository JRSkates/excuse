const PromptBuilder = require("../../models/promptBuilder.js")

describe('Prompt Builder class', () => {
  it('given no optional inputs, returns the basic prompt', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")`
    expect(builder.constructPrompt()).toEqual([
      {
        role: 'system',
        content: systemContent
      }
    ])
  })

  it('given an event description, returns the prompt with event description', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")
    - As a User input, you will receive the name or description of the event someone is trying to get out of.  Make sure to incorporate this input into the excuse.`
    expect(builder.constructPrompt('my sons birthday')).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: 'my sons birthday'
      }
    ])
  })

  it("given an EONET Natural Event, it returns the prompt with EONET title/description", () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")
    - As the User input, you will receive the name of a recent natural disaster. This is from NASA's EONET API. Use this natural disaster as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted"`
    expect(builder.constructPrompt(null, "Earthquake")).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: 'Earthquake'
      }
    ])
  })

  it('given both an event description and an EONET event it should return a prompt with both elements included', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")
    You will receive 2 User messages
        - The first user message you will receive will be the name or description of the event someone is trying to get out of.
        - For the second User Input you will receive the name of a recent natural disaster. This is from NASA's EONET API. Use this natural disaster as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted"
        Make sure you use both of the User messages in your response - the excuse must be getting you out of the 1st message, and it must incorporate the natural disaster given in the 2nd message`
    expect(builder.constructPrompt('my sons birthday', "Earthquake")).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: 'my sons birthday'
      },
      { 
        role: 'user',
        content: 'Earthquake'
      }
    ])
  })
});