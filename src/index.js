import "./style.css";
import { createElem } from "./scripts/factory";
import { parseISO } from "date-fns";

export const imagepath = (name) => images(name, true);

const mainContent = document.querySelector(".main-content");
const images = require.context("../src/assets/images", true);

const sunSVG = imagepath("./retrowave_sunset.svg");
const leftArrowSVG = imagepath("./left-arrow.svg");
const rightArrowSVG = imagepath("./right-arrow.svg");
const outrunGIF = imagepath("./outrun.gif");

//change to greeting with value based on ToD
let greeting = "GOOD MORNING";

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      return console.error("Location not supported.");
    }
  });
};
getUserLocation();
const reportArr = [];

async function initWeatherData(position) {
  let keyword = `${position.coords.latitude}, ${position.coords.longitude}`;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${keyword}?unitGroup=metric&key=5YWV9ZDBX4LKSZC48LHFQPNWH&contentType=json`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const address = await reverseGeo(position);
    const city = address.features[0].properties.city;

    const reportQuery = { city, weatherData };

    reportArr.push(reportQuery);

    return reportArr;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

async function reverseGeo(position) {
  let requestOptions = {
    method: "GET",
  };
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=4b7433811a1b4a3db441e403ffa40e9d`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

(async () => {
  try {
    const position = await getUserLocation();
    const populatedReportArr = await initWeatherData(position);
    console.log(populatedReportArr);

    const cityName = populatedReportArr[0].city;
    const queryData = populatedReportArr[0].weatherData;
    function getWindDirection(winddir) {
      if (winddir === 0 || winddir === 360) {
        return "N ⬆";
      }
      if (winddir > 0 && winddir < 90) {
        return "NE ↗";
      }
      if (winddir === 90) {
        return "E ➡";
      }
      if (winddir > 90 && winddir < 180) {
        return "SE ↘";
      }
      if (winddir === 180) {
        return "S ⬇";
      }
      if (winddir > 180 && winddir < 270) {
        return "SW ↙";
      }
      if (winddir === 270) {
        return "W ⬅";
      }
      if (winddir > 270 && winddir < 359) {
        return "NW ↖";
      }
    }
    const windDirection = getWindDirection(queryData.currentConditions.winddir);
    const weatherPrimaryInfo = createWeatherPrimaryInfo(cityName, queryData);
    const weatherSecondaryInfo = createWeatherSecondaryInfo(
      queryData,
      windDirection
    );
    const forecastDisplay = createForecastDisplay(queryData);
    const weatherWarnings = createWeatherWarnings();
    mainContent.appendChild(weatherPrimaryInfo);
    weatherPrimaryInfo.appendChild(forecast);
    const forecastDisplayReport = document.querySelector(
      ".report-type_container"
    );
    forecastDisplayReport.appendChild(forecastDisplay);
    forecast.appendChild(weatherWarnings);
    weatherPrimaryInfo.appendChild(weatherSecondaryInfo);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
})();

//#region init
const headerContainer = createElem(
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
      "form",
      { class: "location-form" },
      {
        submit: (e) => {
          e.preventDefault();
          getWeatherData();
        },
      },
      createElem(
        "input",
        {
          id: "search",
          class: "location-search_input",
          placeholder: "Search Location...",
        },
        {}
      ),
      createElem(
        "button",
        { class: "search_btn", type: "submit", form: "search" },
        {},
        // { click: getWeatherData },
        "SEARCH"
      )
    )
  ),
  createElem(
    "div",
    { class: "unit-toggle_container" },
    {},
    createElem("h3", { class: "unit-title" }, {}, "SELECT UNITS"),
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
mainContent.appendChild(headerContainer);

const createWeatherPrimaryInfo = (cityName, queryData) =>
  createElem(
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
          createElem("h2", { class: "location" }, {}, cityName),
          createElem(
            "img",
            { class: "weather-condition-icon", src: sunSVG },
            {}
          )
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
              createElem(
                "h3",
                { class: "date" },
                {},
                Date(queryData.currentConditions.datetime)
                  .split(" ")
                  .slice(1, 4)
                  .join(" ")
              ),
              createElem(
                "h5",
                { class: "time" },
                {},
                queryData.currentConditions.datetime
              )
            ),
            createElem(
              "h1",
              { class: "temperature" },
              {},
              `${Math.round(queryData.currentConditions.temp)}`,
              createElem("sup", { class: "large" }, {}, "°C")
            )
          ),

          createElem(
            "h2",
            { class: "weather-condition-description" },
            {},
            queryData.currentConditions.conditions
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
        { class: "range-select_btn active", id: "daily" },
        {
          click: (e) => {
            e.preventDefault();
            selectDisplay(e.target);
          },
        },
        "DAILY"
      ),
      createElem(
        "button",
        { class: "range-select_btn", id: "hourly" },
        {
          click: (e) => {
            e.preventDefault();
            selectDisplay(e.target);
          },
        },
        "HOURLY"
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
      { class: "report-type_container", "data-report": "daily" },
      {}
    )
  )
);

const createWeatherSecondaryInfo = (queryData, windDirection) =>
  createElem(
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
          createElem("h3", { class: "secondary-content " }, {}, "FEELS LIKE"),
          createElem(
            "h3",
            { class: "feels-like" },
            {},
            queryData.currentConditions.feelslike,
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
          createElem("h3", { class: " secondary-content " }, {}, "HUMIDITY"),
          createElem(
            "h3",
            { class: "humidity-index" },
            {},
            `${queryData.currentConditions.humidity}%`
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
          createElem("h3", { class: "secondary-content" }, {}, "P.O.P."),
          createElem(
            "h3",
            { class: "pop" },
            {},
            `${queryData.currentConditions.precipprob}%`
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
          createElem("h3", { class: "secondary-content " }, {}, "WIND SPEED"),
          createElem(
            "h3",
            { class: "wind-speed" },
            {},
            `${queryData.currentConditions.windspeed} KM/H`
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
          createElem(
            "h3",
            { class: "secondary-content" },
            {},
            "WIND DIRECTION"
          ),
          createElem("h3", { class: "wind-direction" }, {}, windDirection)
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

const createForecastDisplay = (queryData) =>
  // const search = document.querySelector("#search");
  // search.value = "";
  // console.log(cityName, queryData);
  // console.log(queryData.days);

  // let dailyArr = [...queryData.days.slice(1, 8)];
  // console.log(dailyArr);

  // const weekday = [
  //   "SUNDAY",
  //   "MONDAY",
  //   "TUESDAY",
  //   "WEDNESDAY",
  //   "THURSDAY",
  //   "FRIDAY",
  //   "SATURDAY",
  // ];

  // dailyArr.forEach((i) => {
  // const dayName = parseISO(i.datetime);
  // let dailyReport =

  createElem(
    "div",
    { class: "forecast-daily", "data-day": "date" },
    {},
    createElem("div", { class: "day" }, {}, `dayname`),
    createElem(
      "div",
      { class: "weather-data" },
      {},
      createElem(
        "h4",
        { class: "temp-high" },
        {},
        `${Math.round(25.6)}`,
        createElem("sup", {}, {}, "°C")
      ),
      createElem(
        "h5",
        { class: "temp-low" },
        {},
        `${Math.round(15.1)}`,
        createElem("sup", {}, {}, "°C")
      ),
      createElem("img", { class: "condition", src: sunSVG }, {})
    )
  );
// forecastDisplayReport.appendChild(dailyReport);
// });

const createWeatherWarnings = () =>
  createElem(
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

//#endregion init

//#region API call

const location = document.querySelector(".location");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const feelslike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity-index");
const pop = document.querySelector(".pop");
const windSpeed = document.querySelector(".wind-speed");
// const windDirection = document.querySelector(".wind-direction");
const temperature = document.querySelector(".temperature");
const weatherCondition = document.querySelector(
  ".weather-condition-description"
);
// const icon = document.querySelector(".weather-condition-icon");

// async function getWeatherData() {
//   let keyword = search.value;
//   const d = new Date();

//   try {
//     const response = await fetch(
//       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${keyword}?unitGroup=metric&key=5YWV9ZDBX4LKSZC48LHFQPNWH&contentType=json`,
//       { mode: "cors" }
//     );
//     const weatherData = await response.json();

//     location.textContent = weatherData.address;
//     weatherCondition.textContent = weatherData.currentConditions.conditions;

//     date.textContent = d.toDateString().split(" ").slice(1).join(" ");
//     time.textContent = weatherData.currentConditions.datetime;
//     temperature.textContent = `${Math.round(
//       weatherData.currentConditions.temp
//     )}`;

//     feelslike.textContent = weatherData.currentConditions.feelslike;
//     humidity.textContent = weatherData.currentConditions.humidity;
//     pop.textContent = weatherData.currentConditions.precipprob;
//     windSpeed.textContent = weatherData.currentConditions.windspeed;
//     windDirection.textContent = weatherData.currentConditions.winddir;

//     search.value = "";
//     console.log(keyword, weatherData);
//     console.log(weatherData.days);
//   } catch (error) {
//     console.error(`ERROR: ${error}`);
//   }
//   // setTimeout(() => {
//   //   // console.log(weatherData);
//   // }, 200);
// }

//#endregion API call

// function selectDisplay(btn) {
//   forecastDisplay.innerHTML = "";
//   forecastDisplay.dataset.report = btn.id;
//   document
//     .querySelector(".range-select_btn.active")
//     ?.classList.remove("active");
//   btn.classList.add("active");

//   let forecastReport = document.querySelector(".report-type_container");
//   forecastReport.dataset.report === "daily"
//     ? forecastReport.appendChild(dailyReport) &&
//       (controls.style.display = "none")
//     : forecastReport.appendChild(hourlyReport) &&
//       (controls.style.display = "flex");
// }

// let dailyReport = createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 0 },
//   {},
//   createElem("div", { class: "day" }, {}, "SUNDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// );

// let hourlyReport = createElem(
//   "div",
//   { class: "forecast-hourly", "data-hour": 0 },
//   {},
//   createElem("div", { class: "day" }, {}, "6 AM"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// );
// forecastDisplay.appendChild(dailyReport);

// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 0 },
//   {},
//   createElem("div", { class: "day" }, {}, "SUNDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 1 },
//   {},
//   createElem("div", { class: "day" }, {}, "MONDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 2 },
//   {},
//   createElem("div", { class: "day" }, {}, "TUESDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 3 },
//   {},
//   createElem("div", { class: "day" }, {}, "WEDNESDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 4 },
//   {},
//   createElem("div", { class: "day" }, {}, "THURSDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 5 },
//   {},
//   createElem("div", { class: "day" }, {}, "FRIDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// ),
// createElem(
//   "div",
//   { class: "forecast-daily", "data-day": 6 },
//   {},
//   createElem("div", { class: "day" }, {}, "SATURDAY"),
//   createElem(
//     "div",
//     { class: "weather-data" },
//     {},
//     createElem(
//       "h4",
//       { class: "temp-high" },
//       {},
//       25,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem(
//       "h5",
//       { class: "temp-low" },
//       {},
//       10,
//       createElem("sup", {}, {}, "°C")
//     ),
//     createElem("img", { class: "condition", src: sunSVG }, {})
//   )
// )
