data = {
  name: "🎧 Summarize Interview Audio",
  schema_version: "latest",
  metadata: {
    models: {
      "gpt-4": {
        model: "gpt-4",
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
      },
    },
    parameters: {},
  },
  prompts: [
    {
      name: "script_gen",
      input: "{{transcript.output}}",
      metadata: {
        model: {
          name: "gpt-4",
          settings: {
            temperature: 0,
            system_prompt:
              "Your instructions are to:\n1. Separate the speakers in the conversation below between James (interviewer) and Dez (interviewee)\n2. Remove filler words but keep transcript the same. \n3. Bold each speaker in markdown",
          },
        },
        parameters: {},
        remember_chat_context: true,
      },
    },
    {
      name: "media_gen",
      input: "{{script_gen.output}}",
      metadata: {
        model: {
          name: "gpt-4",
          settings: {
            temperature: 1,
            system_prompt:
              'Your instructions are to:\n1. Create a title and summary of the interview for a fintech newsletter. \n2. Tone is professional and concise. \n3. Bold the title of the article in the markdown. Italicize the summary. \n\nDo not write "Title" in output.',
          },
        },
        parameters: {},
        remember_chat_context: true,
      },
    },
    {
      name: "casual_gen",
      input: "{{script_gen.output}}",
      metadata: {
        model: {
          name: "gpt-4",
          settings: {
            temperature: 1,
            system_prompt:
              'Your instructions are to:\n1. Create a title and summary of the interview for a fintech newsletter. \n2. Tone is casual podcast and concise. \n3. Bold the title of the article in the markdown. Italicize the summary. \n\nDo not write "Title" in output',
          },
        },
        parameters: {},
        remember_chat_context: true,
      },
    },
    {
      name: "Prompt_4",
      input: "{{script_gen.output}}",
      metadata: {
        model: {
          name: "gpt-4",
          settings: {
            temperature: 1,
            system_prompt:
              "Provide a summary in bullet points. Be professional. ",
          },
        },
        parameters: {},
        remember_chat_context: true,
      },
    },
  ],
};

function parse() {
  let output = [];
  let prompts = data.prompts;
  for (let i = 0; i < prompts.length; i++) {
    let prompt = prompts[i];
    let prompt_name = prompt.name;
    let prompt_input = prompt.input;
    let prompt_metadata = prompt.metadata;
    let prompt_model = prompt_metadata.model;
    let prompt_settings = prompt_model.settings;
    let prompt_temperature = prompt_settings.temperature;
    let prompt_system_prompt = prompt_settings.system_prompt;
    let prompt_parameters = prompt_metadata.parameters;
    let prompt_remember_chat_context = prompt_metadata.remember_chat_context;
    output.push({
      name: prompt_name,
      input: prompt_input,
      metadata: {
        model: {
          name: prompt_model.name,
          settings: {
            temperature: prompt_temperature,
            system_prompt: prompt_system_prompt,
          },
        },
        parameters: prompt_parameters,
        remember_chat_context: prompt_remember_chat_context,
      },
    });
  }
  return output;
}

console.log(parse());
