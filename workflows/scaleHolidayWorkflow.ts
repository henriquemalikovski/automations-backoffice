import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SendMessage } from "../functions/sendMessage.ts";

async function getInfoHoliday() {
  const year = new Date().getFullYear();
  const response = await fetch(
    "https://brasilapi.com.br/api/feriados/v1/" + year,
  );
  const holidays = await response.json();

  let infoIsHoliday = {
    isHoliday: false,
    holidayName: "",
    holidayDate: "",
  };
  const today = new Date(2024, 4, 30);
  console.log("Hoje: ", today.toLocaleDateString());
  for (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);

    if (
      holidayDate.getUTCDate() == today.getUTCDate() &&
      holidayDate.getUTCMonth() == today.getUTCMonth()
    ) {
      infoIsHoliday = {
        isHoliday: true,
        holidayName: holiday.name,
        holidayDate: today.toLocaleDateString(),
      };
      break;
    }
  }
  console.log(infoIsHoliday);
  return infoIsHoliday;
}

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const SubmitIssueWorkflow = DefineWorkflow({
  callback_id: "submit_issue",
  title: "Submit an issue",
  description: "Submit an issue to the channel",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel"],
  },
});

const infoHoliday = await getInfoHoliday();

if (infoHoliday.isHoliday) {
  SubmitIssueWorkflow.addStep(
    SendMessage,
    {
      channel: SubmitIssueWorkflow.inputs.channel,
      message: "",
    },
  );
}

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
// SubmitIssueWorkflow.addStep(
//   PostIssueMessage,
//   {
//     channel: SubmitIssueWorkflow.inputs.channel,
//     submitting_user: inputForm.outputs.interactivity.interactor.id,
//     severity: inputForm.outputs.fields.severity,
//     description: inputForm.outputs.fields.description,
//     link: inputForm.outputs.fields.link,
//   },
// );

export default SubmitIssueWorkflow;
