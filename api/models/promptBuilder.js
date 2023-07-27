class PromptBuilder {
  constructor() {
    this.prompt = [
      {
        role: "system",
        content: `Your purpose is to be an Excuse Generator. You should provide an example of a funny, creative and outlandish excuse to not attend something. Please follow the following instructions:\n- Provide an example of a funny, creative and outlandish excuse to not attend something. This excuse should be up to 5 lines long. Don't put it in quotations. Make sure the responses are in the First Person ("I can't make it")\nYou may receive additional prompts from Users with instructions, Make sure you use all of the User prompts in your response, with the desired behaviour.`
      },
    ]
  }
  constructPrompt(excuseType = null, eonetEvent = null) {

    if (excuseType) {
      let excuseTypePrompt = {
        role: "user",
        content: `The text delimited by triple quotes is the name or description of the event someone is trying to get out of.  Make sure to incorporate this input into the excuse.\n“”"${excuseType}”""` 
      }
      this.prompt.push(excuseTypePrompt)
    }

    if (eonetEvent) {
      let eonetPrompt = {
        role: "user",
        content: `The text delimited by triple quotes is the name of a recent natural event. Use this natural event as PART of your excuse. For example if the input was a Volcano you could say "I can't make it because this volcano erupted". Make sure to incorporate this input into the excuse.\n“”"${eonetEvent}”“”`
      }
      this.prompt.push(eonetPrompt)
    }

    console.log(this.prompt);
    return this.prompt;
  }
}

module.exports = PromptBuilder;

// This new version of the builder allows us to scale this up 
// a lot more effectively.