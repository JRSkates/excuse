const PromptBuilder = require("../../models/promptBuilder.js")

describe('Prompt Builder class', () => {
  it('given no optional inputs, returns the basic prompt', () => {
    const builder = new PromptBuilder;

    expect(builder.constructPrompt()).toEqual([])
  })
});