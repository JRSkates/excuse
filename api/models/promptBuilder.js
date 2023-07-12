class PromptBuilder {
  constructPrompt(excuseType = null, eonetEvent = null)  {
    let systemContent =  `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions: 
    - Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")`;
    let prompt = null

      if (excuseType != null && excuseType != "" && eonetEvent != null) {
        systemContent = systemContent + `\n    You will receive 2 User messages
        - The first user message you will receive will be the name or description of the event someone is trying to get out of.
        - For the second User Input you will receive the name of a recent natural disaster. This is from NASA's EONET API. Use this natural disaster as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted"
        Make sure you use both of the User messages in your response - the excuse must be getting you out of the 1st message, and it must incorporate the natural disaster given in the 2nd message`
        prompt = [
          {
            role: 'system',
            content: systemContent
          }, 
          {
            role: 'user',
            content: excuseType
          },
          {
            role: 'user',
            content: eonetEvent
          }
        ];
      } else if (excuseType != null && excuseType != "") {
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
    } else if (eonetEvent != null) {
      systemContent = systemContent + `\n    - As the User input, you will receive the name of a recent natural disaster. This is from NASA's EONET API. Use this natural disaster as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted"`
      prompt = [
        {
          role: 'system',
          content: systemContent
        }, 
        {
          role: 'user',
          content: eonetEvent
        }
      ];
    } else {
      prompt = [{
        role: 'system',
        content: systemContent
      }];
    }

    console.log(prompt)
    return prompt;
  }
}

module.exports = PromptBuilder;