import { Manifest } from "deno-slack-sdk/mod.ts";
import { NextFourSundaysDefinition } from "./functions/nextFourSundays.ts";
import { GetHolidaysDefinition } from "./functions/getHolidays.ts";
import ScaleHolidayWorkflow from "./workflows/scaleHolidayWorkflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "automations-backoffice",
  description: "Functions to automate backoffice tasks",
  icon: "assets/default_new_app_icon.png",
  functions: [
    NextFourSundaysDefinition,
    GetHolidaysDefinition,
  ],
  workflows: [ScaleHolidayWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
