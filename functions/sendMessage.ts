import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";

export const SendMessage = DefineFunction({
  callback_id: "send_message",
  title: "Post a message to channel",
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

export default SlackFunction(SendMessage, async ({ inputs, client }) => {
  const { channel, message } = inputs;

  await client.chat.postMessage({
    channel: "C073QBWCHBR",
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${message}`,
      },
    }],
  });

  return { outputs: [channel] };
});
