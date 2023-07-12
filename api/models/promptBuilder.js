class PromptBuilder {
  constructPrompt(excuseType = null) {
    let systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")`;
    
    let prompt = [{
      role: 'system',
      content: systemContent
    }];

    if (excuseType ) {
      systemContent = systemContent + `\n    - As a User input, you will receive the name or description of the event someone is trying to get out of.  Make sure to incorporate this input into the excuse.`
      prompt = [
        {
          role: 'system',
          content: systemContent
        }, 
        {
          role: 'user',
          content: excuseType
        }
      ];
    }

    return prompt;
  }
}

module.exports = PromptBuilder;