const PromptBuilder = require("../../models/promptBuilder.js")

describe('Prompt Builder class', () => {
  it('given no optional inputs, returns the basic prompt', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions:\n- Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")\nYou may receive additional prompts from Users with instructions, Make sure you use all of the User prompts in your response, with the desired behaviour.`
    expect(builder.constructPrompt()).toEqual([
      {
        role: 'system',
        content: systemContent
      }
    ])
  })

  it('given an event description, returns the prompt with event description', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions:\n- Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")\nYou may receive additional prompts from Users with instructions, Make sure you use all of the User prompts in your response, with the desired behaviour.`
    expect(builder.constructPrompt('my sons birthday')).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: `The text delimited by triple quotes is the name or description of the event someone is trying to get out of.  Make sure to incorporate this input into the excuse.\n“”"my sons birthday”""`
      }
    ])
  })

  it("given an EONET Natural Event, it returns the prompt with EONET title/description", () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions:\n- Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")\nYou may receive additional prompts from Users with instructions, Make sure you use all of the User prompts in your response, with the desired behaviour.`
    expect(builder.constructPrompt(null, "Earthquake")).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: `The text delimited by triple quotes is the name of a recent natural event. Use this natural event as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted". Make sure to incorporate this input into the excuse.\n“”"Earthquake”“”`
      }
    ])
  })

  it('given both an event description and an EONET event it should return a prompt with both elements included', () => {
    const builder = new PromptBuilder;
    const systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions:\n- Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")\nYou may receive additional prompts from Users with instructions, Make sure you use all of the User prompts in your response, with the desired behaviour.`
    expect(builder.constructPrompt('my sons birthday', "Earthquake")).toEqual([
      {
        role: 'system',
        content: systemContent
      },
      { 
        role: 'user',
        content: `The text delimited by triple quotes is the name or description of the event someone is trying to get out of.  Make sure to incorporate this input into the excuse.\n“”"my sons birthday”""`
      },
      { 
        role: 'user',
        content: `The text delimited by triple quotes is the name of a recent natural event. Use this natural event as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted". Make sure to incorporate this input into the excuse.\n“”"Earthquake”“”`
      }
    ])
  })
});
