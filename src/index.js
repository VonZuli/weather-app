import "./style.css";
import { createElem } from "./scripts/factory";

const mainContent = document.querySelector(".main-content");
let username = "Mike";

let content = createElem(
  "div",
  { class: "header" },
  {},
  createElem(
    "div",
    { class: "greeting-wrapper" },
    {},
    createElem("h2", { class: "greeting" }, {}, "Hello there, "),
    createElem("span", { class: "username-greeting" }, {}, `${username}`)
  ),
  createElem(
    "div",
    { class: "unit-toggle-wrapper" },
    {},
    createElem("label", { class: "units-lbl" }, {}, "Select units:"),
    createElem("input", { class: "units-toggle", type: "checkbox" }, {})
  )
);

const report = createElem(
  "div",
  { class: "weather-report-container" },
  {},
  createElem(
    "div",
    { class: "weekly" },
    {},
    createElem(
      "div",
      { class: "day" },
      {},
      "Sunday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Monday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Tuesday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Wednesday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Thursday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Friday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    ),
    createElem(
      "div",
      { class: "day" },
      {},
      "Saturday",
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem("h4", { class: "temp" }, {}, "Temp:")
      )
    )
  )
);
mainContent.appendChild(content);
mainContent.appendChild(report);
// createElem("div",{class:"sun"},{}, "Sunday")
