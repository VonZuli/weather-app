import "./style.css";
import { createElem } from "./scripts/factory";

const mainContent = document.querySelector(".main-content");
const images = require.context("../src/assets/images", true);

export const imagepath = (name) => images(name, true);

const sunSVG = imagepath("./retrowave_sunset.svg");

//change to greeting with value based on ToD
let greeting = "Good Morning";

let headerContainer = createElem(
  "div",
  { class: "header" },
  {},
  createElem(
    "div",
    { class: "header_container" },
    {},
    createElem("h2", { class: "greeting" }, {}, "Hello there, "),
    createElem("span", { class: "tod-greeting" }, {}, `${greeting}`)
  ),
  createElem(
    "div",
    { class: "search-bar_container" },
    {},
    createElem(
      "input",
      { class: "location-search_input", placeholder: "Search Location..." },
      {}
    ),
    createElem("button", { class: "search_btn" }, {}, "🔍")
  ),
  createElem(
    "div",
    { class: "unit-toggle_wrapper" },
    {},
    createElem(
      "div",
      { class: "unit-controls" },
      {},
      createElem("label", { class: "units-lbl" }, {}, "Select units")
    ),
    createElem(
      "div",
      { class: "toggle-content" },
      {},
      createElem("p", { class: "celsius" }, {}, "℃"),
      createElem("input", { class: "units-toggle", type: "checkbox" }, {}),
      createElem("p", { class: "fahrenheit" }, {}, "℉")
    )
  )
);

const weatherPrimaryInfo = createElem(
  "div",
  { class: "primary-info_container" },
  {},
  createElem(
    "div",
    { class: "current-weather_container" },
    {},
    createElem(
      "div",
      { class: "general-info_container" },
      {},
      createElem(
        "div",
        { class: "general-top_wrapper" },
        {},
        createElem("h2", { class: "location" }, {}, "Location"),
        createElem("h3", { class: "date" }, {}, "Date"),
        createElem("h5", { class: "time" }, {}, "Time")
      ),
      createElem(
        "div",
        { class: "general-bottom_wrapper" },
        {},
        createElem(
          "div",
          { class: "flex-wrapper" },
          {},
          createElem("h1", { class: "temperature" }, {}, "Temp"),
          createElem(
            "img",
            { class: "weather-condition-icon", src: sunSVG },
            {}
          )
        ),
        createElem(
          "h2",
          { class: "weather-condition-description" },
          {},
          "Description"
        )
      )
    )
  )
);
const forecast = createElem(
  "div",
  { class: "forecast_container" },
  {},
  createElem(
    "div",
    { class: "forecast-controls" },
    {},
    createElem(
      "div",
      { class: "forecast-range-select" },
      {},
      createElem(
        "button",
        { class: "range-select_btn", id: "hourly" },
        {},
        "Hourly"
      ),
      createElem(
        "button",
        { class: "range-select_btn", id: "daily" },
        {},
        "Daily"
      )
    ),
    createElem(
      "div",
      { class: "daily-pagination-controls" },
      {},
      createElem("div", { class: "control_left" }, {}, "◀"),
      createElem("div", { class: "dot" }, {}, "🔴"),

      createElem("div", { class: "dot" }, {}, "⭕"),
      createElem("div", { class: "dot" }, {}, "⭕"),
      createElem("div", { class: "control_right" }, {}, "▶")
    )
  ),
  createElem(
    "div",
    { class: "weather-report_container" },
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
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
          createElem("h4", { class: "temp-high" }, {}, "High"),
          createElem("h5", { class: "temp-low" }, {}, "Low"),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      )
    )
  )
);

const weatherSecondaryInfo = createElem(
  "div",
  { class: "secondary-weather-info_container" },
  {},
  createElem(
    "div",
    { class: "secondary-weather_container" },
    {},
    createElem("h3", { class: "feels-like" }, {}, "Feels Like"),
    createElem("h3", { class: "humidity-index" }, {}, "Humidity"),
    createElem("h3", { class: "pop" }, {}, "P.O.P."),
    createElem("h3", { class: "wind-speed" }, {}, "Wind Speed"),
    createElem("h3", { class: "wind-direction" }, {}, "Wind Direction")
  )
);

const weatherWarnings = createElem(
  "div",
  { class: "extreme-weather_container" },
  {},
  createElem(
    "h2",
    { class: "extreme-weather-title" },
    {},
    "Extreme Weather Alerts"
  ),
  createElem(
    "p",
    { class: "extreme-weather-content" },
    {},
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tempora consequuntur deleniti autem, repudiandae quaerat, delectus dolorem ab soluta repellendus, nemo tenetur dignissimos quis harum. Atque saepe iste consectetur error."
  )
);
mainContent.appendChild(headerContainer);
mainContent.appendChild(weatherPrimaryInfo);
weatherPrimaryInfo.appendChild(forecast);
weatherPrimaryInfo.appendChild(weatherSecondaryInfo);
mainContent.appendChild(weatherWarnings);
