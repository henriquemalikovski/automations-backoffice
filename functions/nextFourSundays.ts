import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const NextFourSundaysDefinition = DefineFunction({
  callback_id: "next_four_sundays",
  title: "Next Four Sundays",
  description: "Get the dates of the next four Sundays",
  source_file: "functions/nextFourSundays.ts",
  output_parameters: {
    properties: {
      textScaleFourSundays: {
        type: Schema.types.string,
        description: "The dates of the next four Sundays",
      },
    },
    required: ["textScaleFourSundays"],
  },
});

export default SlackFunction(NextFourSundaysDefinition, () => {
  const sundays = [];
  const date = new Date();

  for (let x = 0; x <= 28; x++) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() == 0) {
      sundays.push(
        date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        }),
      );
    }
  }

  const txtFolga = `\nFolga:\nFolga:\n`;
  let textScaleFourSundays = "";
  for (let i = 0; i < sundays.length; i++) {
    textScaleFourSundays = textScaleFourSundays +
      `Domingo: ${sundays[i]} ${txtFolga}`;
  }
  return { outputs: { textScaleFourSundays } };
});
