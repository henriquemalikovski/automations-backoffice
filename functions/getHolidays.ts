import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const GetHolidaysDefinition = DefineFunction({
  callback_id: "get_holidays",
  title: "Get Holidays Dates",
  description: "Get the holidays in the year",
  source_file: "functions/getHolidays.ts",
  output_parameters: {
    properties: {
      textScaleHoliday: {
        type: Schema.types.string,
        description: "Return if today is a holiday",
      },
    },
    required: ["textScaleHoliday"],
  },
});

export default SlackFunction(GetHolidaysDefinition, async () => {
  const holidays = [
    { "date": "2024-01-20", "name": "São Sebastião" },
    { "date": "2024-02-13", "name": "Carnaval" },
    { "date": "2024-03-29", "name": "Paixão" },
    { "date": "2024-04-21", "name": "Tiradentes" },
    { "date": "2024-05-01", "name": "Dia do Trabalho" },
    { "date": "2024-05-30", "name": "Corpus Christi" },
    { "date": "2024-07-25", "name": "Dia do Colono e Motorista" },
    { "date": "2024-09-07", "name": "Independência do Brasil" },
    { "date": "2024-09-20", "name": "Revolução Farroupilha" },
    { "date": "2024-11-02", "name": "Finados" },
    { "date": "2024-11-15", "name": "Proclamação da República" },
    { "date": "2024-11-20", "name": "Dia da Consciência Negra" },
    { "date": "2024-12-25", "name": "Natal" },
  ];

  let textScaleHoliday = "";
  const today = new Date(2024, 6, 25);

  for await (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);

    if (
      holidayDate.getUTCDate() == today.getUTCDate() &&
      holidayDate.getUTCMonth() == today.getUTCMonth()
    ) {
      textScaleHoliday =
        "Bom dia super time <!here> segue listinha pra registrar nossas jornadas de H.E pro feriado dia " +
        today.toLocaleDateString() + " (" + holiday.name + ") " +
        "\n 06h as 15h -" +
        "\n 09h as 18h -" +
        "\n 13h as 22h -" +
        "\n 13h as 22h -" +
        "\n 22h as 06h -" +
        "\nSe tiver mais gente interessado, eu vejo a viabilidade de liberar mais H.Es";
      break;
    }
  }

  return { outputs: { textScaleHoliday } };
});
