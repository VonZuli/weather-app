import "./style.css";
import { createElem } from "./scripts/factory";
import { parse, parseISO, toDate } from "date-fns";

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
    const forecast = createForecast(queryData);
    const weatherSecondaryInfo = createWeatherSecondaryInfo(
      queryData,
      windDirection
    );

    const weatherWarnings = createWeatherWarnings();
    mainContent.appendChild(weatherPrimaryInfo);
    weatherPrimaryInfo.appendChild(forecast);
    buildDailyForecast(queryData);

    forecast.appendChild(weatherWarnings);
    weatherPrimaryInfo.appendChild(weatherSecondaryInfo);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
})(buildDailyForecast, buildHourlyForecast);

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
const createForecast = (queryData) =>
  createElem(
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
              selectDisplay(e.target, queryData);
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
              selectDisplay(e.target, queryData);
            },
          },
          "HOURLY"
        )
      ),
      createElem("div", { class: "pagination-controls" }, {})
    ),
    createElem("div", { class: "weather-report_container" }, {})
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
function buildDailyForecast(queryData) {
  const dailyArr = [...queryData.days.slice(1, 8)];
  const weekday = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  document
    .querySelector(".weather-report_container")
    .appendChild(
      createElem(
        "div",
        { class: "slide_container active", "data-report": "daily" },
        {}
      )
    );

  dailyArr.forEach((i) => {
    const dayName = parseISO(i.datetime);

    let dailyReport = createElem(
      "div",
      { class: "forecast-daily", "data-day": dayName.getDay() },
      {},
      createElem("div", { class: "day" }, {}, weekday[dayName.getDay()]),
      createElem(
        "div",
        { class: "weather-data" },
        {},
        createElem(
          "h4",
          { class: "temp-high" },
          {},
          `${Math.round(i.tempmax)}`,
          createElem("sup", {}, {}, "°C")
        ),
        createElem(
          "h5",
          { class: "temp-low" },
          {},
          `${Math.round(i.tempmin)}`,
          createElem("sup", {}, {}, "°C")
        ),
        createElem("img", { class: "condition", src: sunSVG }, {})
      )
    );
    document.querySelector(".slide_container").appendChild(dailyReport);
  });
}

function buildHourlyForecast(queryData) {
  const now = Math.floor(Date.now() / 1000);
  const firstEpoch = queryData.days[0].hours[0].datetimeEpoch;
  const days = queryData.days;

  const frame = document.querySelector(".weather-report_container");
  const slideArr = [[], [], []];

  const currentDayHours = days[0].hours.filter((hr) => now < hr.datetimeEpoch);
  currentDayHours.forEach((hour, index) => {
    if (index < 8) {
      slideArr[0].push(hour);
    } else if (index < 16) {
      slideArr[1].push(hour);
    } else {
      slideArr[3].push(hour);
    }
  });

  for (let day of days.slice(1)) {
    if (now < day.datetimeEpoch) {
      const nextDayHours = day.hours.filter((hr) => now < hr.datetimeEpoch);
      nextDayHours.forEach((hour, index) => {
        if (slideArr[0].length < 8) {
          slideArr[0].push(hour);
        } else if (slideArr[1].length < 8) {
          slideArr[1].push(hour);
        } else if (slideArr[2].length < 8) {
          slideArr[2].push(hour);
        }
      });
      break;
    }
  }

  const sliderNavBtn = document.querySelectorAll(".slidernavBtn");
  document.querySelector(".pagination-controls").appendChild(
    createElem(
      "div",
      { class: "controls-wrapper" },
      {
        contextmenu: (e) => {
          e.preventDefault();
        },
      },
      createElem("img", { class: "controls page-left", src: leftArrowSVG }, {}),
      createElem("a", { class: "controls slidernavBtn" }, {}),
      createElem("a", { class: "controls slidernavBtn" }, {}),
      createElem("a", { class: "controls slidernavBtn" }, {}),
      createElem(
        "img",
        { class: " controls page-right", src: rightArrowSVG },
        {}
      )
    )
  );
  slideArr.forEach((_, index) => {
    const hourlyContainer = createElem(
      "div",
      {
        class: "slide_container",
        id: `slide-${index + 1}`,
        "data-report": "hourly",
      },
      {}
    );
    frame.appendChild(hourlyContainer);
  });

  sliderNavBtn.forEach((i, index) => {
    i.setAttribute("href", `#slide-${index + 1}`);
  });

  document.querySelector(".slide_container").classList.add("active");
  document.querySelector(".slidernavBtn").classList.add("active");

  const controls = document.querySelectorAll(".controls");
  controls.forEach((ctrl) => {
    ctrl.addEventListener("click", (e) => {
      const slides = document.querySelectorAll(".slide_container");
      const currentSlide = document.querySelector(".slide_container.active");
      const currentNavBtn = document.querySelector(".slidernavBtn.active");
      ctrl.classList.contains("page-left")
        ? (() => {
            if (currentSlide.id === "slide-1") {
              return;
            }
            const prevSlide = currentSlide.previousElementSibling;
            const prevNavBtn = currentNavBtn.previousElementSibling;
            currentNavBtn.classList.remove("active");
            currentSlide.classList.remove("active");
            prevNavBtn.classList.add("active");
            prevSlide.classList.add("active");
          })()
        : ctrl.classList.contains("page-right")
        ? (() => {
            if (currentSlide.id === "slide-3") {
              return;
            }
            const nextSlide = currentSlide.nextElementSibling;
            const nextNavBtn = currentNavBtn.nextElementSibling;
            currentNavBtn.classList.remove("active");
            currentSlide.classList.remove("active");
            nextNavBtn.classList.add("active");
            nextSlide.classList.add("active");
          })()
        : () => {
            currentSlide.classList.remove("active");
            currentNavBtn.classList.remove("active");
            slides.forEach((slide) => {
              if (slide.id === e.target.attributes.href.value.slice(1)) {
                e.target.classList.add("active");
                slide.classList.add("active");
              }
            });
          };
    });
  });

  const slideDiv = document.querySelectorAll("[data-report=hourly]");
  slideDiv.forEach((div, slideIndex) => {
    const slideData = slideArr[slideIndex];
    slideData.forEach((i, index) => {
      const timeName = i.datetime.split(":").slice(0, 2).join(":");
      let hourlyReport = createElem(
        "div",
        {
          class: "forecast-hourly",
          "data-hour": timeName,
        },
        {},
        createElem("div", { class: "hour" }, {}, `${timeName}`),
        createElem(
          "div",
          { class: "weather-data" },
          {},
          createElem(
            "h4",
            { class: "temp-high" },
            {},
            Math.round(i.temp),
            createElem("sup", {}, {}, "°C")
          ),
          createElem("img", { class: "condition", src: sunSVG }, {})
        )
      );
      if (slideIndex === 0 && index === 0) {
        const timeDiff = now - firstEpoch;
        const currentHourIndex = Math.floor(timeDiff / 3600);
        if (currentHourIndex < slideData.length) {
          hourlyReport = createElem(
            "div",
            {
              class: "forecast-hourly",
              "data-hour": timeName,
            },
            {},
            createElem("div", { class: "hour" }, {}, `${timeName}`),
            createElem(
              "div",
              { class: "weather-data" },
              {},
              createElem(
                "h4",
                { class: "temp-high" },
                {},
                Math.round(slideData[currentHourIndex].temp),
                createElem("sup", {}, {}, "°C")
              ),
              createElem("img", { class: "condition", src: sunSVG }, {})
            )
          );
        }
      }
      div.appendChild(hourlyReport);
    });
  });
}
//#endregion init
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
function selectDisplay(btn, queryData) {
  const rangeBtn = document.querySelector(".range-select_btn.active");
  const controls = document.querySelector(".controls-wrapper");
  const weatherReportContainer = document.querySelector(
    ".weather-report_container"
  );
  if (btn.classList.contains("active")) {
    return;
  }
  if (btn.id === "daily") {
    weatherReportContainer.innerHTML = "";
    controls.remove();
    buildDailyForecast(queryData);
  }
  if (btn.id === "hourly") {
    weatherReportContainer.innerHTML = "";

    buildHourlyForecast(queryData);
  }
  rangeBtn?.classList.remove("active");
  btn.classList.add("active");
}
