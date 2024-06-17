import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const GetHolidaysDefinition = DefineFunction({
  callback_id: "get_holidays",
  title: "Get Holidays Dates",
  description: "Get the holidays in the year",
  source_file: "functions/getHolidays.ts",
  output_parameters: {
    properties: {
      todayIsHoliday: {
        type: Schema.types.string,
        description: "Return if today is a holiday",
      },
    },
    required: ["todayIsHoliday"],
  },
});

export default SlackFunction(GetHolidaysDefinition, async () => {
  const year = new Date().getFullYear();
  const response = await fetch(
    "https://brasilapi.com.br/api/feriados/v1/" + year,
  );
  const holidays = await response.json();

  let isHoliday = false;
  for (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);
    const today = new Date();
    if (
      holidayDate.getDate() == today.getDate() &&
      holidayDate.getMonth() == today.getMonth()
    ) {
      isHoliday = true;
    }
  }
  console.log(isHoliday);

  const todayIsHoliday = isHoliday ? "Yes" : "No";

  return { outputs: { todayIsHoliday } };
});
