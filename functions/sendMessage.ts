import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const SendMessage = DefineFunction({
  callback_id: "send_message",
  title: "Post a message to channel",
  description: "Send a message to a channel with holiday information",
  source_file: "functions/sendMessage.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      message: {
        type: Schema.types.string,
        description: "Message to send",
      },
    },
    required: ["channel"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  SendMessage,
  async ({ inputs, client }) => {
    const { channel, message } = inputs;
    // Send a message to channel using a nicely formatted
    // message using block elements from Block Kit.
    // https://api.slack.com/block-kit
    await client.chat.postMessage({
      channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${message}`,
          },
        },
      ],
    });

    // Return all inputs as outputs for consumption in subsequent functions
    return {
      outputs: { channel },
    };
  },
);
