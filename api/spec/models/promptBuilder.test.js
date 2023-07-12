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
});