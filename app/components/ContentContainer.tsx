"use client";
import React, { useState } from "react";
import MainCanvas from "./canvas/MainCanvas";
import MainControl from "./control/MainControl";

const ContentContainer = () => {
  const [metadata, setMetadata] = useState({
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
  });

  const [displayPrompt, setdisplayPrompt] = useState(false);

  return (
    <div className="flex h-screen">
      <MainCanvas metadata={metadata} displayPrompt={displayPrompt} />
      <MainControl
        setMetadata={setMetadata}
        metadata={metadata}
        setdisplayPrompt={setdisplayPrompt}
      />
    </div>
  );
};

export default ContentContainer;
