import "./style.css";
import { createElem } from "./scripts/factory";

const mainContent = document.querySelector(".main-content");
const images = require.context("../src/assets/images", true);

export const imagepath = (name) => images(name, true);

const sunSVG = imagepath("./retrowave_sunset.svg");
const searchSVG = imagepath("./search.svg");
const leftArrowSVG = imagepath("./left-arrow.svg");
const rightArrowSVG = imagepath("./right-arrow.svg");
const outrunGIF = imagepath("./outrun.gif");
//change to greeting with value based on ToD
let greeting = "GOOD MORNING";

let headerContainer = createElem(
  "div",
  { class: "header" },
  {},
  createElem(
    "div",
    { class: "header_container" },
    {},
    createElem("h2", { class: "greeting" }, {}, "HELLO THERE, "),
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
    createElem(
      "button",
      { class: "search_btn" },
      {},
      createElem("img", { src: searchSVG }, {})
    )
  ),
  createElem(
    "div",
    { class: "unit-toggle_container" },
    {},
    createElem("h3", { class: "unit-title" }, {}, "Select Units"),
    createElem(
      "div",
      { class: "unit-toggle_wrapper" },
      {},
      createElem("p", { class: "celsius" }, {}, "°C"),
      createElem(
        "label",
        { class: "switch" },
        {},
        createElem("input", { class: "unit-toggle", type: "checkbox" }, {}),
        createElem("span", { class: "slider" }, {})
      ),
      createElem("p", { class: "fahrenheit" }, {}, "°F")
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
        createElem("h2", { class: "location" }, {}, "MIAMI"),
        createElem("img", { class: "weather-condition-icon", src: sunSVG }, {})
      ),
      createElem(
        "div",
        { class: "general-bottom_wrapper" },
        {},
        createElem(
          "div",
          { class: "flex-wrapper" },
          {},
          createElem(
            "div",
            { class: "flex-sub-wrapper" },
            {},
            createElem("h3", { class: "date" }, {}, "JULY 4th, 1986"),
            createElem("h5", { class: "time" }, {}, "07:35:49")
          ),
          createElem(
            "h1",
            { class: "temperature" },
            {},
            25,
            createElem("sup", { class: "large" }, {}, "°C")
          )
        ),

        createElem(
          "h2",
          { class: "weather-condition-description" },
          {},
          "SUNSHINE"
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
        "HOURLY"
      ),
      createElem(
        "button",
        { class: "range-select_btn", id: "daily" },
        {},
        "DAILY"
      )
    ),
    createElem(
      "div",
      { class: "daily-pagination-controls" },
      {},
      createElem(
        "div",
        { class: "controls-wrapper" },
        {},
        createElem("img", { class: "page-left", src: leftArrowSVG }, {}),
        createElem("div", { class: "dot active" }, {}),
        createElem("div", { class: "dot" }, {}),
        createElem("div", { class: "dot" }, {}),
        createElem("img", { class: "page-right", src: rightArrowSVG }, {})
      )
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
        "SUNDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "MONDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "TUESDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "WEDNESDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "THURSDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "FRIDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      ),
      createElem(
        "div",
        { class: "day" },
        {},
        "SATURDAY",
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            25,
            createElem("sup", {}, {}, "°C")
          ),
          createElem(
            "h5",
            { class: "temp-low" },
            {},
            10,
            createElem("sup", {}, {}, "°C")
          ),
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
    createElem(
      "div",
      { class: "secondary-info-flex-wrapper" },
      {},
      createElem("img", { class: "secondary-svg", src: sunSVG }, {}),
      createElem(
        "div",
        { class: "secondary-content-wrapper" },
        {},
        createElem("h3", { class: "feels-like" }, {}, "FEELS LIKE"),
        createElem(
          "h3",
          { class: "secondary-content" },
          {},
          21,
          createElem("sup", {}, {}, "°C")
        )
      )
    ),
    createElem(
      "div",
      { class: "secondary-info-flex-wrapper" },
      {},
      createElem("img", { class: "secondary-svg", src: sunSVG }, {}),
      createElem(
        "div",
        { class: "secondary-content-wrapper" },
        {},
        createElem("h3", { class: "humidity-index" }, {}, "HUMIDITY"),
        createElem("h3", { class: "secondary-content" }, {}, "68 %")
      )
    ),
    createElem(
      "div",
      { class: "secondary-info-flex-wrapper" },
      {},
      createElem("img", { class: "secondary-svg", src: sunSVG }, {}),
      createElem(
        "div",
        { class: "secondary-content-wrapper" },
        {},
        createElem("h3", { class: "pop" }, {}, "P.O.P."),
        createElem("h3", { class: "secondary-content" }, {}, "0 %")
      )
    ),
    createElem(
      "div",
      { class: "secondary-info-flex-wrapper" },
      {},
      createElem("img", { class: "secondary-svg", src: sunSVG }, {}),
      createElem(
        "div",
        { class: "secondary-content-wrapper" },
        {},
        createElem("h3", { class: "wind-speed" }, {}, "WIND SPEED"),
        createElem("h3", { class: "secondary-content" }, {}, "3.2 KMh")
      )
    ),
    createElem(
      "div",
      { class: "secondary-info-flex-wrapper" },
      {},
      createElem("img", { class: "secondary-svg", src: sunSVG }, {}),
      createElem(
        "div",
        { class: "secondary-content-wrapper" },
        {},
        createElem("h3", { class: "wind-direction" }, {}, "WIND DIRECTION"),
        createElem("h3", { class: "secondary-content" }, {}, "SW ↙")
      )
    )
  ),
  createElem(
    "div",
    { class: "gif-container" },
    {},
    createElem("img", { class: "outrunGIF", src: outrunGIF }, {})
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
forecast.appendChild(weatherWarnings);
weatherPrimaryInfo.appendChild(weatherSecondaryInfo);
