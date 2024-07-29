(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["index"],{

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/images sync recursive ^\\.\\/.*$":
/*!******************************************!*\
  !*** ./src/assets/images/ sync ^\.\/.*$ ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./compass.svg": "./src/assets/images/compass.svg",
	"./humidity.svg": "./src/assets/images/humidity.svg",
	"./left-arrow.svg": "./src/assets/images/left-arrow.svg",
	"./outrun.gif": "./src/assets/images/outrun.gif",
	"./retrowave_cloud.svg": "./src/assets/images/retrowave_cloud.svg",
	"./retrowave_fog.svg": "./src/assets/images/retrowave_fog.svg",
	"./retrowave_moon-cloud.svg": "./src/assets/images/retrowave_moon-cloud.svg",
	"./retrowave_moon.svg": "./src/assets/images/retrowave_moon.svg",
	"./retrowave_rain.svg": "./src/assets/images/retrowave_rain.svg",
	"./retrowave_snow.svg": "./src/assets/images/retrowave_snow.svg",
	"./retrowave_storm.svg": "./src/assets/images/retrowave_storm.svg",
	"./retrowave_sun-cloud.svg": "./src/assets/images/retrowave_sun-cloud.svg",
	"./retrowave_sun-showers.svg": "./src/assets/images/retrowave_sun-showers.svg",
	"./retrowave_sunset.svg": "./src/assets/images/retrowave_sunset.svg",
	"./right-arrow.svg": "./src/assets/images/right-arrow.svg",
	"./speed.svg": "./src/assets/images/speed.svg",
	"./temp_half.svg": "./src/assets/images/temp_half.svg",
	"./umbrella.svg": "./src/assets/images/umbrella.svg",
	"./vector-grid.png": "./src/assets/images/vector-grid.png"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/images sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   imagepath: () => (/* binding */ imagepath)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _scripts_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/factory */ "./src/scripts/factory.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/parseISO.mjs");




const imagepath = (name) => images(name, true);

const mainContent = document.querySelector(".main-content");
const images = __webpack_require__("./src/assets/images sync recursive ^\\.\\/.*$");

const sunSVG = imagepath("./retrowave_sunset.svg");
const cloudSVG = imagepath("./retrowave_cloud.svg");
const fogSVG = imagepath("./retrowave_fog.svg");
const rainSVG = imagepath("./retrowave_rain.svg");
const snowSVG = imagepath("./retrowave_snow.svg");
const stormSVG = imagepath("./retrowave_storm.svg");
const sunCloudSVG = imagepath("./retrowave_sun-cloud.svg");
const sunShowersSVG = imagepath("./retrowave_sun-showers.svg");
const leftArrowSVG = imagepath("./left-arrow.svg");
const rightArrowSVG = imagepath("./right-arrow.svg");
const compassSVG = imagepath("./compass.svg");
const speedSVG = imagepath("./speed.svg");
const humiditySVG = imagepath("./humidity.svg");
const umbrellaSVG = imagepath("./umbrella.svg");
const tempSVG = imagepath("./temp_half.svg");
const outrunGIF = imagepath("./outrun.gif");

//change to greeting with value based on ToD
let greeting = () => {
  let date = new Date().toString();
  let currentTime = +date.split(" ").slice(4, 5)[0].split(":")[0];
  if (currentTime >= 3 && currentTime < 12) {
    return "Good Morning";
  }
  if (currentTime >= 12 && currentTime < 17) {
    return "Good Afternoon";
  }
  if (currentTime >= 17 && currentTime < 23) {
    return "Good Evening";
  }
  if (currentTime >= 0 && currentTime < 3) {
    return "Burning the midnight oil.";
  }
};
greeting();
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      return console.error("Location not supported.");
    }
  });
};

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

async function initWeatherData(keyword) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${keyword}?unitGroup=metric&key=5YWV9ZDBX4LKSZC48LHFQPNWH&contentType=json`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    let city = keyword;
    if (!isNaN(parseFloat(keyword.split(",")[0]))) {
      const position = {
        coords: {
          latitude: parseFloat(keyword.split(",")[0]),
          longitude: parseFloat(keyword.split(",")[1]),
        },
      };
      const address = await reverseGeo(position);
      city = address.features[0].properties.city;
    }

    const reportQuery = { city, weatherData };

    const cityName = reportQuery.city;
    const queryData = reportQuery.weatherData;

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
    function getWeatherCondition(currentCondition) {
      if (
        currentCondition === "clear-day" ||
        currentCondition === "clear-night"
      ) {
        return sunSVG;
      }
      if (
        currentCondition === "partly-cloudy-day" ||
        currentCondition === "partly-cloudy-night"
      ) {
        return sunCloudSVG;
      }
      if (currentCondition === "cloudy") {
        return cloudSVG;
      }
      if (currentCondition === "fog") {
        return fogSVG;
      }
      if (currentCondition === "rain") {
        return rainSVG;
      }
      if (currentCondition === "snow") {
        return snowSVG;
      }
      if (
        currentCondition === "thunder-rain" ||
        currentCondition === "thunder- showers-day" ||
        currentCondition === "thunder-showers-night"
      ) {
        return stormSVG;
      }
      console.log(current);
    }

    const weatherConditions = getWeatherCondition(
      queryData.currentConditions.icon
    );

    const windDirection = getWindDirection(queryData.currentConditions.winddir);
    const weatherPrimaryInfo = createWeatherPrimaryInfo(
      cityName,
      queryData,
      weatherConditions
    );
    const forecast = createForecast(queryData);
    const weatherSecondaryInfo = createWeatherSecondaryInfo(
      queryData,
      windDirection
    );
    const weatherAlerts = createWeatherAlerts(queryData);
    mainContent.innerHTML = "";

    const headerContainer = createHeaderContainer();
    mainContent.appendChild(headerContainer);
    mainContent.appendChild(weatherPrimaryInfo);
    weatherPrimaryInfo.appendChild(forecast);
    buildDailyForecast(queryData);

    forecast.appendChild(weatherAlerts);
    weatherPrimaryInfo.appendChild(weatherSecondaryInfo);
  } catch (error) {
    document.querySelector(".search-error").style.display = "block";
    console.error(`ERROR: ${error}`);
  }
}

(async () => {
  try {
    const position = await getUserLocation();
    const keyword = `${position.coords.latitude}, ${position.coords.longitude}`;
    await initWeatherData(keyword);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
})();

//#region init
const createHeaderContainer = () => {
  const headerContainer = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "header" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "greeting_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h2", { class: "greeting" }, {}, "HELLO THERE, "),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("span", { class: "tod-greeting" }, {}, `${greeting()}`)
    ),
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "search-bar_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "form",
        { class: "location-form" },
        {
          submit: (e) => {
            e.preventDefault();
            const search = document.querySelector("#search");
            const searchValue = search.value.trim();
            if (searchValue) {
              initWeatherData(searchValue);
            }
          },
        },
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "input",
          {
            id: "search",
            class: "location-search_input",
            placeholder: "Search Location...",
          },
          {}
        ),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "button",
          { class: "search_btn", type: "submit", form: "search" },
          {
            click: (e) => {
              e.preventDefault();
              const search = document.querySelector("#search");
              const searchValue = search.value.trim();
              if (searchValue) {
                initWeatherData(searchValue);
              }
            },
          },
          "SEARCH"
        )
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("p", { class: "search-error" }, {}, "Location not found.")
    ),
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "unit-toggle_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: "unit-title" }, {}, "SELECT UNITS"),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "unit-toggle_wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("p", { class: "celsius" }, {}, "°C"),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "label",
          { class: "switch" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "input",
            { class: "unit-toggle", type: "checkbox" },
            {
              change: (e) => {
                e.preventDefault();
                const toggle = e.target;
                const tempElements = document.querySelectorAll(".temp");
                tempElements.forEach((tempEl) => {
                  const currentTemp = parseFloat(tempEl.textContent);
                  const convertedTemp = convertTemp(toggle, currentTemp);
                  tempEl.textContent = Math.round(convertedTemp);
                  const supEl = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
                    "sup",
                    {},
                    {},
                    toggle.checked ? "°F" : "°C"
                  );
                  tempEl.appendChild(supEl);
                });
              },
            }
          ),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("span", { class: "slider" }, {})
        ),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("p", { class: "fahrenheit" }, {}, "°F")
      )
    )
  );
  return headerContainer;
};
const createWeatherPrimaryInfo = (cityName, queryData, weatherConditions) =>
  (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "primary-info_container" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "current-weather_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "general-info_container" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "general-top_wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h2", { class: "location" }, {}, cityName),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "img",
            { class: "weather-condition-icon", src: weatherConditions },
            {}
          )
        ),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "general-bottom_wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "div",
            { class: "flex-wrapper" },
            {},
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
              "div",
              { class: "flex-sub-wrapper" },
              {},
              (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
                "h3",
                { class: "date" },
                {},
                Date(queryData.currentConditions.datetime)
                  .split(" ")
                  .slice(1, 4)
                  .join(" ")
              ),
              (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
                "h5",
                { class: "time" },
                {},
                queryData.currentConditions.datetime
              )
            ),
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
              "h1",
              { class: "temperature temp" },
              {},
              `${Math.round(queryData.currentConditions.temp)}`,
              (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", { class: "large" }, {}, "°C")
            )
          ),

          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
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
  (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "forecast_container" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "forecast-controls" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "forecast-range-select" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
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
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
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
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("div", { class: "pagination-controls" }, {})
    ),
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("div", { class: "weather-report_container" }, {})
  );

const createWeatherSecondaryInfo = (queryData, windDirection) =>
  (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "secondary-weather-info_container" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "secondary-weather_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "secondary-info-flex-wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "secondary-svg", src: tempSVG }, {}),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "secondary-content-wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: "secondary-content " }, {}, "FEELS LIKE"),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h3",
            { class: "feels-like temp" },
            {},
            queryData.currentConditions.feelslike,
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", {}, {}, "°C")
          )
        )
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "secondary-info-flex-wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "secondary-svg", src: humiditySVG }, {}),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "secondary-content-wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: " secondary-content " }, {}, "HUMIDITY"),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h3",
            { class: "humidity-index" },
            {},
            `${queryData.currentConditions.humidity}%`
          )
        )
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "secondary-info-flex-wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "secondary-svg", src: umbrellaSVG }, {}),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "secondary-content-wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: "secondary-content" }, {}, "P.O.P."),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h3",
            { class: "pop" },
            {},
            `${queryData.currentConditions.precipprob}%`
          )
        )
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "secondary-info-flex-wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "secondary-svg", src: speedSVG }, {}),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "secondary-content-wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: "secondary-content " }, {}, "WIND SPEED"),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h3",
            { class: "wind-speed" },
            {},
            `${queryData.currentConditions.windspeed} KM/H`
          )
        )
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "secondary-info-flex-wrapper" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "secondary-svg", src: compassSVG }, {}),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "secondary-content-wrapper" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h3",
            { class: "secondary-content" },
            {},
            "WIND DIRECTION"
          ),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h3", { class: "wind-direction" }, {}, windDirection)
        )
      )
    ),
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "gif-container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "outrunGIF", src: outrunGIF }, {})
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
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "slide_container active", "data-report": "daily" },
        {}
      )
    );

  dailyArr.forEach((i) => {
    const dayName = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.parseISO)(i.datetime);
    let dailyReport = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "forecast-daily", "data-day": dayName.getDay() },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("div", { class: "day" }, {}, weekday[dayName.getDay()]),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        { class: "weather-data" },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "temp-container" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h4",
            { class: "temp-high temp" },
            {},
            `${Math.round(i.tempmax)}`,
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", {}, {}, "°C")
          ),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h5",
            { class: "temp-low temp" },
            {},
            `${Math.round(i.tempmin)}`,
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", {}, {}, "°C")
          )
        ),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "img",
          { class: "condition", src: getForecastCondition(i.icon) },
          {}
        )
      )
    );
    document.querySelector(".slide_container").appendChild(dailyReport);
  });
}

function buildHourlyForecast(queryData) {
  const now = Math.floor(Date.now() / 1000);
  const firstEpoch = queryData.days[0].hours[0].datetimeEpoch;
  const days = queryData.days;
  console.log(queryData);
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
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "controls-wrapper" },
      {
        contextmenu: (e) => {
          e.preventDefault();
        },
      },
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("img", { class: "controls page-left", src: leftArrowSVG }, {}),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("a", { class: "controls slidernavBtn" }, {}),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("a", { class: "controls slidernavBtn" }, {}),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("a", { class: "controls slidernavBtn" }, {}),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "img",
        { class: " controls page-right", src: rightArrowSVG },
        {}
      )
    )
  );
  slideArr.forEach((_, index) => {
    const hourlyContainer = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
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
      let hourlyReport = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "div",
        {
          class: "forecast-hourly",
          "data-hour": timeName,
        },
        {},
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("div", { class: "hour" }, {}, `${timeName}`),
        (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
          "div",
          { class: "weather-data" },
          {},
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "h4",
            { class: "temp-high temp" },
            {},
            Math.round(i.temp),
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", {}, {}, "°C")
          ),
          (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "img",
            { class: "condition", src: getForecastCondition(i.icon) },
            {}
          )
        )
      );
      if (slideIndex === 0 && index === 0) {
        const timeDiff = now - firstEpoch;
        const currentHourIndex = Math.floor(timeDiff / 3600);

        if (currentHourIndex < slideData.length) {
          hourlyReport = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
            "div",
            {
              class: "forecast-hourly",
              "data-hour": timeName,
            },
            {},
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("div", { class: "hour" }, {}, `${timeName}`),
            (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
              "div",
              { class: "weather-data" },
              {},
              (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
                "h4",
                { class: "temp-high temp" },
                {},
                Math.round(slideData[currentHourIndex].temp),
                (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("sup", {}, {}, "°C")
              ),
              (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
                "img",
                { class: "condition", src: getForecastCondition(i.icon) },
                {}
              )
            )
          );
        }
      }
      div.appendChild(hourlyReport);
    });
  });
}
//#endregion init
const createWeatherAlerts = (queryData) =>
  (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "weather-alerts_container" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "weather-desc_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h2", { class: "weather-desc-title" }, {}, "Description"),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "p",
        { class: "weather-desc_content" },
        {},
        queryData.description
      )
    ),
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "extreme-weather_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "h2",
        { class: "extreme-weather-title" },
        {},
        "Extreme Weather Alerts"
      ),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "p",
        { class: "extreme-weather-content" },
        {},
        queryData.alerts.length === 0
          ? "No alerts to display."
          : queryData.alerts.forEach((alert) => {
              alert;
            })
      )
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

const convertTemp = (toggle, temp) => {
  let convertedTemp;
  if (toggle.checked) {
    //℃ to ℉
    convertedTemp = (temp * 9) / 5 + 32;
  }
  if (!toggle.checked) {
    //℉ to ℃
    convertedTemp = ((temp - 32) * 5) / 9;
  }
  return convertedTemp;
};

function getForecastCondition(icon) {
  if (icon === "clear-day" || icon === "clear-night") {
    return sunSVG;
  }
  if (icon === "partly-cloudy-day" || icon === "partly-cloudy-night") {
    return sunCloudSVG;
  }
  if (icon === "cloudy") {
    return cloudSVG;
  }
  if (icon === "fog") {
    return fogSVG;
  }
  if (icon === "rain") {
    return rainSVG;
  }
  if (icon === "snow") {
    return snowSVG;
  }
  if (
    icon === "thunder-rain" ||
    icon === "thunder- showers-day" ||
    icon === "thunder-showers-night"
  ) {
    return stormSVG;
  }
}


/***/ }),

/***/ "./src/scripts/factory.js":
/*!********************************!*\
  !*** ./src/scripts/factory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElem: () => (/* binding */ createElem)
/* harmony export */ });
const createElem = (tag, attr, listeners, ...children) => {
  const el = document.createElement(tag);
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
  for (const event in listeners) {
    el.addEventListener(event, listeners[event]);
  }
  children.forEach((child) => {
    typeof child === "string" || typeof child === "number"
      ? el.appendChild(document.createTextNode(child))
      : el.appendChild(child);
  });
  return el;
};


/***/ }),

/***/ "./src/assets/images/compass.svg":
/*!***************************************!*\
  !*** ./src/assets/images/compass.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/compass.0ce3e029d0e93dd2d150.svg";

/***/ }),

/***/ "./src/assets/images/humidity.svg":
/*!****************************************!*\
  !*** ./src/assets/images/humidity.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/humidity.66b8ad5c7fbcf99c4261.svg";

/***/ }),

/***/ "./src/assets/images/left-arrow.svg":
/*!******************************************!*\
  !*** ./src/assets/images/left-arrow.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/left-arrow.707c25bb1b47f4411005.svg";

/***/ }),

/***/ "./src/assets/images/outrun.gif":
/*!**************************************!*\
  !*** ./src/assets/images/outrun.gif ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/outrun.f684709c0c11b5ee7a48.gif";

/***/ }),

/***/ "./src/assets/images/retrowave_cloud.svg":
/*!***********************************************!*\
  !*** ./src/assets/images/retrowave_cloud.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_cloud.665d6eaa8b900a94077a.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_fog.svg":
/*!*********************************************!*\
  !*** ./src/assets/images/retrowave_fog.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_fog.5e175c0cc19dcc9d096c.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_moon-cloud.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/retrowave_moon-cloud.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_moon-cloud.b6432cb21a6118a2b03f.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_moon.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/retrowave_moon.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_moon.d4293ec667b2956952b0.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_rain.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/retrowave_rain.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_rain.815ceb22b273b511f944.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_snow.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/retrowave_snow.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_snow.1929bcf4e044d87c245f.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_storm.svg":
/*!***********************************************!*\
  !*** ./src/assets/images/retrowave_storm.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_storm.60e1c9c191a2d1b0fd82.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_sun-cloud.svg":
/*!***************************************************!*\
  !*** ./src/assets/images/retrowave_sun-cloud.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_sun-cloud.4f5f566cc2c18ca21315.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_sun-showers.svg":
/*!*****************************************************!*\
  !*** ./src/assets/images/retrowave_sun-showers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_sun-showers.59ff133f2d80307e0d49.svg";

/***/ }),

/***/ "./src/assets/images/retrowave_sunset.svg":
/*!************************************************!*\
  !*** ./src/assets/images/retrowave_sunset.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/retrowave_sunset.58b06ae86035d3e406aa.svg";

/***/ }),

/***/ "./src/assets/images/right-arrow.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/right-arrow.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/right-arrow.aec2d5b3ce776d348e8f.svg";

/***/ }),

/***/ "./src/assets/images/speed.svg":
/*!*************************************!*\
  !*** ./src/assets/images/speed.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/speed.6bd59bdcc37ab8ff840e.svg";

/***/ }),

/***/ "./src/assets/images/temp_half.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/temp_half.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/temp_half.c7c4b635192a17b1acf0.svg";

/***/ }),

/***/ "./src/assets/images/umbrella.svg":
/*!****************************************!*\
  !*** ./src/assets/images/umbrella.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/umbrella.bd7c1c5cb29b2be303ac.svg";

/***/ }),

/***/ "./src/assets/images/vector-grid.png":
/*!*******************************************!*\
  !*** ./src/assets/images/vector-grid.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/vector-grid.4a79036a60ab0f5b467d.png";

/***/ }),

/***/ "./node_modules/date-fns/constants.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/constants.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   daysInWeek: () => (/* binding */ daysInWeek),
/* harmony export */   daysInYear: () => (/* binding */ daysInYear),
/* harmony export */   maxTime: () => (/* binding */ maxTime),
/* harmony export */   millisecondsInDay: () => (/* binding */ millisecondsInDay),
/* harmony export */   millisecondsInHour: () => (/* binding */ millisecondsInHour),
/* harmony export */   millisecondsInMinute: () => (/* binding */ millisecondsInMinute),
/* harmony export */   millisecondsInSecond: () => (/* binding */ millisecondsInSecond),
/* harmony export */   millisecondsInWeek: () => (/* binding */ millisecondsInWeek),
/* harmony export */   minTime: () => (/* binding */ minTime),
/* harmony export */   minutesInDay: () => (/* binding */ minutesInDay),
/* harmony export */   minutesInHour: () => (/* binding */ minutesInHour),
/* harmony export */   minutesInMonth: () => (/* binding */ minutesInMonth),
/* harmony export */   minutesInYear: () => (/* binding */ minutesInYear),
/* harmony export */   monthsInQuarter: () => (/* binding */ monthsInQuarter),
/* harmony export */   monthsInYear: () => (/* binding */ monthsInYear),
/* harmony export */   quartersInYear: () => (/* binding */ quartersInYear),
/* harmony export */   secondsInDay: () => (/* binding */ secondsInDay),
/* harmony export */   secondsInHour: () => (/* binding */ secondsInHour),
/* harmony export */   secondsInMinute: () => (/* binding */ secondsInMinute),
/* harmony export */   secondsInMonth: () => (/* binding */ secondsInMonth),
/* harmony export */   secondsInQuarter: () => (/* binding */ secondsInQuarter),
/* harmony export */   secondsInWeek: () => (/* binding */ secondsInWeek),
/* harmony export */   secondsInYear: () => (/* binding */ secondsInYear)
/* harmony export */ });
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;


/***/ }),

/***/ "./node_modules/date-fns/parseISO.mjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/parseISO.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parseISO: () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "./node_modules/date-fns/constants.mjs");


/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  const timestamp = date.getTime();
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    const dirtyDate = new Date(timestamp + time);
    // JS parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.
    const result = new Date(0);
    result.setFullYear(
      dirtyDate.getUTCFullYear(),
      dirtyDate.getUTCMonth(),
      dirtyDate.getUTCDate(),
    );
    result.setHours(
      dirtyDate.getUTCHours(),
      dirtyDate.getUTCMinutes(),
      dirtyDate.getUTCSeconds(),
      dirtyDate.getUTCMilliseconds(),
    );
    return result;
  }

  return new Date(timestamp + time + offset);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.millisecondsInHour + minutes * _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.millisecondsInMinute + seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.millisecondsInHour + minutes * _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseISO);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxRQUFRLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hc3NldHMvaW1hZ2VzLyBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0cy9mYWN0b3J5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0YW50cy5tanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvcGFyc2VJU08ubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBtYXAgPSB7XG5cdFwiLi9jb21wYXNzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvY29tcGFzcy5zdmdcIixcblx0XCIuL2h1bWlkaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9sZWZ0LWFycm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGVmdC1hcnJvdy5zdmdcIixcblx0XCIuL291dHJ1bi5naWZcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL291dHJ1bi5naWZcIixcblx0XCIuL3JldHJvd2F2ZV9jbG91ZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9jbG91ZC5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9mb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfZm9nLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX21vb24tY2xvdWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfbW9vbi1jbG91ZC5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9tb29uLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcmV0cm93YXZlX21vb24uc3ZnXCIsXG5cdFwiLi9yZXRyb3dhdmVfcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9yYWluLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3Nub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfc25vdy5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9zdG9ybS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9zdG9ybS5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9zdW4tY2xvdWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfc3VuLWNsb3VkLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3N1bi1zaG93ZXJzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcmV0cm93YXZlX3N1bi1zaG93ZXJzLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3N1bnNldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9zdW5zZXQuc3ZnXCIsXG5cdFwiLi9yaWdodC1hcnJvdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JpZ2h0LWFycm93LnN2Z1wiLFxuXHRcIi4vc3BlZWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9zcGVlZC5zdmdcIixcblx0XCIuL3RlbXBfaGFsZi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3RlbXBfaGFsZi5zdmdcIixcblx0XCIuL3VtYnJlbGxhLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvdW1icmVsbGEuc3ZnXCIsXG5cdFwiLi92ZWN0b3ItZ3JpZC5wbmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3ZlY3Rvci1ncmlkLnBuZ1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaW1hZ2VzIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW0gfSBmcm9tIFwiLi9zY3JpcHRzL2ZhY3RvcnlcIjtcbmltcG9ydCB7IHBhcnNlLCBwYXJzZUlTTywgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBpbWFnZXBhdGggPSAobmFtZSkgPT4gaW1hZ2VzKG5hbWUsIHRydWUpO1xuXG5jb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1jb250ZW50XCIpO1xuY29uc3QgaW1hZ2VzID0gcmVxdWlyZS5jb250ZXh0KFwiLi4vc3JjL2Fzc2V0cy9pbWFnZXNcIiwgdHJ1ZSk7XG5cbmNvbnN0IHN1blNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX3N1bnNldC5zdmdcIik7XG5jb25zdCBjbG91ZFNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX2Nsb3VkLnN2Z1wiKTtcbmNvbnN0IGZvZ1NWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX2ZvZy5zdmdcIik7XG5jb25zdCByYWluU1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfcmFpbi5zdmdcIik7XG5jb25zdCBzbm93U1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfc25vdy5zdmdcIik7XG5jb25zdCBzdG9ybVNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX3N0b3JtLnN2Z1wiKTtcbmNvbnN0IHN1bkNsb3VkU1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfc3VuLWNsb3VkLnN2Z1wiKTtcbmNvbnN0IHN1blNob3dlcnNTVkcgPSBpbWFnZXBhdGgoXCIuL3JldHJvd2F2ZV9zdW4tc2hvd2Vycy5zdmdcIik7XG5jb25zdCBsZWZ0QXJyb3dTVkcgPSBpbWFnZXBhdGgoXCIuL2xlZnQtYXJyb3cuc3ZnXCIpO1xuY29uc3QgcmlnaHRBcnJvd1NWRyA9IGltYWdlcGF0aChcIi4vcmlnaHQtYXJyb3cuc3ZnXCIpO1xuY29uc3QgY29tcGFzc1NWRyA9IGltYWdlcGF0aChcIi4vY29tcGFzcy5zdmdcIik7XG5jb25zdCBzcGVlZFNWRyA9IGltYWdlcGF0aChcIi4vc3BlZWQuc3ZnXCIpO1xuY29uc3QgaHVtaWRpdHlTVkcgPSBpbWFnZXBhdGgoXCIuL2h1bWlkaXR5LnN2Z1wiKTtcbmNvbnN0IHVtYnJlbGxhU1ZHID0gaW1hZ2VwYXRoKFwiLi91bWJyZWxsYS5zdmdcIik7XG5jb25zdCB0ZW1wU1ZHID0gaW1hZ2VwYXRoKFwiLi90ZW1wX2hhbGYuc3ZnXCIpO1xuY29uc3Qgb3V0cnVuR0lGID0gaW1hZ2VwYXRoKFwiLi9vdXRydW4uZ2lmXCIpO1xuXG4vL2NoYW5nZSB0byBncmVldGluZyB3aXRoIHZhbHVlIGJhc2VkIG9uIFRvRFxubGV0IGdyZWV0aW5nID0gKCkgPT4ge1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgbGV0IGN1cnJlbnRUaW1lID0gK2RhdGUuc3BsaXQoXCIgXCIpLnNsaWNlKDQsIDUpWzBdLnNwbGl0KFwiOlwiKVswXTtcbiAgaWYgKGN1cnJlbnRUaW1lID49IDMgJiYgY3VycmVudFRpbWUgPCAxMikge1xuICAgIHJldHVybiBcIkdvb2QgTW9ybmluZ1wiO1xuICB9XG4gIGlmIChjdXJyZW50VGltZSA+PSAxMiAmJiBjdXJyZW50VGltZSA8IDE3KSB7XG4gICAgcmV0dXJuIFwiR29vZCBBZnRlcm5vb25cIjtcbiAgfVxuICBpZiAoY3VycmVudFRpbWUgPj0gMTcgJiYgY3VycmVudFRpbWUgPCAyMykge1xuICAgIHJldHVybiBcIkdvb2QgRXZlbmluZ1wiO1xuICB9XG4gIGlmIChjdXJyZW50VGltZSA+PSAwICYmIGN1cnJlbnRUaW1lIDwgMykge1xuICAgIHJldHVybiBcIkJ1cm5pbmcgdGhlIG1pZG5pZ2h0IG9pbC5cIjtcbiAgfVxufTtcbmdyZWV0aW5nKCk7XG5jb25zdCBnZXRVc2VyTG9jYXRpb24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJMb2NhdGlvbiBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gcmV2ZXJzZUdlbyhwb3NpdGlvbikge1xuICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICB9O1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkuZ2VvYXBpZnkuY29tL3YxL2dlb2NvZGUvcmV2ZXJzZT9sYXQ9JHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9Jmxvbj0ke3Bvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9JmFwaUtleT00Yjc0MzM4MTFhMWI0YTNkYjQ0MWU0MDNmZmE0MGU5ZGAsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0V2VhdGhlckRhdGEoa2V5d29yZCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvJHtrZXl3b3JkfT91bml0R3JvdXA9bWV0cmljJmtleT01WVdWOVpEQlg0TEtTWkM0OExIRlFQTldIJmNvbnRlbnRUeXBlPWpzb25gLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBsZXQgY2l0eSA9IGtleXdvcmQ7XG4gICAgaWYgKCFpc05hTihwYXJzZUZsb2F0KGtleXdvcmQuc3BsaXQoXCIsXCIpWzBdKSkpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICBjb29yZHM6IHtcbiAgICAgICAgICBsYXRpdHVkZTogcGFyc2VGbG9hdChrZXl3b3JkLnNwbGl0KFwiLFwiKVswXSksXG4gICAgICAgICAgbG9uZ2l0dWRlOiBwYXJzZUZsb2F0KGtleXdvcmQuc3BsaXQoXCIsXCIpWzFdKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgcmV2ZXJzZUdlbyhwb3NpdGlvbik7XG4gICAgICBjaXR5ID0gYWRkcmVzcy5mZWF0dXJlc1swXS5wcm9wZXJ0aWVzLmNpdHk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVwb3J0UXVlcnkgPSB7IGNpdHksIHdlYXRoZXJEYXRhIH07XG5cbiAgICBjb25zdCBjaXR5TmFtZSA9IHJlcG9ydFF1ZXJ5LmNpdHk7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gcmVwb3J0UXVlcnkud2VhdGhlckRhdGE7XG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kRGlyZWN0aW9uKHdpbmRkaXIpIHtcbiAgICAgIGlmICh3aW5kZGlyID09PSAwIHx8IHdpbmRkaXIgPT09IDM2MCkge1xuICAgICAgICByZXR1cm4gXCJOIOKshlwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiAwICYmIHdpbmRkaXIgPCA5MCkge1xuICAgICAgICByZXR1cm4gXCJORSDihpdcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID09PSA5MCkge1xuICAgICAgICByZXR1cm4gXCJFIOKeoVwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiA5MCAmJiB3aW5kZGlyIDwgMTgwKSB7XG4gICAgICAgIHJldHVybiBcIlNFIOKGmFwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPT09IDE4MCkge1xuICAgICAgICByZXR1cm4gXCJTIOKsh1wiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiAxODAgJiYgd2luZGRpciA8IDI3MCkge1xuICAgICAgICByZXR1cm4gXCJTVyDihplcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID09PSAyNzApIHtcbiAgICAgICAgcmV0dXJuIFwiVyDirIVcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID4gMjcwICYmIHdpbmRkaXIgPCAzNTkpIHtcbiAgICAgICAgcmV0dXJuIFwiTlcg4oaWXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFdlYXRoZXJDb25kaXRpb24oY3VycmVudENvbmRpdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyZW50Q29uZGl0aW9uID09PSBcImNsZWFyLWRheVwiIHx8XG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwiY2xlYXItbmlnaHRcIlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdW5TVkc7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwicGFydGx5LWNsb3VkeS1kYXlcIiB8fFxuICAgICAgICBjdXJyZW50Q29uZGl0aW9uID09PSBcInBhcnRseS1jbG91ZHktbmlnaHRcIlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdW5DbG91ZFNWRztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29uZGl0aW9uID09PSBcImNsb3VkeVwiKSB7XG4gICAgICAgIHJldHVybiBjbG91ZFNWRztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29uZGl0aW9uID09PSBcImZvZ1wiKSB7XG4gICAgICAgIHJldHVybiBmb2dTVkc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbmRpdGlvbiA9PT0gXCJyYWluXCIpIHtcbiAgICAgICAgcmV0dXJuIHJhaW5TVkc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbmRpdGlvbiA9PT0gXCJzbm93XCIpIHtcbiAgICAgICAgcmV0dXJuIHNub3dTVkc7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwidGh1bmRlci1yYWluXCIgfHxcbiAgICAgICAgY3VycmVudENvbmRpdGlvbiA9PT0gXCJ0aHVuZGVyLSBzaG93ZXJzLWRheVwiIHx8XG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwidGh1bmRlci1zaG93ZXJzLW5pZ2h0XCJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gc3Rvcm1TVkc7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9ucyA9IGdldFdlYXRoZXJDb25kaXRpb24oXG4gICAgICBxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuaWNvblxuICAgICk7XG5cbiAgICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZ2V0V2luZERpcmVjdGlvbihxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMud2luZGRpcik7XG4gICAgY29uc3Qgd2VhdGhlclByaW1hcnlJbmZvID0gY3JlYXRlV2VhdGhlclByaW1hcnlJbmZvKFxuICAgICAgY2l0eU5hbWUsXG4gICAgICBxdWVyeURhdGEsXG4gICAgICB3ZWF0aGVyQ29uZGl0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBjcmVhdGVGb3JlY2FzdChxdWVyeURhdGEpO1xuICAgIGNvbnN0IHdlYXRoZXJTZWNvbmRhcnlJbmZvID0gY3JlYXRlV2VhdGhlclNlY29uZGFyeUluZm8oXG4gICAgICBxdWVyeURhdGEsXG4gICAgICB3aW5kRGlyZWN0aW9uXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyQWxlcnRzID0gY3JlYXRlV2VhdGhlckFsZXJ0cyhxdWVyeURhdGEpO1xuICAgIG1haW5Db250ZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBjcmVhdGVIZWFkZXJDb250YWluZXIoKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChoZWFkZXJDb250YWluZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKHdlYXRoZXJQcmltYXJ5SW5mbyk7XG4gICAgd2VhdGhlclByaW1hcnlJbmZvLmFwcGVuZENoaWxkKGZvcmVjYXN0KTtcbiAgICBidWlsZERhaWx5Rm9yZWNhc3QocXVlcnlEYXRhKTtcblxuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKHdlYXRoZXJBbGVydHMpO1xuICAgIHdlYXRoZXJQcmltYXJ5SW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyU2Vjb25kYXJ5SW5mbyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtZXJyb3JcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufVxuXG4oYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgZ2V0VXNlckxvY2F0aW9uKCk7XG4gICAgY29uc3Qga2V5d29yZCA9IGAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sICR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gO1xuICAgIGF3YWl0IGluaXRXZWF0aGVyRGF0YShrZXl3b3JkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcblxuLy8jcmVnaW9uIGluaXRcbmNvbnN0IGNyZWF0ZUhlYWRlckNvbnRhaW5lciA9ICgpID0+IHtcbiAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gY3JlYXRlRWxlbShcbiAgICBcImRpdlwiLFxuICAgIHsgY2xhc3M6IFwiaGVhZGVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZ3JlZXRpbmdfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcImgyXCIsIHsgY2xhc3M6IFwiZ3JlZXRpbmdcIiB9LCB7fSwgXCJIRUxMTyBUSEVSRSwgXCIpLFxuICAgICAgY3JlYXRlRWxlbShcInNwYW5cIiwgeyBjbGFzczogXCJ0b2QtZ3JlZXRpbmdcIiB9LCB7fSwgYCR7Z3JlZXRpbmcoKX1gKVxuICAgICksXG4gICAgY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBcInNlYXJjaC1iYXJfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgIHsgY2xhc3M6IFwibG9jYXRpb24tZm9ybVwiIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJtaXQ6IChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFZhbHVlID0gc2VhcmNoLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hWYWx1ZSkge1xuICAgICAgICAgICAgICBpbml0V2VhdGhlckRhdGEoc2VhcmNoVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgY2xhc3M6IFwibG9jYXRpb24tc2VhcmNoX2lucHV0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJTZWFyY2ggTG9jYXRpb24uLi5cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9XG4gICAgICAgICksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7IGNsYXNzOiBcInNlYXJjaF9idG5cIiwgdHlwZTogXCJzdWJtaXRcIiwgZm9ybTogXCJzZWFyY2hcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaWNrOiAoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpO1xuICAgICAgICAgICAgICBjb25zdCBzZWFyY2hWYWx1ZSA9IHNlYXJjaC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgIGlmIChzZWFyY2hWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRXZWF0aGVyRGF0YShzZWFyY2hWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIlNFQVJDSFwiXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFwicFwiLCB7IGNsYXNzOiBcInNlYXJjaC1lcnJvclwiIH0sIHt9LCBcIkxvY2F0aW9uIG5vdCBmb3VuZC5cIilcbiAgICApLFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJ1bml0LXRvZ2dsZV9jb250YWluZXJcIiB9LFxuICAgICAge30sXG4gICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCJ1bml0LXRpdGxlXCIgfSwge30sIFwiU0VMRUNUIFVOSVRTXCIpLFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJ1bml0LXRvZ2dsZV93cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJwXCIsIHsgY2xhc3M6IFwiY2Vsc2l1c1wiIH0sIHt9LCBcIsKwQ1wiKSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzd2l0Y2hcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImlucHV0XCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcInVuaXQtdG9nZ2xlXCIsIHR5cGU6IFwiY2hlY2tib3hcIiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVtcFwiKTtcbiAgICAgICAgICAgICAgICB0ZW1wRWxlbWVudHMuZm9yRWFjaCgodGVtcEVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGVtcCA9IHBhcnNlRmxvYXQodGVtcEVsLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZFRlbXAgPSBjb252ZXJ0VGVtcCh0b2dnbGUsIGN1cnJlbnRUZW1wKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoY29udmVydGVkVGVtcCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdXBFbCA9IGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgICAgICAgIFwic3VwXCIsXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLmNoZWNrZWQgPyBcIsKwRlwiIDogXCLCsENcIlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBFbC5hcHBlbmRDaGlsZChzdXBFbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwic3BhblwiLCB7IGNsYXNzOiBcInNsaWRlclwiIH0sIHt9KVxuICAgICAgICApLFxuICAgICAgICBjcmVhdGVFbGVtKFwicFwiLCB7IGNsYXNzOiBcImZhaHJlbmhlaXRcIiB9LCB7fSwgXCLCsEZcIilcbiAgICAgIClcbiAgICApXG4gICk7XG4gIHJldHVybiBoZWFkZXJDb250YWluZXI7XG59O1xuY29uc3QgY3JlYXRlV2VhdGhlclByaW1hcnlJbmZvID0gKGNpdHlOYW1lLCBxdWVyeURhdGEsIHdlYXRoZXJDb25kaXRpb25zKSA9PlxuICBjcmVhdGVFbGVtKFxuICAgIFwiZGl2XCIsXG4gICAgeyBjbGFzczogXCJwcmltYXJ5LWluZm9fY29udGFpbmVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiY3VycmVudC13ZWF0aGVyX2NvbnRhaW5lclwiIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwiZ2VuZXJhbC1pbmZvX2NvbnRhaW5lclwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJnZW5lcmFsLXRvcF93cmFwcGVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwiaDJcIiwgeyBjbGFzczogXCJsb2NhdGlvblwiIH0sIHt9LCBjaXR5TmFtZSksXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaW1nXCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcIndlYXRoZXItY29uZGl0aW9uLWljb25cIiwgc3JjOiB3ZWF0aGVyQ29uZGl0aW9ucyB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcImdlbmVyYWwtYm90dG9tX3dyYXBwZXJcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJmbGV4LXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzOiBcImZsZXgtc3ViLXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICAgICAgeyBjbGFzczogXCJkYXRlXCIgfSxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICBEYXRlKHF1ZXJ5RGF0YS5jdXJyZW50Q29uZGl0aW9ucy5kYXRldGltZSlcbiAgICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAgIC5zbGljZSgxLCA0KVxuICAgICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgICAgXCJoNVwiLFxuICAgICAgICAgICAgICAgIHsgY2xhc3M6IFwidGltZVwiIH0sXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgcXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLmRhdGV0aW1lXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgICBcImgxXCIsXG4gICAgICAgICAgICAgIHsgY2xhc3M6IFwidGVtcGVyYXR1cmUgdGVtcFwiIH0sXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBgJHtNYXRoLnJvdW5kKHF1ZXJ5RGF0YS5jdXJyZW50Q29uZGl0aW9ucy50ZW1wKX1gLFxuICAgICAgICAgICAgICBjcmVhdGVFbGVtKFwic3VwXCIsIHsgY2xhc3M6IFwibGFyZ2VcIiB9LCB7fSwgXCLCsENcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDJcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwid2VhdGhlci1jb25kaXRpb24tZGVzY3JpcHRpb25cIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuY29uZGl0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcbmNvbnN0IGNyZWF0ZUZvcmVjYXN0ID0gKHF1ZXJ5RGF0YSkgPT5cbiAgY3JlYXRlRWxlbShcbiAgICBcImRpdlwiLFxuICAgIHsgY2xhc3M6IFwiZm9yZWNhc3RfY29udGFpbmVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZm9yZWNhc3QtY29udHJvbHNcIiB9LFxuICAgICAge30sXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzOiBcImZvcmVjYXN0LXJhbmdlLXNlbGVjdFwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJyYW5nZS1zZWxlY3RfYnRuIGFjdGl2ZVwiLCBpZDogXCJkYWlseVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgc2VsZWN0RGlzcGxheShlLnRhcmdldCwgcXVlcnlEYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkRBSUxZXCJcbiAgICAgICAgKSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwicmFuZ2Utc2VsZWN0X2J0blwiLCBpZDogXCJob3VybHlcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaWNrOiAoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNlbGVjdERpc3BsYXkoZS50YXJnZXQsIHF1ZXJ5RGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJIT1VSTFlcIlxuICAgICAgICApXG4gICAgICApLFxuICAgICAgY3JlYXRlRWxlbShcImRpdlwiLCB7IGNsYXNzOiBcInBhZ2luYXRpb24tY29udHJvbHNcIiB9LCB7fSlcbiAgICApLFxuICAgIGNyZWF0ZUVsZW0oXCJkaXZcIiwgeyBjbGFzczogXCJ3ZWF0aGVyLXJlcG9ydF9jb250YWluZXJcIiB9LCB7fSlcbiAgKTtcblxuY29uc3QgY3JlYXRlV2VhdGhlclNlY29uZGFyeUluZm8gPSAocXVlcnlEYXRhLCB3aW5kRGlyZWN0aW9uKSA9PlxuICBjcmVhdGVFbGVtKFxuICAgIFwiZGl2XCIsXG4gICAgeyBjbGFzczogXCJzZWNvbmRhcnktd2VhdGhlci1pbmZvX2NvbnRhaW5lclwiIH0sXG4gICAge30sXG4gICAgY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS13ZWF0aGVyX2NvbnRhaW5lclwiIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWluZm8tZmxleC13cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktc3ZnXCIsIHNyYzogdGVtcFNWRyB9LCB7fSksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXCJoM1wiLCB7IGNsYXNzOiBcInNlY29uZGFyeS1jb250ZW50IFwiIH0sIHt9LCBcIkZFRUxTIExJS0VcIiksXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwiZmVlbHMtbGlrZSB0ZW1wXCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgcXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLmZlZWxzbGlrZSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW0oXCJzdXBcIiwge30sIHt9LCBcIsKwQ1wiKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWluZm8tZmxleC13cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktc3ZnXCIsIHNyYzogaHVtaWRpdHlTVkcgfSwge30pLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCIgc2Vjb25kYXJ5LWNvbnRlbnQgXCIgfSwge30sIFwiSFVNSURJVFlcIiksXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwiaHVtaWRpdHktaW5kZXhcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBgJHtxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuaHVtaWRpdHl9JWBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1pbmZvLWZsZXgtd3JhcHBlclwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFwiaW1nXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LXN2Z1wiLCBzcmM6IHVtYnJlbGxhU1ZHIH0sIHt9KSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnQtd3JhcHBlclwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcImgzXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnRcIiB9LCB7fSwgXCJQLk8uUC5cIiksXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwicG9wXCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgYCR7cXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLnByZWNpcHByb2J9JWBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1pbmZvLWZsZXgtd3JhcHBlclwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFwiaW1nXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LXN2Z1wiLCBzcmM6IHNwZWVkU1ZHIH0sIHt9KSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnQtd3JhcHBlclwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcImgzXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnQgXCIgfSwge30sIFwiV0lORCBTUEVFRFwiKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJ3aW5kLXNwZWVkXCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgYCR7cXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLndpbmRzcGVlZH0gS00vSGBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1pbmZvLWZsZXgtd3JhcHBlclwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFwiaW1nXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LXN2Z1wiLCBzcmM6IGNvbXBhc3NTVkcgfSwge30pLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudFwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIFwiV0lORCBESVJFQ1RJT05cIlxuICAgICAgICAgICksXG4gICAgICAgICAgY3JlYXRlRWxlbShcImgzXCIsIHsgY2xhc3M6IFwid2luZC1kaXJlY3Rpb25cIiB9LCB7fSwgd2luZERpcmVjdGlvbilcbiAgICAgICAgKVxuICAgICAgKVxuICAgICksXG4gICAgY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBcImdpZi1jb250YWluZXJcIiB9LFxuICAgICAge30sXG4gICAgICBjcmVhdGVFbGVtKFwiaW1nXCIsIHsgY2xhc3M6IFwib3V0cnVuR0lGXCIsIHNyYzogb3V0cnVuR0lGIH0sIHt9KVxuICAgIClcbiAgKTtcblxuZnVuY3Rpb24gYnVpbGREYWlseUZvcmVjYXN0KHF1ZXJ5RGF0YSkge1xuICBjb25zdCBkYWlseUFyciA9IFsuLi5xdWVyeURhdGEuZGF5cy5zbGljZSgxLCA4KV07XG4gIGNvbnN0IHdlZWtkYXkgPSBbXG4gICAgXCJTVU5EQVlcIixcbiAgICBcIk1PTkRBWVwiLFxuICAgIFwiVFVFU0RBWVwiLFxuICAgIFwiV0VETkVTREFZXCIsXG4gICAgXCJUSFVSU0RBWVwiLFxuICAgIFwiRlJJREFZXCIsXG4gICAgXCJTQVRVUkRBWVwiLFxuICBdO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItcmVwb3J0X2NvbnRhaW5lclwiKVxuICAgIC5hcHBlbmRDaGlsZChcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2xpZGVfY29udGFpbmVyIGFjdGl2ZVwiLCBcImRhdGEtcmVwb3J0XCI6IFwiZGFpbHlcIiB9LFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICk7XG5cbiAgZGFpbHlBcnIuZm9yRWFjaCgoaSkgPT4ge1xuICAgIGNvbnN0IGRheU5hbWUgPSBwYXJzZUlTTyhpLmRhdGV0aW1lKTtcbiAgICBsZXQgZGFpbHlSZXBvcnQgPSBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZm9yZWNhc3QtZGFpbHlcIiwgXCJkYXRhLWRheVwiOiBkYXlOYW1lLmdldERheSgpIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJkaXZcIiwgeyBjbGFzczogXCJkYXlcIiB9LCB7fSwgd2Vla2RheVtkYXlOYW1lLmdldERheSgpXSksXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IGNsYXNzOiBcIndlYXRoZXItZGF0YVwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJ0ZW1wLWNvbnRhaW5lclwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwidGVtcC1oaWdoIHRlbXBcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBgJHtNYXRoLnJvdW5kKGkudGVtcG1heCl9YCxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW0oXCJzdXBcIiwge30sIHt9LCBcIsKwQ1wiKVxuICAgICAgICAgICksXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDVcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwidGVtcC1sb3cgdGVtcFwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGAke01hdGgucm91bmQoaS50ZW1wbWluKX1gLFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcInN1cFwiLCB7fSwge30sIFwiwrBDXCIpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiaW1nXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJjb25kaXRpb25cIiwgc3JjOiBnZXRGb3JlY2FzdENvbmRpdGlvbihpLmljb24pIH0sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoZGFpbHlSZXBvcnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIb3VybHlGb3JlY2FzdChxdWVyeURhdGEpIHtcbiAgY29uc3Qgbm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gIGNvbnN0IGZpcnN0RXBvY2ggPSBxdWVyeURhdGEuZGF5c1swXS5ob3Vyc1swXS5kYXRldGltZUVwb2NoO1xuICBjb25zdCBkYXlzID0gcXVlcnlEYXRhLmRheXM7XG4gIGNvbnNvbGUubG9nKHF1ZXJ5RGF0YSk7XG4gIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXJlcG9ydF9jb250YWluZXJcIik7XG4gIGNvbnN0IHNsaWRlQXJyID0gW1tdLCBbXSwgW11dO1xuXG4gIGNvbnN0IGN1cnJlbnREYXlIb3VycyA9IGRheXNbMF0uaG91cnMuZmlsdGVyKChocikgPT4gbm93IDwgaHIuZGF0ZXRpbWVFcG9jaCk7XG4gIGN1cnJlbnREYXlIb3Vycy5mb3JFYWNoKChob3VyLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA8IDgpIHtcbiAgICAgIHNsaWRlQXJyWzBdLnB1c2goaG91cik7XG4gICAgfSBlbHNlIGlmIChpbmRleCA8IDE2KSB7XG4gICAgICBzbGlkZUFyclsxXS5wdXNoKGhvdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZUFyclszXS5wdXNoKGhvdXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgZGF5IG9mIGRheXMuc2xpY2UoMSkpIHtcbiAgICBpZiAobm93IDwgZGF5LmRhdGV0aW1lRXBvY2gpIHtcbiAgICAgIGNvbnN0IG5leHREYXlIb3VycyA9IGRheS5ob3Vycy5maWx0ZXIoKGhyKSA9PiBub3cgPCBoci5kYXRldGltZUVwb2NoKTtcbiAgICAgIG5leHREYXlIb3Vycy5mb3JFYWNoKChob3VyLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoc2xpZGVBcnJbMF0ubGVuZ3RoIDwgOCkge1xuICAgICAgICAgIHNsaWRlQXJyWzBdLnB1c2goaG91cik7XG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVBcnJbMV0ubGVuZ3RoIDwgOCkge1xuICAgICAgICAgIHNsaWRlQXJyWzFdLnB1c2goaG91cik7XG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVBcnJbMl0ubGVuZ3RoIDwgOCkge1xuICAgICAgICAgIHNsaWRlQXJyWzJdLnB1c2goaG91cik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2xpZGVyTmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZXJuYXZCdG5cIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnaW5hdGlvbi1jb250cm9sc1wiKS5hcHBlbmRDaGlsZChcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiY29udHJvbHMtd3JhcHBlclwiIH0sXG4gICAgICB7XG4gICAgICAgIGNvbnRleHRtZW51OiAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjcmVhdGVFbGVtKFwiaW1nXCIsIHsgY2xhc3M6IFwiY29udHJvbHMgcGFnZS1sZWZ0XCIsIHNyYzogbGVmdEFycm93U1ZHIH0sIHt9KSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJhXCIsIHsgY2xhc3M6IFwiY29udHJvbHMgc2xpZGVybmF2QnRuXCIgfSwge30pLFxuICAgICAgY3JlYXRlRWxlbShcImFcIiwgeyBjbGFzczogXCJjb250cm9scyBzbGlkZXJuYXZCdG5cIiB9LCB7fSksXG4gICAgICBjcmVhdGVFbGVtKFwiYVwiLCB7IGNsYXNzOiBcImNvbnRyb2xzIHNsaWRlcm5hdkJ0blwiIH0sIHt9KSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiaW1nXCIsXG4gICAgICAgIHsgY2xhc3M6IFwiIGNvbnRyb2xzIHBhZ2UtcmlnaHRcIiwgc3JjOiByaWdodEFycm93U1ZHIH0sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgKVxuICApO1xuICBzbGlkZUFyci5mb3JFYWNoKChfLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBjbGFzczogXCJzbGlkZV9jb250YWluZXJcIixcbiAgICAgICAgaWQ6IGBzbGlkZS0ke2luZGV4ICsgMX1gLFxuICAgICAgICBcImRhdGEtcmVwb3J0XCI6IFwiaG91cmx5XCIsXG4gICAgICB9LFxuICAgICAge31cbiAgICApO1xuICAgIGZyYW1lLmFwcGVuZENoaWxkKGhvdXJseUNvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHNsaWRlck5hdkJ0bi5mb3JFYWNoKChpLCBpbmRleCkgPT4ge1xuICAgIGkuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI3NsaWRlLSR7aW5kZXggKyAxfWApO1xuICB9KTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX2NvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcm5hdkJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb250cm9sc1wiKTtcbiAgY29udHJvbHMuZm9yRWFjaCgoY3RybCkgPT4ge1xuICAgIGN0cmwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlX2NvbnRhaW5lclwiKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfY29udGFpbmVyLmFjdGl2ZVwiKTtcbiAgICAgIGNvbnN0IGN1cnJlbnROYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcm5hdkJ0bi5hY3RpdmVcIik7XG4gICAgICBjdHJsLmNsYXNzTGlzdC5jb250YWlucyhcInBhZ2UtbGVmdFwiKVxuICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlLmlkID09PSBcInNsaWRlLTFcIikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcmV2U2xpZGUgPSBjdXJyZW50U2xpZGUucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGNvbnN0IHByZXZOYXZCdG4gPSBjdXJyZW50TmF2QnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBjdXJyZW50TmF2QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHByZXZOYXZCdG4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHByZXZTbGlkZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgOiBjdHJsLmNsYXNzTGlzdC5jb250YWlucyhcInBhZ2UtcmlnaHRcIilcbiAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTbGlkZS5pZCA9PT0gXCJzbGlkZS0zXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlID0gY3VycmVudFNsaWRlLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGNvbnN0IG5leHROYXZCdG4gPSBjdXJyZW50TmF2QnRuLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGN1cnJlbnROYXZCdG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgbmV4dE5hdkJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgfSkoKVxuICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgY3VycmVudE5hdkJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzbGlkZS5pZCA9PT0gZS50YXJnZXQuYXR0cmlidXRlcy5ocmVmLnZhbHVlLnNsaWNlKDEpKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCBzbGlkZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1yZXBvcnQ9aG91cmx5XVwiKTtcbiAgc2xpZGVEaXYuZm9yRWFjaCgoZGl2LCBzbGlkZUluZGV4KSA9PiB7XG4gICAgY29uc3Qgc2xpZGVEYXRhID0gc2xpZGVBcnJbc2xpZGVJbmRleF07XG4gICAgc2xpZGVEYXRhLmZvckVhY2goKGksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0aW1lTmFtZSA9IGkuZGF0ZXRpbWUuc3BsaXQoXCI6XCIpLnNsaWNlKDAsIDIpLmpvaW4oXCI6XCIpO1xuICAgICAgbGV0IGhvdXJseVJlcG9ydCA9IGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogXCJmb3JlY2FzdC1ob3VybHlcIixcbiAgICAgICAgICBcImRhdGEtaG91clwiOiB0aW1lTmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJkaXZcIiwgeyBjbGFzczogXCJob3VyXCIgfSwge30sIGAke3RpbWVOYW1lfWApLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJ3ZWF0aGVyLWRhdGFcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImg0XCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcInRlbXAtaGlnaCB0ZW1wXCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgTWF0aC5yb3VuZChpLnRlbXApLFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcInN1cFwiLCB7fSwge30sIFwiwrBDXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJpbWdcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwiY29uZGl0aW9uXCIsIHNyYzogZ2V0Rm9yZWNhc3RDb25kaXRpb24oaS5pY29uKSB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBpZiAoc2xpZGVJbmRleCA9PT0gMCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IG5vdyAtIGZpcnN0RXBvY2g7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIb3VySW5kZXggPSBNYXRoLmZsb29yKHRpbWVEaWZmIC8gMzYwMCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRIb3VySW5kZXggPCBzbGlkZURhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgaG91cmx5UmVwb3J0ID0gY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzOiBcImZvcmVjYXN0LWhvdXJseVwiLFxuICAgICAgICAgICAgICBcImRhdGEtaG91clwiOiB0aW1lTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW0oXCJkaXZcIiwgeyBjbGFzczogXCJob3VyXCIgfSwge30sIGAke3RpbWVOYW1lfWApLFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBjbGFzczogXCJ3ZWF0aGVyLWRhdGFcIiB9LFxuICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgICAgICBcImg0XCIsXG4gICAgICAgICAgICAgICAgeyBjbGFzczogXCJ0ZW1wLWhpZ2ggdGVtcFwiIH0sXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzbGlkZURhdGFbY3VycmVudEhvdXJJbmRleF0udGVtcCksXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbShcInN1cFwiLCB7fSwge30sIFwiwrBDXCIpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgICAgXCJpbWdcIixcbiAgICAgICAgICAgICAgICB7IGNsYXNzOiBcImNvbmRpdGlvblwiLCBzcmM6IGdldEZvcmVjYXN0Q29uZGl0aW9uKGkuaWNvbikgfSxcbiAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGl2LmFwcGVuZENoaWxkKGhvdXJseVJlcG9ydCk7XG4gICAgfSk7XG4gIH0pO1xufVxuLy8jZW5kcmVnaW9uIGluaXRcbmNvbnN0IGNyZWF0ZVdlYXRoZXJBbGVydHMgPSAocXVlcnlEYXRhKSA9PlxuICBjcmVhdGVFbGVtKFxuICAgIFwiZGl2XCIsXG4gICAgeyBjbGFzczogXCJ3ZWF0aGVyLWFsZXJ0c19jb250YWluZXJcIiB9LFxuICAgIHt9LFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJ3ZWF0aGVyLWRlc2NfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcImgyXCIsIHsgY2xhc3M6IFwid2VhdGhlci1kZXNjLXRpdGxlXCIgfSwge30sIFwiRGVzY3JpcHRpb25cIiksXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcInBcIixcbiAgICAgICAgeyBjbGFzczogXCJ3ZWF0aGVyLWRlc2NfY29udGVudFwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBxdWVyeURhdGEuZGVzY3JpcHRpb25cbiAgICAgIClcbiAgICApLFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJleHRyZW1lLXdlYXRoZXJfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJoMlwiLFxuICAgICAgICB7IGNsYXNzOiBcImV4dHJlbWUtd2VhdGhlci10aXRsZVwiIH0sXG4gICAgICAgIHt9LFxuICAgICAgICBcIkV4dHJlbWUgV2VhdGhlciBBbGVydHNcIlxuICAgICAgKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwicFwiLFxuICAgICAgICB7IGNsYXNzOiBcImV4dHJlbWUtd2VhdGhlci1jb250ZW50XCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIHF1ZXJ5RGF0YS5hbGVydHMubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBcIk5vIGFsZXJ0cyB0byBkaXNwbGF5LlwiXG4gICAgICAgICAgOiBxdWVyeURhdGEuYWxlcnRzLmZvckVhY2goKGFsZXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGFsZXJ0O1xuICAgICAgICAgICAgfSlcbiAgICAgIClcbiAgICApXG4gICk7XG5cbmZ1bmN0aW9uIHNlbGVjdERpc3BsYXkoYnRuLCBxdWVyeURhdGEpIHtcbiAgY29uc3QgcmFuZ2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmdlLXNlbGVjdF9idG4uYWN0aXZlXCIpO1xuICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtd3JhcHBlclwiKTtcbiAgY29uc3Qgd2VhdGhlclJlcG9ydENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIud2VhdGhlci1yZXBvcnRfY29udGFpbmVyXCJcbiAgKTtcbiAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGJ0bi5pZCA9PT0gXCJkYWlseVwiKSB7XG4gICAgd2VhdGhlclJlcG9ydENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnRyb2xzLnJlbW92ZSgpO1xuICAgIGJ1aWxkRGFpbHlGb3JlY2FzdChxdWVyeURhdGEpO1xuICB9XG4gIGlmIChidG4uaWQgPT09IFwiaG91cmx5XCIpIHtcbiAgICB3ZWF0aGVyUmVwb3J0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYnVpbGRIb3VybHlGb3JlY2FzdChxdWVyeURhdGEpO1xuICB9XG4gIHJhbmdlQnRuPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBidG4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn1cblxuY29uc3QgY29udmVydFRlbXAgPSAodG9nZ2xlLCB0ZW1wKSA9PiB7XG4gIGxldCBjb252ZXJ0ZWRUZW1wO1xuICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAvL+KEgyB0byDihIlcbiAgICBjb252ZXJ0ZWRUZW1wID0gKHRlbXAgKiA5KSAvIDUgKyAzMjtcbiAgfVxuICBpZiAoIXRvZ2dsZS5jaGVja2VkKSB7XG4gICAgLy/ihIkgdG8g4oSDXG4gICAgY29udmVydGVkVGVtcCA9ICgodGVtcCAtIDMyKSAqIDUpIC8gOTtcbiAgfVxuICByZXR1cm4gY29udmVydGVkVGVtcDtcbn07XG5cbmZ1bmN0aW9uIGdldEZvcmVjYXN0Q29uZGl0aW9uKGljb24pIHtcbiAgaWYgKGljb24gPT09IFwiY2xlYXItZGF5XCIgfHwgaWNvbiA9PT0gXCJjbGVhci1uaWdodFwiKSB7XG4gICAgcmV0dXJuIHN1blNWRztcbiAgfVxuICBpZiAoaWNvbiA9PT0gXCJwYXJ0bHktY2xvdWR5LWRheVwiIHx8IGljb24gPT09IFwicGFydGx5LWNsb3VkeS1uaWdodFwiKSB7XG4gICAgcmV0dXJuIHN1bkNsb3VkU1ZHO1xuICB9XG4gIGlmIChpY29uID09PSBcImNsb3VkeVwiKSB7XG4gICAgcmV0dXJuIGNsb3VkU1ZHO1xuICB9XG4gIGlmIChpY29uID09PSBcImZvZ1wiKSB7XG4gICAgcmV0dXJuIGZvZ1NWRztcbiAgfVxuICBpZiAoaWNvbiA9PT0gXCJyYWluXCIpIHtcbiAgICByZXR1cm4gcmFpblNWRztcbiAgfVxuICBpZiAoaWNvbiA9PT0gXCJzbm93XCIpIHtcbiAgICByZXR1cm4gc25vd1NWRztcbiAgfVxuICBpZiAoXG4gICAgaWNvbiA9PT0gXCJ0aHVuZGVyLXJhaW5cIiB8fFxuICAgIGljb24gPT09IFwidGh1bmRlci0gc2hvd2Vycy1kYXlcIiB8fFxuICAgIGljb24gPT09IFwidGh1bmRlci1zaG93ZXJzLW5pZ2h0XCJcbiAgKSB7XG4gICAgcmV0dXJuIHN0b3JtU1ZHO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlRWxlbSA9ICh0YWcsIGF0dHIsIGxpc3RlbmVycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGZvciAoY29uc3Qga2V5IGluIGF0dHIpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyW2tleV0pO1xuICB9XG4gIGZvciAoY29uc3QgZXZlbnQgaW4gbGlzdGVuZXJzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2V2ZW50XSk7XG4gIH1cbiAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICB0eXBlb2YgY2hpbGQgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNoaWxkID09PSBcIm51bWJlclwiXG4gICAgICA/IGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKSlcbiAgICAgIDogZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICB9KTtcbiAgcmV0dXJuIGVsO1xufTtcbiIsIi8qKlxuICogQG1vZHVsZSBjb25zdGFudHNcbiAqIEBzdW1tYXJ5IFVzZWZ1bCBjb25zdGFudHNcbiAqIEBkZXNjcmlwdGlvblxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgZGF0ZSBjb25zdGFudHMuXG4gKlxuICogVGhlIGNvbnN0YW50cyBjb3VsZCBiZSBpbXBvcnRlZCBmcm9tIGBkYXRlLWZucy9jb25zdGFudHNgOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBtYXhUaW1lLCBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGZ1bmN0aW9uIGlzQWxsb3dlZFRpbWUodGltZSkge1xuICogICByZXR1cm4gdGltZSA8PSBtYXhUaW1lICYmIHRpbWUgPj0gbWluVGltZTtcbiAqIH1cbiAqIGBgYFxuICovXG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJbldlZWsgPSA3O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgZGF5c0luWWVhclxuICogQHN1bW1hcnkgRGF5cyBpbiAxIHllYXIuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBIb3cgbWFueSBkYXlzIGluIGEgeWVhci5cbiAqXG4gKiBPbmUgeWVhcnMgZXF1YWxzIDM2NS4yNDI1IGRheXMgYWNjb3JkaW5nIHRvIHRoZSBmb3JtdWxhOlxuICpcbiAqID4gTGVhcCB5ZWFyIG9jY3VyZXMgZXZlcnkgNCB5ZWFycywgZXhjZXB0IGZvciB5ZWFycyB0aGF0IGFyZSBkaXZpc2FibGUgYnkgMTAwIGFuZCBub3QgZGl2aXNhYmxlIGJ5IDQwMC5cbiAqID4gMSBtZWFuIHllYXIgPSAoMzY1KzEvNC0xLzEwMCsxLzQwMCkgZGF5cyA9IDM2NS4yNDI1IGRheXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJblllYXIgPSAzNjUuMjQyNTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBzdW1tYXJ5IE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtYXhUaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSA4NjQwMDAwMDAwMDAwMDAxIDw9IG1heFRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoODY0MDAwMDAwMDAwMDAwMSk7XG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAc3VtbWFyeSBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gLTg2NDAwMDAwMDAwMDAwMDEgPj0gbWluVGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSgtODY0MDAwMDAwMDAwMDAwMSlcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5UaW1lID0gLW1heFRpbWU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbldlZWsgPSA2MDQ4MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBtaW51dGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luTWludXRlID0gNjAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGhvdXJcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJblNlY29uZFxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJblllYXIgPSA1MjU2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Nb250aFxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIG1vbnRoLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luTW9udGggPSA0MzIwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkRheVxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkRheSA9IDE0NDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luUXVhcnRlciA9IDM7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblllYXIgPSAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAc3VtbWFyeSBRdWFydGVycyBpbiAxIHllYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHF1YXJ0ZXJzSW5ZZWFyID0gNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtaW51dGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5NaW51dGUgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkRheSA9IHNlY29uZHNJbkhvdXIgKiAyNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luV2VlayA9IHNlY29uZHNJbkRheSAqIDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5ZZWFyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblllYXIgPSBzZWNvbmRzSW5EYXkgKiBkYXlzSW5ZZWFyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTW9udGhcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtb250aFxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTW9udGggPSBzZWNvbmRzSW5ZZWFyIC8gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblF1YXJ0ZXIgPSBzZWNvbmRzSW5Nb250aCAqIDM7XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbkhvdXIsIG1pbGxpc2Vjb25kc0luTWludXRlIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgcGFyc2VJU099IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBwYXJzZUlTT1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBQYXJzZSBJU08gc3RyaW5nXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gc3RyaW5nIGluIElTTyA4NjAxIGZvcm1hdCBhbmQgcmV0dXJuIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpc24ndCBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIGNhbm5vdCBwYXJzZSB0aGUgc3RyaW5nIG9yXG4gKiB0aGUgdmFsdWVzIGFyZSBpbnZhbGlkLCBpdCByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJzIwMTQtMDItMTFUMTE6MzA6MzAnIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBwYXJzZUlTTygnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnKzAyMDE0MTAxJyB0byBkYXRlLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcrMDIwMTQxMDEnLCB7IGFkZGl0aW9uYWxEaWdpdHM6IDEgfSlcbiAqIC8vPT4gRnJpIEFwciAxMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUlTTyhhcmd1bWVudCwgb3B0aW9ucykge1xuICBjb25zdCBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucz8uYWRkaXRpb25hbERpZ2l0cyA/PyAyO1xuICBjb25zdCBkYXRlU3RyaW5ncyA9IHNwbGl0RGF0ZVN0cmluZyhhcmd1bWVudCk7XG5cbiAgbGV0IGRhdGU7XG4gIGlmIChkYXRlU3RyaW5ncy5kYXRlKSB7XG4gICAgY29uc3QgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpO1xuICAgIGRhdGUgPSBwYXJzZURhdGUocGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nLCBwYXJzZVllYXJSZXN1bHQueWVhcik7XG4gIH1cblxuICBpZiAoIWRhdGUgfHwgaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICBjb25zdCB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgbGV0IHRpbWUgPSAwO1xuICBsZXQgb2Zmc2V0O1xuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lKSB7XG4gICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcbiAgICBpZiAoaXNOYU4odGltZSkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lem9uZSkge1xuICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpO1xuICAgIGlmIChpc05hTihvZmZzZXQpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlydHlEYXRlID0gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSk7XG4gICAgLy8gSlMgcGFyc2VkIHN0cmluZyBhc3N1bWluZyBpdCdzIGluIFVUQyB0aW1lem9uZVxuICAgIC8vIGJ1dCB3ZSBuZWVkIGl0IHRvIGJlIHBhcnNlZCBpbiBvdXIgdGltZXpvbmVcbiAgICAvLyBzbyB3ZSB1c2UgdXRjIHZhbHVlcyB0byBidWlsZCBkYXRlIGluIG91ciB0aW1lem9uZS5cbiAgICAvLyBZZWFyIHZhbHVlcyBmcm9tIDAgdG8gOTkgbWFwIHRvIHRoZSB5ZWFycyAxOTAwIHRvIDE5OTlcbiAgICAvLyBzbyBzZXQgeWVhciBleHBsaWNpdGx5IHdpdGggc2V0RnVsbFllYXIuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldEZ1bGxZZWFyKFxuICAgICAgZGlydHlEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICBkaXJ0eURhdGUuZ2V0VVRDTW9udGgoKSxcbiAgICAgIGRpcnR5RGF0ZS5nZXRVVENEYXRlKCksXG4gICAgKTtcbiAgICByZXN1bHQuc2V0SG91cnMoXG4gICAgICBkaXJ0eURhdGUuZ2V0VVRDSG91cnMoKSxcbiAgICAgIGRpcnR5RGF0ZS5nZXRVVENNaW51dGVzKCksXG4gICAgICBkaXJ0eURhdGUuZ2V0VVRDU2Vjb25kcygpLFxuICAgICAgZGlydHlEYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpLFxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0KTtcbn1cblxuY29uc3QgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1pdGVyOiAvW1QgXS8sXG4gIHRpbWVab25lRGVsaW1pdGVyOiAvW1ogXS9pLFxuICB0aW1lem9uZTogLyhbWistXS4qKSQvLFxufTtcblxuY29uc3QgZGF0ZVJlZ2V4ID1cbiAgL14tPyg/OihcXGR7M30pfChcXGR7Mn0pKD86LT8oXFxkezJ9KSk/fFcoXFxkezJ9KSg/Oi0/KFxcZHsxfSkpP3wpJC87XG5jb25zdCB0aW1lUmVnZXggPVxuICAvXihcXGR7Mn0oPzpbLixdXFxkKik/KSg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8oPzo6PyhcXGR7Mn0oPzpbLixdXFxkKik/KSk/JC87XG5jb25zdCB0aW1lem9uZVJlZ2V4ID0gL14oWystXSkoXFxkezJ9KSg/Ojo/KFxcZHsyfSkpPyQvO1xuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcoZGF0ZVN0cmluZykge1xuICBjb25zdCBkYXRlU3RyaW5ncyA9IHt9O1xuICBjb25zdCBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMuZGF0ZVRpbWVEZWxpbWl0ZXIpO1xuICBsZXQgdGltZVN0cmluZztcblxuICAvLyBUaGUgcmVnZXggbWF0Y2ggc2hvdWxkIG9ubHkgcmV0dXJuIGF0IG1heGltdW0gdHdvIGFycmF5IGVsZW1lbnRzLlxuICAvLyBbZGF0ZV0sIFt0aW1lXSwgb3IgW2RhdGUsIHRpbWVdLlxuICBpZiAoYXJyYXkubGVuZ3RoID4gMikge1xuICAgIHJldHVybiBkYXRlU3RyaW5ncztcbiAgfVxuXG4gIGlmICgvOi8udGVzdChhcnJheVswXSkpIHtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF07XG4gIH0gZWxzZSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGFycmF5WzBdO1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXTtcbiAgICBpZiAocGF0dGVybnMudGltZVpvbmVEZWxpbWl0ZXIudGVzdChkYXRlU3RyaW5ncy5kYXRlKSkge1xuICAgICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMudGltZVpvbmVEZWxpbWl0ZXIpWzBdO1xuICAgICAgdGltZVN0cmluZyA9IGRhdGVTdHJpbmcuc3Vic3RyKFxuICAgICAgICBkYXRlU3RyaW5ncy5kYXRlLmxlbmd0aCxcbiAgICAgICAgZGF0ZVN0cmluZy5sZW5ndGgsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgY29uc3QgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZS5leGVjKHRpbWVTdHJpbmcpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgXCJcIik7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lem9uZSA9IHRva2VuWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0ZVN0cmluZ3M7XG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhcihkYXRlU3RyaW5nLCBhZGRpdGlvbmFsRGlnaXRzKSB7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICBcIl4oPzooXFxcXGR7NH18WystXVxcXFxke1wiICtcbiAgICAgICg0ICsgYWRkaXRpb25hbERpZ2l0cykgK1xuICAgICAgXCJ9KXwoXFxcXGR7Mn18WystXVxcXFxke1wiICtcbiAgICAgICgyICsgYWRkaXRpb25hbERpZ2l0cykgK1xuICAgICAgXCJ9KSQpXCIsXG4gICk7XG5cbiAgY29uc3QgY2FwdHVyZXMgPSBkYXRlU3RyaW5nLm1hdGNoKHJlZ2V4KTtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIHsgeWVhcjogTmFOLCByZXN0RGF0ZVN0cmluZzogXCJcIiB9O1xuXG4gIGNvbnN0IHllYXIgPSBjYXB0dXJlc1sxXSA/IHBhcnNlSW50KGNhcHR1cmVzWzFdKSA6IG51bGw7XG4gIGNvbnN0IGNlbnR1cnkgPSBjYXB0dXJlc1syXSA/IHBhcnNlSW50KGNhcHR1cmVzWzJdKSA6IG51bGw7XG5cbiAgLy8gZWl0aGVyIHllYXIgb3IgY2VudHVyeSBpcyBudWxsLCBub3QgYm90aFxuICByZXR1cm4ge1xuICAgIHllYXI6IGNlbnR1cnkgPT09IG51bGwgPyB5ZWFyIDogY2VudHVyeSAqIDEwMCxcbiAgICByZXN0RGF0ZVN0cmluZzogZGF0ZVN0cmluZy5zbGljZSgoY2FwdHVyZXNbMV0gfHwgY2FwdHVyZXNbMl0pLmxlbmd0aCksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlU3RyaW5nLCB5ZWFyKSB7XG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIGlmICh5ZWFyID09PSBudWxsKSByZXR1cm4gbmV3IERhdGUoTmFOKTtcblxuICBjb25zdCBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2goZGF0ZVJlZ2V4KTtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHN0cmluZ1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gbmV3IERhdGUoTmFOKTtcblxuICBjb25zdCBpc1dlZWtEYXRlID0gISFjYXB0dXJlc1s0XTtcbiAgY29uc3QgZGF5T2ZZZWFyID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1sxXSk7XG4gIGNvbnN0IG1vbnRoID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1syXSkgLSAxO1xuICBjb25zdCBkYXkgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzNdKTtcbiAgY29uc3Qgd2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNF0pO1xuICBjb25zdCBkYXlPZldlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzVdKSAtIDE7XG5cbiAgaWYgKGlzV2Vla0RhdGUpIHtcbiAgICBpZiAoIXZhbGlkYXRlV2Vla0RhdGUoeWVhciwgd2VlaywgZGF5T2ZXZWVrKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICAgIHJldHVybiBkYXlPZklTT1dlZWtZZWFyKHllYXIsIHdlZWssIGRheU9mV2Vlayk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGlmIChcbiAgICAgICF2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRheSkgfHxcbiAgICAgICF2YWxpZGF0ZURheU9mWWVhckRhdGUoeWVhciwgZGF5T2ZZZWFyKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIE1hdGgubWF4KGRheU9mWWVhciwgZGF5KSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPyBwYXJzZUludCh2YWx1ZSkgOiAxO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWUodGltZVN0cmluZykge1xuICBjb25zdCBjYXB0dXJlcyA9IHRpbWVTdHJpbmcubWF0Y2godGltZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIE5hTjsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHRpbWVcblxuICBjb25zdCBob3VycyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMV0pO1xuICBjb25zdCBtaW51dGVzID0gcGFyc2VUaW1lVW5pdChjYXB0dXJlc1syXSk7XG4gIGNvbnN0IHNlY29uZHMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzNdKTtcblxuICBpZiAoIXZhbGlkYXRlVGltZShob3VycywgbWludXRlcywgc2Vjb25kcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSArIHNlY29uZHMgKiAxMDAwXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiBwYXJzZUZsb2F0KHZhbHVlLnJlcGxhY2UoXCIsXCIsIFwiLlwiKSkpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUodGltZXpvbmVTdHJpbmcpIHtcbiAgaWYgKHRpbWV6b25lU3RyaW5nID09PSBcIlpcIikgcmV0dXJuIDA7XG5cbiAgY29uc3QgY2FwdHVyZXMgPSB0aW1lem9uZVN0cmluZy5tYXRjaCh0aW1lem9uZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIDA7XG5cbiAgY29uc3Qgc2lnbiA9IGNhcHR1cmVzWzFdID09PSBcIitcIiA/IC0xIDogMTtcbiAgY29uc3QgaG91cnMgPSBwYXJzZUludChjYXB0dXJlc1syXSk7XG4gIGNvbnN0IG1pbnV0ZXMgPSAoY2FwdHVyZXNbM10gJiYgcGFyc2VJbnQoY2FwdHVyZXNbM10pKSB8fCAwO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lem9uZShob3VycywgbWludXRlcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKiAoaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUpO1xufVxuXG5mdW5jdGlvbiBkYXlPZklTT1dlZWtZZWFyKGlzb1dlZWtZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGlzb1dlZWtZZWFyLCAwLCA0KTtcbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5RGF5ID0gZGF0ZS5nZXRVVENEYXkoKSB8fCA3O1xuICBjb25zdCBkaWZmID0gKHdlZWsgLSAxKSAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5O1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cbi8vIFZhbGlkYXRpb24gZnVuY3Rpb25zXG5cbi8vIEZlYnJ1YXJ5IGlzIG51bGwgdG8gaGFuZGxlIHRoZSBsZWFwIHllYXIgKHVzaW5nIHx8KVxuY29uc3QgZGF5c0luTW9udGhzID0gWzMxLCBudWxsLCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbmZ1bmN0aW9uIGlzTGVhcFllYXJJbmRleCh5ZWFyKSB7XG4gIHJldHVybiB5ZWFyICUgNDAwID09PSAwIHx8ICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSB7XG4gIHJldHVybiAoXG4gICAgbW9udGggPj0gMCAmJlxuICAgIG1vbnRoIDw9IDExICYmXG4gICAgZGF0ZSA+PSAxICYmXG4gICAgZGF0ZSA8PSAoZGF5c0luTW9udGhzW21vbnRoXSB8fCAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMjkgOiAyOCkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpIHtcbiAgcmV0dXJuIGRheU9mWWVhciA+PSAxICYmIGRheU9mWWVhciA8PSAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMzY2IDogMzY1KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVXZWVrRGF0ZShfeWVhciwgd2VlaywgZGF5KSB7XG4gIHJldHVybiB3ZWVrID49IDEgJiYgd2VlayA8PSA1MyAmJiBkYXkgPj0gMCAmJiBkYXkgPD0gNjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gIGlmIChob3VycyA9PT0gMjQpIHtcbiAgICByZXR1cm4gbWludXRlcyA9PT0gMCAmJiBzZWNvbmRzID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBzZWNvbmRzID49IDAgJiZcbiAgICBzZWNvbmRzIDwgNjAgJiZcbiAgICBtaW51dGVzID49IDAgJiZcbiAgICBtaW51dGVzIDwgNjAgJiZcbiAgICBob3VycyA+PSAwICYmXG4gICAgaG91cnMgPCAyNVxuICApO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWV6b25lKF9ob3VycywgbWludXRlcykge1xuICByZXR1cm4gbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPD0gNTk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgcGFyc2VJU087XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=