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
const createWeatherAlerts = (queryData) => {
  const alertsContent =
    queryData.alerts.length === 0
      ? "No alerts to display."
      : queryData.alerts
          .map((alert) => {
            console.log(
              alert.description
                .trim()
                .split("\n")
                .filter((desc) => desc.trim() !== "")
                .slice(0, 4)
            );
            return alert.description
              .trim()
              .split("\n")
              .filter((desc) => desc.trim() !== "")
              .map((desc) => desc.trim())
              .slice(0, 4)
              .join("\n");
          })
          .join("\n\n");

  const weatherAlertsContainer = (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
    "div",
    { class: "weather-alerts_container" },
    {},
    (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
      "div",
      { class: "weather-desc_container" },
      {},
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("h2", { class: "weather-desc-title" }, {}, "Current Weather"),
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)(
        "p",
        { class: "weather-desc_content" },
        {},
        queryData.description || "No description available."
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
      (0,_scripts_factory__WEBPACK_IMPORTED_MODULE_1__.createElem)("p", { class: "extreme-weather-content" }, {}, alertsContent)
    )
  );
  return weatherAlertsContainer;
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtQkFBbUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMU1vRTs7QUFFM0U7QUFDQSxRQUFRLGdCQUFnQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHFCQUFxQjtBQUMvRDtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7QUFDMUQ7QUFDQSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsd0JBQXdCLEVBQUU7QUFDNUQsa0NBQWtDLEVBQUUsVUFBVSxFQUFFOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxFQUFFLFNBQVM7QUFDekI7QUFDQSxRQUFRLE9BQU8sRUFBRSxTQUFTO0FBQzFCO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksOERBQWtCLGFBQWEsZ0VBQW9CO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qiw4REFBa0IsYUFBYSxnRUFBb0I7QUFDNUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLFFBQVEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hc3NldHMvaW1hZ2VzLyBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0cy9mYWN0b3J5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0YW50cy5tanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvcGFyc2VJU08ubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBtYXAgPSB7XG5cdFwiLi9jb21wYXNzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvY29tcGFzcy5zdmdcIixcblx0XCIuL2h1bWlkaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9sZWZ0LWFycm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGVmdC1hcnJvdy5zdmdcIixcblx0XCIuL291dHJ1bi5naWZcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL291dHJ1bi5naWZcIixcblx0XCIuL3JldHJvd2F2ZV9jbG91ZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9jbG91ZC5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9mb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfZm9nLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX21vb24tY2xvdWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfbW9vbi1jbG91ZC5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9tb29uLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcmV0cm93YXZlX21vb24uc3ZnXCIsXG5cdFwiLi9yZXRyb3dhdmVfcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9yYWluLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3Nub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfc25vdy5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9zdG9ybS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9zdG9ybS5zdmdcIixcblx0XCIuL3JldHJvd2F2ZV9zdW4tY2xvdWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9yZXRyb3dhdmVfc3VuLWNsb3VkLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3N1bi1zaG93ZXJzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvcmV0cm93YXZlX3N1bi1zaG93ZXJzLnN2Z1wiLFxuXHRcIi4vcmV0cm93YXZlX3N1bnNldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JldHJvd2F2ZV9zdW5zZXQuc3ZnXCIsXG5cdFwiLi9yaWdodC1hcnJvdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3JpZ2h0LWFycm93LnN2Z1wiLFxuXHRcIi4vc3BlZWQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ltYWdlcy9zcGVlZC5zdmdcIixcblx0XCIuL3RlbXBfaGFsZi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3RlbXBfaGFsZi5zdmdcIixcblx0XCIuL3VtYnJlbGxhLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pbWFnZXMvdW1icmVsbGEuc3ZnXCIsXG5cdFwiLi92ZWN0b3ItZ3JpZC5wbmdcIjogXCIuL3NyYy9hc3NldHMvaW1hZ2VzL3ZlY3Rvci1ncmlkLnBuZ1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaW1hZ2VzIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW0gfSBmcm9tIFwiLi9zY3JpcHRzL2ZhY3RvcnlcIjtcbmltcG9ydCB7IHBhcnNlLCBwYXJzZUlTTywgdG9EYXRlIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBjb25zdCBpbWFnZXBhdGggPSAobmFtZSkgPT4gaW1hZ2VzKG5hbWUsIHRydWUpO1xuXG5jb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1jb250ZW50XCIpO1xuY29uc3QgaW1hZ2VzID0gcmVxdWlyZS5jb250ZXh0KFwiLi4vc3JjL2Fzc2V0cy9pbWFnZXNcIiwgdHJ1ZSk7XG5cbmNvbnN0IHN1blNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX3N1bnNldC5zdmdcIik7XG5jb25zdCBjbG91ZFNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX2Nsb3VkLnN2Z1wiKTtcbmNvbnN0IGZvZ1NWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX2ZvZy5zdmdcIik7XG5jb25zdCByYWluU1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfcmFpbi5zdmdcIik7XG5jb25zdCBzbm93U1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfc25vdy5zdmdcIik7XG5jb25zdCBzdG9ybVNWRyA9IGltYWdlcGF0aChcIi4vcmV0cm93YXZlX3N0b3JtLnN2Z1wiKTtcbmNvbnN0IHN1bkNsb3VkU1ZHID0gaW1hZ2VwYXRoKFwiLi9yZXRyb3dhdmVfc3VuLWNsb3VkLnN2Z1wiKTtcbmNvbnN0IHN1blNob3dlcnNTVkcgPSBpbWFnZXBhdGgoXCIuL3JldHJvd2F2ZV9zdW4tc2hvd2Vycy5zdmdcIik7XG5jb25zdCBsZWZ0QXJyb3dTVkcgPSBpbWFnZXBhdGgoXCIuL2xlZnQtYXJyb3cuc3ZnXCIpO1xuY29uc3QgcmlnaHRBcnJvd1NWRyA9IGltYWdlcGF0aChcIi4vcmlnaHQtYXJyb3cuc3ZnXCIpO1xuY29uc3QgY29tcGFzc1NWRyA9IGltYWdlcGF0aChcIi4vY29tcGFzcy5zdmdcIik7XG5jb25zdCBzcGVlZFNWRyA9IGltYWdlcGF0aChcIi4vc3BlZWQuc3ZnXCIpO1xuY29uc3QgaHVtaWRpdHlTVkcgPSBpbWFnZXBhdGgoXCIuL2h1bWlkaXR5LnN2Z1wiKTtcbmNvbnN0IHVtYnJlbGxhU1ZHID0gaW1hZ2VwYXRoKFwiLi91bWJyZWxsYS5zdmdcIik7XG5jb25zdCB0ZW1wU1ZHID0gaW1hZ2VwYXRoKFwiLi90ZW1wX2hhbGYuc3ZnXCIpO1xuY29uc3Qgb3V0cnVuR0lGID0gaW1hZ2VwYXRoKFwiLi9vdXRydW4uZ2lmXCIpO1xuXG4vL2NoYW5nZSB0byBncmVldGluZyB3aXRoIHZhbHVlIGJhc2VkIG9uIFRvRFxubGV0IGdyZWV0aW5nID0gKCkgPT4ge1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgbGV0IGN1cnJlbnRUaW1lID0gK2RhdGUuc3BsaXQoXCIgXCIpLnNsaWNlKDQsIDUpWzBdLnNwbGl0KFwiOlwiKVswXTtcbiAgaWYgKGN1cnJlbnRUaW1lID49IDMgJiYgY3VycmVudFRpbWUgPCAxMikge1xuICAgIHJldHVybiBcIkdvb2QgTW9ybmluZ1wiO1xuICB9XG4gIGlmIChjdXJyZW50VGltZSA+PSAxMiAmJiBjdXJyZW50VGltZSA8IDE3KSB7XG4gICAgcmV0dXJuIFwiR29vZCBBZnRlcm5vb25cIjtcbiAgfVxuICBpZiAoY3VycmVudFRpbWUgPj0gMTcgJiYgY3VycmVudFRpbWUgPCAyMykge1xuICAgIHJldHVybiBcIkdvb2QgRXZlbmluZ1wiO1xuICB9XG4gIGlmIChjdXJyZW50VGltZSA+PSAwICYmIGN1cnJlbnRUaW1lIDwgMykge1xuICAgIHJldHVybiBcIkJ1cm5pbmcgdGhlIG1pZG5pZ2h0IG9pbC5cIjtcbiAgfVxufTtcbmdyZWV0aW5nKCk7XG5jb25zdCBnZXRVc2VyTG9jYXRpb24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJMb2NhdGlvbiBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gcmV2ZXJzZUdlbyhwb3NpdGlvbikge1xuICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICB9O1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkuZ2VvYXBpZnkuY29tL3YxL2dlb2NvZGUvcmV2ZXJzZT9sYXQ9JHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9Jmxvbj0ke3Bvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9JmFwaUtleT00Yjc0MzM4MTFhMWI0YTNkYjQ0MWU0MDNmZmE0MGU5ZGAsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0V2VhdGhlckRhdGEoa2V5d29yZCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvJHtrZXl3b3JkfT91bml0R3JvdXA9bWV0cmljJmtleT01WVdWOVpEQlg0TEtTWkM0OExIRlFQTldIJmNvbnRlbnRUeXBlPWpzb25gLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBsZXQgY2l0eSA9IGtleXdvcmQ7XG4gICAgaWYgKCFpc05hTihwYXJzZUZsb2F0KGtleXdvcmQuc3BsaXQoXCIsXCIpWzBdKSkpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICBjb29yZHM6IHtcbiAgICAgICAgICBsYXRpdHVkZTogcGFyc2VGbG9hdChrZXl3b3JkLnNwbGl0KFwiLFwiKVswXSksXG4gICAgICAgICAgbG9uZ2l0dWRlOiBwYXJzZUZsb2F0KGtleXdvcmQuc3BsaXQoXCIsXCIpWzFdKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgcmV2ZXJzZUdlbyhwb3NpdGlvbik7XG4gICAgICBjaXR5ID0gYWRkcmVzcy5mZWF0dXJlc1swXS5wcm9wZXJ0aWVzLmNpdHk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVwb3J0UXVlcnkgPSB7IGNpdHksIHdlYXRoZXJEYXRhIH07XG5cbiAgICBjb25zdCBjaXR5TmFtZSA9IHJlcG9ydFF1ZXJ5LmNpdHk7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gcmVwb3J0UXVlcnkud2VhdGhlckRhdGE7XG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kRGlyZWN0aW9uKHdpbmRkaXIpIHtcbiAgICAgIGlmICh3aW5kZGlyID09PSAwIHx8IHdpbmRkaXIgPT09IDM2MCkge1xuICAgICAgICByZXR1cm4gXCJOIOKshlwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiAwICYmIHdpbmRkaXIgPCA5MCkge1xuICAgICAgICByZXR1cm4gXCJORSDihpdcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID09PSA5MCkge1xuICAgICAgICByZXR1cm4gXCJFIOKeoVwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiA5MCAmJiB3aW5kZGlyIDwgMTgwKSB7XG4gICAgICAgIHJldHVybiBcIlNFIOKGmFwiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPT09IDE4MCkge1xuICAgICAgICByZXR1cm4gXCJTIOKsh1wiO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRkaXIgPiAxODAgJiYgd2luZGRpciA8IDI3MCkge1xuICAgICAgICByZXR1cm4gXCJTVyDihplcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID09PSAyNzApIHtcbiAgICAgICAgcmV0dXJuIFwiVyDirIVcIjtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kZGlyID4gMjcwICYmIHdpbmRkaXIgPCAzNTkpIHtcbiAgICAgICAgcmV0dXJuIFwiTlcg4oaWXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFdlYXRoZXJDb25kaXRpb24oY3VycmVudENvbmRpdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyZW50Q29uZGl0aW9uID09PSBcImNsZWFyLWRheVwiIHx8XG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwiY2xlYXItbmlnaHRcIlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdW5TVkc7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwicGFydGx5LWNsb3VkeS1kYXlcIiB8fFxuICAgICAgICBjdXJyZW50Q29uZGl0aW9uID09PSBcInBhcnRseS1jbG91ZHktbmlnaHRcIlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdW5DbG91ZFNWRztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29uZGl0aW9uID09PSBcImNsb3VkeVwiKSB7XG4gICAgICAgIHJldHVybiBjbG91ZFNWRztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29uZGl0aW9uID09PSBcImZvZ1wiKSB7XG4gICAgICAgIHJldHVybiBmb2dTVkc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbmRpdGlvbiA9PT0gXCJyYWluXCIpIHtcbiAgICAgICAgcmV0dXJuIHJhaW5TVkc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbmRpdGlvbiA9PT0gXCJzbm93XCIpIHtcbiAgICAgICAgcmV0dXJuIHNub3dTVkc7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwidGh1bmRlci1yYWluXCIgfHxcbiAgICAgICAgY3VycmVudENvbmRpdGlvbiA9PT0gXCJ0aHVuZGVyLSBzaG93ZXJzLWRheVwiIHx8XG4gICAgICAgIGN1cnJlbnRDb25kaXRpb24gPT09IFwidGh1bmRlci1zaG93ZXJzLW5pZ2h0XCJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gc3Rvcm1TVkc7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9ucyA9IGdldFdlYXRoZXJDb25kaXRpb24oXG4gICAgICBxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuaWNvblxuICAgICk7XG5cbiAgICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZ2V0V2luZERpcmVjdGlvbihxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMud2luZGRpcik7XG4gICAgY29uc3Qgd2VhdGhlclByaW1hcnlJbmZvID0gY3JlYXRlV2VhdGhlclByaW1hcnlJbmZvKFxuICAgICAgY2l0eU5hbWUsXG4gICAgICBxdWVyeURhdGEsXG4gICAgICB3ZWF0aGVyQ29uZGl0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBjcmVhdGVGb3JlY2FzdChxdWVyeURhdGEpO1xuICAgIGNvbnN0IHdlYXRoZXJTZWNvbmRhcnlJbmZvID0gY3JlYXRlV2VhdGhlclNlY29uZGFyeUluZm8oXG4gICAgICBxdWVyeURhdGEsXG4gICAgICB3aW5kRGlyZWN0aW9uXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyQWxlcnRzID0gY3JlYXRlV2VhdGhlckFsZXJ0cyhxdWVyeURhdGEpO1xuICAgIG1haW5Db250ZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBjcmVhdGVIZWFkZXJDb250YWluZXIoKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChoZWFkZXJDb250YWluZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKHdlYXRoZXJQcmltYXJ5SW5mbyk7XG4gICAgd2VhdGhlclByaW1hcnlJbmZvLmFwcGVuZENoaWxkKGZvcmVjYXN0KTtcbiAgICBidWlsZERhaWx5Rm9yZWNhc3QocXVlcnlEYXRhKTtcblxuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKHdlYXRoZXJBbGVydHMpO1xuICAgIHdlYXRoZXJQcmltYXJ5SW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyU2Vjb25kYXJ5SW5mbyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtZXJyb3JcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufVxuXG4oYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgZ2V0VXNlckxvY2F0aW9uKCk7XG4gICAgY29uc3Qga2V5d29yZCA9IGAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sICR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gO1xuICAgIGF3YWl0IGluaXRXZWF0aGVyRGF0YShrZXl3b3JkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogJHtlcnJvcn1gKTtcbiAgfVxufSkoKTtcblxuLy8jcmVnaW9uIGluaXRcbmNvbnN0IGNyZWF0ZUhlYWRlckNvbnRhaW5lciA9ICgpID0+IHtcbiAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gY3JlYXRlRWxlbShcbiAgICBcImRpdlwiLFxuICAgIHsgY2xhc3M6IFwiaGVhZGVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZ3JlZXRpbmdfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcImgyXCIsIHsgY2xhc3M6IFwiZ3JlZXRpbmdcIiB9LCB7fSwgXCJIRUxMTyBUSEVSRSwgXCIpLFxuICAgICAgY3JlYXRlRWxlbShcInNwYW5cIiwgeyBjbGFzczogXCJ0b2QtZ3JlZXRpbmdcIiB9LCB7fSwgYCR7Z3JlZXRpbmcoKX1gKVxuICAgICksXG4gICAgY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBcInNlYXJjaC1iYXJfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgIHsgY2xhc3M6IFwibG9jYXRpb24tZm9ybVwiIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJtaXQ6IChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFZhbHVlID0gc2VhcmNoLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hWYWx1ZSkge1xuICAgICAgICAgICAgICBpbml0V2VhdGhlckRhdGEoc2VhcmNoVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgY2xhc3M6IFwibG9jYXRpb24tc2VhcmNoX2lucHV0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJTZWFyY2ggTG9jYXRpb24uLi5cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9XG4gICAgICAgICksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7IGNsYXNzOiBcInNlYXJjaF9idG5cIiwgdHlwZTogXCJzdWJtaXRcIiwgZm9ybTogXCJzZWFyY2hcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsaWNrOiAoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpO1xuICAgICAgICAgICAgICBjb25zdCBzZWFyY2hWYWx1ZSA9IHNlYXJjaC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgIGlmIChzZWFyY2hWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRXZWF0aGVyRGF0YShzZWFyY2hWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIlNFQVJDSFwiXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFwicFwiLCB7IGNsYXNzOiBcInNlYXJjaC1lcnJvclwiIH0sIHt9LCBcIkxvY2F0aW9uIG5vdCBmb3VuZC5cIilcbiAgICApLFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJ1bml0LXRvZ2dsZV9jb250YWluZXJcIiB9LFxuICAgICAge30sXG4gICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCJ1bml0LXRpdGxlXCIgfSwge30sIFwiU0VMRUNUIFVOSVRTXCIpLFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJ1bml0LXRvZ2dsZV93cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJwXCIsIHsgY2xhc3M6IFwiY2Vsc2l1c1wiIH0sIHt9LCBcIsKwQ1wiKSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzd2l0Y2hcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImlucHV0XCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcInVuaXQtdG9nZ2xlXCIsIHR5cGU6IFwiY2hlY2tib3hcIiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVtcFwiKTtcbiAgICAgICAgICAgICAgICB0ZW1wRWxlbWVudHMuZm9yRWFjaCgodGVtcEVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGVtcCA9IHBhcnNlRmxvYXQodGVtcEVsLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZFRlbXAgPSBjb252ZXJ0VGVtcCh0b2dnbGUsIGN1cnJlbnRUZW1wKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoY29udmVydGVkVGVtcCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdXBFbCA9IGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgICAgICAgIFwic3VwXCIsXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLmNoZWNrZWQgPyBcIsKwRlwiIDogXCLCsENcIlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBFbC5hcHBlbmRDaGlsZChzdXBFbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwic3BhblwiLCB7IGNsYXNzOiBcInNsaWRlclwiIH0sIHt9KVxuICAgICAgICApLFxuICAgICAgICBjcmVhdGVFbGVtKFwicFwiLCB7IGNsYXNzOiBcImZhaHJlbmhlaXRcIiB9LCB7fSwgXCLCsEZcIilcbiAgICAgIClcbiAgICApXG4gICk7XG4gIHJldHVybiBoZWFkZXJDb250YWluZXI7XG59O1xuXG5jb25zdCBjcmVhdGVXZWF0aGVyUHJpbWFyeUluZm8gPSAoY2l0eU5hbWUsIHF1ZXJ5RGF0YSwgd2VhdGhlckNvbmRpdGlvbnMpID0+XG4gIGNyZWF0ZUVsZW0oXG4gICAgXCJkaXZcIixcbiAgICB7IGNsYXNzOiBcInByaW1hcnktaW5mb19jb250YWluZXJcIiB9LFxuICAgIHt9LFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJjdXJyZW50LXdlYXRoZXJfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJnZW5lcmFsLWluZm9fY29udGFpbmVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcImdlbmVyYWwtdG9wX3dyYXBwZXJcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXCJoMlwiLCB7IGNsYXNzOiBcImxvY2F0aW9uXCIgfSwge30sIGNpdHlOYW1lKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJpbWdcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwid2VhdGhlci1jb25kaXRpb24taWNvblwiLCBzcmM6IHdlYXRoZXJDb25kaXRpb25zIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwiZ2VuZXJhbC1ib3R0b21fd3JhcHBlclwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcImZsZXgtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgY2xhc3M6IFwiZmxleC1zdWItd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgICAgICB7IGNsYXNzOiBcImRhdGVcIiB9LFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIERhdGUocXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLmRhdGV0aW1lKVxuICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgICAgLnNsaWNlKDEsIDQpXG4gICAgICAgICAgICAgICAgICAuam9pbihcIiBcIilcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgICAgICBcImg1XCIsXG4gICAgICAgICAgICAgICAgeyBjbGFzczogXCJ0aW1lXCIgfSxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICBxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuZGF0ZXRpbWVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICAgIFwiaDFcIixcbiAgICAgICAgICAgICAgeyBjbGFzczogXCJ0ZW1wZXJhdHVyZSB0ZW1wXCIgfSxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIGAke01hdGgucm91bmQocXVlcnlEYXRhLmN1cnJlbnRDb25kaXRpb25zLnRlbXApfWAsXG4gICAgICAgICAgICAgIGNyZWF0ZUVsZW0oXCJzdXBcIiwgeyBjbGFzczogXCJsYXJnZVwiIH0sIHt9LCBcIsKwQ1wiKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG5cbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoMlwiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJ3ZWF0aGVyLWNvbmRpdGlvbi1kZXNjcmlwdGlvblwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIHF1ZXJ5RGF0YS5jdXJyZW50Q29uZGl0aW9ucy5jb25kaXRpb25zXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICApO1xuY29uc3QgY3JlYXRlRm9yZWNhc3QgPSAocXVlcnlEYXRhKSA9PlxuICBjcmVhdGVFbGVtKFxuICAgIFwiZGl2XCIsXG4gICAgeyBjbGFzczogXCJmb3JlY2FzdF9jb250YWluZXJcIiB9LFxuICAgIHt9LFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJmb3JlY2FzdC1jb250cm9sc1wiIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwiZm9yZWNhc3QtcmFuZ2Utc2VsZWN0XCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7IGNsYXNzOiBcInJhbmdlLXNlbGVjdF9idG4gYWN0aXZlXCIsIGlkOiBcImRhaWx5XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGljazogKGUpID0+IHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBzZWxlY3REaXNwbGF5KGUudGFyZ2V0LCBxdWVyeURhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiREFJTFlcIlxuICAgICAgICApLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgeyBjbGFzczogXCJyYW5nZS1zZWxlY3RfYnRuXCIsIGlkOiBcImhvdXJseVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgc2VsZWN0RGlzcGxheShlLnRhcmdldCwgcXVlcnlEYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkhPVVJMWVwiXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBjcmVhdGVFbGVtKFwiZGl2XCIsIHsgY2xhc3M6IFwicGFnaW5hdGlvbi1jb250cm9sc1wiIH0sIHt9KVxuICAgICksXG4gICAgY3JlYXRlRWxlbShcImRpdlwiLCB7IGNsYXNzOiBcIndlYXRoZXItcmVwb3J0X2NvbnRhaW5lclwiIH0sIHt9KVxuICApO1xuXG5jb25zdCBjcmVhdGVXZWF0aGVyU2Vjb25kYXJ5SW5mbyA9IChxdWVyeURhdGEsIHdpbmREaXJlY3Rpb24pID0+XG4gIGNyZWF0ZUVsZW0oXG4gICAgXCJkaXZcIixcbiAgICB7IGNsYXNzOiBcInNlY29uZGFyeS13ZWF0aGVyLWluZm9fY29udGFpbmVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LXdlYXRoZXJfY29udGFpbmVyXCIgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktaW5mby1mbGV4LXdyYXBwZXJcIiB9LFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlRWxlbShcImltZ1wiLCB7IGNsYXNzOiBcInNlY29uZGFyeS1zdmdcIiwgc3JjOiB0ZW1wU1ZHIH0sIHt9KSxcbiAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnQtd3JhcHBlclwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcImgzXCIsIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWNvbnRlbnQgXCIgfSwge30sIFwiRkVFTFMgTElLRVwiKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJmZWVscy1saWtlIHRlbXBcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMuZmVlbHNsaWtlLFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcInN1cFwiLCB7fSwge30sIFwiwrBDXCIpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktaW5mby1mbGV4LXdyYXBwZXJcIiB9LFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlRWxlbShcImltZ1wiLCB7IGNsYXNzOiBcInNlY29uZGFyeS1zdmdcIiwgc3JjOiBodW1pZGl0eVNWRyB9LCB7fSksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXCJoM1wiLCB7IGNsYXNzOiBcIiBzZWNvbmRhcnktY29udGVudCBcIiB9LCB7fSwgXCJIVU1JRElUWVwiKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJodW1pZGl0eS1pbmRleFwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGAke3F1ZXJ5RGF0YS5jdXJyZW50Q29uZGl0aW9ucy5odW1pZGl0eX0lYFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWluZm8tZmxleC13cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktc3ZnXCIsIHNyYzogdW1icmVsbGFTVkcgfSwge30pLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudFwiIH0sIHt9LCBcIlAuTy5QLlwiKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJwb3BcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBgJHtxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMucHJlY2lwcHJvYn0lYFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWluZm8tZmxleC13cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktc3ZnXCIsIHNyYzogc3BlZWRTVkcgfSwge30pLFxuICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktY29udGVudCBcIiB9LCB7fSwgXCJXSU5EIFNQRUVEXCIpLFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcIndpbmQtc3BlZWRcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBgJHtxdWVyeURhdGEuY3VycmVudENvbmRpdGlvbnMud2luZHNwZWVkfSBLTS9IYFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwic2Vjb25kYXJ5LWluZm8tZmxleC13cmFwcGVyXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJzZWNvbmRhcnktc3ZnXCIsIHNyYzogY29tcGFzc1NWRyB9LCB7fSksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICB7IGNsYXNzOiBcInNlY29uZGFyeS1jb250ZW50XCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgXCJXSU5EIERJUkVDVElPTlwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFwiaDNcIiwgeyBjbGFzczogXCJ3aW5kLWRpcmVjdGlvblwiIH0sIHt9LCB3aW5kRGlyZWN0aW9uKVxuICAgICAgICApXG4gICAgICApXG4gICAgKSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwiZ2lmLWNvbnRhaW5lclwiIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJvdXRydW5HSUZcIiwgc3JjOiBvdXRydW5HSUYgfSwge30pXG4gICAgKVxuICApO1xuXG5mdW5jdGlvbiBidWlsZERhaWx5Rm9yZWNhc3QocXVlcnlEYXRhKSB7XG4gIGNvbnN0IGRhaWx5QXJyID0gWy4uLnF1ZXJ5RGF0YS5kYXlzLnNsaWNlKDEsIDgpXTtcbiAgY29uc3Qgd2Vla2RheSA9IFtcbiAgICBcIlNVTkRBWVwiLFxuICAgIFwiTU9OREFZXCIsXG4gICAgXCJUVUVTREFZXCIsXG4gICAgXCJXRURORVNEQVlcIixcbiAgICBcIlRIVVJTREFZXCIsXG4gICAgXCJGUklEQVlcIixcbiAgICBcIlNBVFVSREFZXCIsXG4gIF07XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1yZXBvcnRfY29udGFpbmVyXCIpXG4gICAgLmFwcGVuZENoaWxkKFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBjbGFzczogXCJzbGlkZV9jb250YWluZXIgYWN0aXZlXCIsIFwiZGF0YS1yZXBvcnRcIjogXCJkYWlseVwiIH0sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgKTtcblxuICBkYWlseUFyci5mb3JFYWNoKChpKSA9PiB7XG4gICAgY29uc3QgZGF5TmFtZSA9IHBhcnNlSVNPKGkuZGF0ZXRpbWUpO1xuICAgIGxldCBkYWlseVJlcG9ydCA9IGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJmb3JlY2FzdC1kYWlseVwiLCBcImRhdGEtZGF5XCI6IGRheU5hbWUuZ2V0RGF5KCkgfSxcbiAgICAgIHt9LFxuICAgICAgY3JlYXRlRWxlbShcImRpdlwiLCB7IGNsYXNzOiBcImRheVwiIH0sIHt9LCB3ZWVrZGF5W2RheU5hbWUuZ2V0RGF5KCldKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgY2xhc3M6IFwid2VhdGhlci1kYXRhXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcInRlbXAtY29udGFpbmVyXCIgfSxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoNFwiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJ0ZW1wLWhpZ2ggdGVtcFwiIH0sXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIGAke01hdGgucm91bmQoaS50ZW1wbWF4KX1gLFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcInN1cFwiLCB7fSwge30sIFwiwrBDXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJoNVwiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJ0ZW1wLWxvdyB0ZW1wXCIgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgYCR7TWF0aC5yb3VuZChpLnRlbXBtaW4pfWAsXG4gICAgICAgICAgICBjcmVhdGVFbGVtKFwic3VwXCIsIHt9LCB7fSwgXCLCsENcIilcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJpbWdcIixcbiAgICAgICAgICB7IGNsYXNzOiBcImNvbmRpdGlvblwiLCBzcmM6IGdldEZvcmVjYXN0Q29uZGl0aW9uKGkuaWNvbikgfSxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlX2NvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChkYWlseVJlcG9ydCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEhvdXJseUZvcmVjYXN0KHF1ZXJ5RGF0YSkge1xuICBjb25zdCBub3cgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgY29uc3QgZmlyc3RFcG9jaCA9IHF1ZXJ5RGF0YS5kYXlzWzBdLmhvdXJzWzBdLmRhdGV0aW1lRXBvY2g7XG4gIGNvbnN0IGRheXMgPSBxdWVyeURhdGEuZGF5cztcbiAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItcmVwb3J0X2NvbnRhaW5lclwiKTtcbiAgY29uc3Qgc2xpZGVBcnIgPSBbW10sIFtdLCBbXV07XG5cbiAgY29uc3QgY3VycmVudERheUhvdXJzID0gZGF5c1swXS5ob3Vycy5maWx0ZXIoKGhyKSA9PiBub3cgPCBoci5kYXRldGltZUVwb2NoKTtcbiAgY3VycmVudERheUhvdXJzLmZvckVhY2goKGhvdXIsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4IDwgOCkge1xuICAgICAgc2xpZGVBcnJbMF0ucHVzaChob3VyKTtcbiAgICB9IGVsc2UgaWYgKGluZGV4IDwgMTYpIHtcbiAgICAgIHNsaWRlQXJyWzFdLnB1c2goaG91cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlQXJyWzNdLnB1c2goaG91cik7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBkYXkgb2YgZGF5cy5zbGljZSgxKSkge1xuICAgIGlmIChub3cgPCBkYXkuZGF0ZXRpbWVFcG9jaCkge1xuICAgICAgY29uc3QgbmV4dERheUhvdXJzID0gZGF5LmhvdXJzLmZpbHRlcigoaHIpID0+IG5vdyA8IGhyLmRhdGV0aW1lRXBvY2gpO1xuICAgICAgbmV4dERheUhvdXJzLmZvckVhY2goKGhvdXIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChzbGlkZUFyclswXS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgc2xpZGVBcnJbMF0ucHVzaChob3VyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZUFyclsxXS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgc2xpZGVBcnJbMV0ucHVzaChob3VyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZUFyclsyXS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgc2xpZGVBcnJbMl0ucHVzaChob3VyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzbGlkZXJOYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlcm5hdkJ0blwiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdpbmF0aW9uLWNvbnRyb2xzXCIpLmFwcGVuZENoaWxkKFxuICAgIGNyZWF0ZUVsZW0oXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBjbGFzczogXCJjb250cm9scy13cmFwcGVyXCIgfSxcbiAgICAgIHtcbiAgICAgICAgY29udGV4dG1lbnU6IChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJpbWdcIiwgeyBjbGFzczogXCJjb250cm9scyBwYWdlLWxlZnRcIiwgc3JjOiBsZWZ0QXJyb3dTVkcgfSwge30pLFxuICAgICAgY3JlYXRlRWxlbShcImFcIiwgeyBjbGFzczogXCJjb250cm9scyBzbGlkZXJuYXZCdG5cIiB9LCB7fSksXG4gICAgICBjcmVhdGVFbGVtKFwiYVwiLCB7IGNsYXNzOiBcImNvbnRyb2xzIHNsaWRlcm5hdkJ0blwiIH0sIHt9KSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJhXCIsIHsgY2xhc3M6IFwiY29udHJvbHMgc2xpZGVybmF2QnRuXCIgfSwge30pLFxuICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgXCJpbWdcIixcbiAgICAgICAgeyBjbGFzczogXCIgY29udHJvbHMgcGFnZS1yaWdodFwiLCBzcmM6IHJpZ2h0QXJyb3dTVkcgfSxcbiAgICAgICAge31cbiAgICAgIClcbiAgICApXG4gICk7XG4gIHNsaWRlQXJyLmZvckVhY2goKF8sIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaG91cmx5Q29udGFpbmVyID0gY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIGNsYXNzOiBcInNsaWRlX2NvbnRhaW5lclwiLFxuICAgICAgICBpZDogYHNsaWRlLSR7aW5kZXggKyAxfWAsXG4gICAgICAgIFwiZGF0YS1yZXBvcnRcIjogXCJob3VybHlcIixcbiAgICAgIH0sXG4gICAgICB7fVxuICAgICk7XG4gICAgZnJhbWUuYXBwZW5kQ2hpbGQoaG91cmx5Q29udGFpbmVyKTtcbiAgfSk7XG5cbiAgc2xpZGVyTmF2QnRuLmZvckVhY2goKGksIGluZGV4KSA9PiB7XG4gICAgaS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjc2xpZGUtJHtpbmRleCArIDF9YCk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVfY29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVybmF2QnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRyb2xzXCIpO1xuICBjb250cm9scy5mb3JFYWNoKChjdHJsKSA9PiB7XG4gICAgY3RybC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVfY29udGFpbmVyXCIpO1xuICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZV9jb250YWluZXIuYWN0aXZlXCIpO1xuICAgICAgY29uc3QgY3VycmVudE5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVybmF2QnRuLmFjdGl2ZVwiKTtcbiAgICAgIGN0cmwuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZS1sZWZ0XCIpXG4gICAgICAgID8gKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2xpZGUuaWQgPT09IFwic2xpZGUtMVwiKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHByZXZTbGlkZSA9IGN1cnJlbnRTbGlkZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgY29uc3QgcHJldk5hdkJ0biA9IGN1cnJlbnROYXZCdG4ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGN1cnJlbnROYXZCdG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgcHJldk5hdkJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgcHJldlNsaWRlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgfSkoKVxuICAgICAgICA6IGN0cmwuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZS1yaWdodFwiKVxuICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlLmlkID09PSBcInNsaWRlLTNcIikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0U2xpZGUgPSBjdXJyZW50U2xpZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgY29uc3QgbmV4dE5hdkJ0biA9IGN1cnJlbnROYXZCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgY3VycmVudE5hdkJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBuZXh0TmF2QnRuLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICB9KSgpXG4gICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBjdXJyZW50TmF2QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlLmlkID09PSBlLnRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUuc2xpY2UoMSkpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHNsaWRlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJlcG9ydD1ob3VybHldXCIpO1xuICBzbGlkZURpdi5mb3JFYWNoKChkaXYsIHNsaWRlSW5kZXgpID0+IHtcbiAgICBjb25zdCBzbGlkZURhdGEgPSBzbGlkZUFycltzbGlkZUluZGV4XTtcbiAgICBzbGlkZURhdGEuZm9yRWFjaCgoaSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVOYW1lID0gaS5kYXRldGltZS5zcGxpdChcIjpcIikuc2xpY2UoMCwgMikuam9pbihcIjpcIik7XG4gICAgICBsZXQgaG91cmx5UmVwb3J0ID0gY3JlYXRlRWxlbShcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBcImZvcmVjYXN0LWhvdXJseVwiLFxuICAgICAgICAgIFwiZGF0YS1ob3VyXCI6IHRpbWVOYW1lLFxuICAgICAgICB9LFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlRWxlbShcImRpdlwiLCB7IGNsYXNzOiBcImhvdXJcIiB9LCB7fSwgYCR7dGltZU5hbWV9YCksXG4gICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzOiBcIndlYXRoZXItZGF0YVwiIH0sXG4gICAgICAgICAge30sXG4gICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgIHsgY2xhc3M6IFwidGVtcC1oaWdoIHRlbXBcIiB9LFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGkudGVtcCksXG4gICAgICAgICAgICBjcmVhdGVFbGVtKFwic3VwXCIsIHt9LCB7fSwgXCLCsENcIilcbiAgICAgICAgICApLFxuICAgICAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgICAgICBcImltZ1wiLFxuICAgICAgICAgICAgeyBjbGFzczogXCJjb25kaXRpb25cIiwgc3JjOiBnZXRGb3JlY2FzdENvbmRpdGlvbihpLmljb24pIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGlmIChzbGlkZUluZGV4ID09PSAwICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHRpbWVEaWZmID0gbm93IC0gZmlyc3RFcG9jaDtcbiAgICAgICAgY29uc3QgY3VycmVudEhvdXJJbmRleCA9IE1hdGguZmxvb3IodGltZURpZmYgLyAzNjAwKTtcblxuICAgICAgICBpZiAoY3VycmVudEhvdXJJbmRleCA8IHNsaWRlRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICBob3VybHlSZXBvcnQgPSBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IFwiZm9yZWNhc3QtaG91cmx5XCIsXG4gICAgICAgICAgICAgIFwiZGF0YS1ob3VyXCI6IHRpbWVOYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgY3JlYXRlRWxlbShcImRpdlwiLCB7IGNsYXNzOiBcImhvdXJcIiB9LCB7fSwgYCR7dGltZU5hbWV9YCksXG4gICAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzOiBcIndlYXRoZXItZGF0YVwiIH0sXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBjcmVhdGVFbGVtKFxuICAgICAgICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICAgICAgICB7IGNsYXNzOiBcInRlbXAtaGlnaCB0ZW1wXCIgfSxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHNsaWRlRGF0YVtjdXJyZW50SG91ckluZGV4XS50ZW1wKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtKFwic3VwXCIsIHt9LCB7fSwgXCLCsENcIilcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgY3JlYXRlRWxlbShcbiAgICAgICAgICAgICAgICBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHsgY2xhc3M6IFwiY29uZGl0aW9uXCIsIHNyYzogZ2V0Rm9yZWNhc3RDb25kaXRpb24oaS5pY29uKSB9LFxuICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoaG91cmx5UmVwb3J0KTtcbiAgICB9KTtcbiAgfSk7XG59XG4vLyNlbmRyZWdpb24gaW5pdFxuY29uc3QgY3JlYXRlV2VhdGhlckFsZXJ0cyA9IChxdWVyeURhdGEpID0+IHtcbiAgY29uc3QgYWxlcnRzQ29udGVudCA9XG4gICAgcXVlcnlEYXRhLmFsZXJ0cy5sZW5ndGggPT09IDBcbiAgICAgID8gXCJObyBhbGVydHMgdG8gZGlzcGxheS5cIlxuICAgICAgOiBxdWVyeURhdGEuYWxlcnRzXG4gICAgICAgICAgLm1hcCgoYWxlcnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBhbGVydC5kZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChkZXNjKSA9PiBkZXNjLnRyaW0oKSAhPT0gXCJcIilcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgNClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYWxlcnQuZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgLmZpbHRlcigoZGVzYykgPT4gZGVzYy50cmltKCkgIT09IFwiXCIpXG4gICAgICAgICAgICAgIC5tYXAoKGRlc2MpID0+IGRlc2MudHJpbSgpKVxuICAgICAgICAgICAgICAuc2xpY2UoMCwgNClcbiAgICAgICAgICAgICAgLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuam9pbihcIlxcblxcblwiKTtcblxuICBjb25zdCB3ZWF0aGVyQWxlcnRzQ29udGFpbmVyID0gY3JlYXRlRWxlbShcbiAgICBcImRpdlwiLFxuICAgIHsgY2xhc3M6IFwid2VhdGhlci1hbGVydHNfY29udGFpbmVyXCIgfSxcbiAgICB7fSxcbiAgICBjcmVhdGVFbGVtKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgY2xhc3M6IFwid2VhdGhlci1kZXNjX2NvbnRhaW5lclwiIH0sXG4gICAgICB7fSxcbiAgICAgIGNyZWF0ZUVsZW0oXCJoMlwiLCB7IGNsYXNzOiBcIndlYXRoZXItZGVzYy10aXRsZVwiIH0sIHt9LCBcIkN1cnJlbnQgV2VhdGhlclwiKSxcbiAgICAgIGNyZWF0ZUVsZW0oXG4gICAgICAgIFwicFwiLFxuICAgICAgICB7IGNsYXNzOiBcIndlYXRoZXItZGVzY19jb250ZW50XCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIHF1ZXJ5RGF0YS5kZXNjcmlwdGlvbiB8fCBcIk5vIGRlc2NyaXB0aW9uIGF2YWlsYWJsZS5cIlxuICAgICAgKVxuICAgICksXG4gICAgY3JlYXRlRWxlbShcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBcImV4dHJlbWUtd2VhdGhlcl9jb250YWluZXJcIiB9LFxuICAgICAge30sXG4gICAgICBjcmVhdGVFbGVtKFxuICAgICAgICBcImgyXCIsXG4gICAgICAgIHsgY2xhc3M6IFwiZXh0cmVtZS13ZWF0aGVyLXRpdGxlXCIgfSxcbiAgICAgICAge30sXG4gICAgICAgIFwiRXh0cmVtZSBXZWF0aGVyIEFsZXJ0c1wiXG4gICAgICApLFxuICAgICAgY3JlYXRlRWxlbShcInBcIiwgeyBjbGFzczogXCJleHRyZW1lLXdlYXRoZXItY29udGVudFwiIH0sIHt9LCBhbGVydHNDb250ZW50KVxuICAgIClcbiAgKTtcbiAgcmV0dXJuIHdlYXRoZXJBbGVydHNDb250YWluZXI7XG59O1xuZnVuY3Rpb24gc2VsZWN0RGlzcGxheShidG4sIHF1ZXJ5RGF0YSkge1xuICBjb25zdCByYW5nZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZ2Utc2VsZWN0X2J0bi5hY3RpdmVcIik7XG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy13cmFwcGVyXCIpO1xuICBjb25zdCB3ZWF0aGVyUmVwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi53ZWF0aGVyLXJlcG9ydF9jb250YWluZXJcIlxuICApO1xuICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYnRuLmlkID09PSBcImRhaWx5XCIpIHtcbiAgICB3ZWF0aGVyUmVwb3J0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29udHJvbHMucmVtb3ZlKCk7XG4gICAgYnVpbGREYWlseUZvcmVjYXN0KHF1ZXJ5RGF0YSk7XG4gIH1cbiAgaWYgKGJ0bi5pZCA9PT0gXCJob3VybHlcIikge1xuICAgIHdlYXRoZXJSZXBvcnRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBidWlsZEhvdXJseUZvcmVjYXN0KHF1ZXJ5RGF0YSk7XG4gIH1cbiAgcmFuZ2VCdG4/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIGJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufVxuXG5jb25zdCBjb252ZXJ0VGVtcCA9ICh0b2dnbGUsIHRlbXApID0+IHtcbiAgbGV0IGNvbnZlcnRlZFRlbXA7XG4gIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuICAgIC8v4oSDIHRvIOKEiVxuICAgIGNvbnZlcnRlZFRlbXAgPSAodGVtcCAqIDkpIC8gNSArIDMyO1xuICB9XG4gIGlmICghdG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAvL+KEiSB0byDihINcbiAgICBjb252ZXJ0ZWRUZW1wID0gKCh0ZW1wIC0gMzIpICogNSkgLyA5O1xuICB9XG4gIHJldHVybiBjb252ZXJ0ZWRUZW1wO1xufTtcblxuZnVuY3Rpb24gZ2V0Rm9yZWNhc3RDb25kaXRpb24oaWNvbikge1xuICBpZiAoaWNvbiA9PT0gXCJjbGVhci1kYXlcIiB8fCBpY29uID09PSBcImNsZWFyLW5pZ2h0XCIpIHtcbiAgICByZXR1cm4gc3VuU1ZHO1xuICB9XG4gIGlmIChpY29uID09PSBcInBhcnRseS1jbG91ZHktZGF5XCIgfHwgaWNvbiA9PT0gXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIpIHtcbiAgICByZXR1cm4gc3VuQ2xvdWRTVkc7XG4gIH1cbiAgaWYgKGljb24gPT09IFwiY2xvdWR5XCIpIHtcbiAgICByZXR1cm4gY2xvdWRTVkc7XG4gIH1cbiAgaWYgKGljb24gPT09IFwiZm9nXCIpIHtcbiAgICByZXR1cm4gZm9nU1ZHO1xuICB9XG4gIGlmIChpY29uID09PSBcInJhaW5cIikge1xuICAgIHJldHVybiByYWluU1ZHO1xuICB9XG4gIGlmIChpY29uID09PSBcInNub3dcIikge1xuICAgIHJldHVybiBzbm93U1ZHO1xuICB9XG4gIGlmIChcbiAgICBpY29uID09PSBcInRodW5kZXItcmFpblwiIHx8XG4gICAgaWNvbiA9PT0gXCJ0aHVuZGVyLSBzaG93ZXJzLWRheVwiIHx8XG4gICAgaWNvbiA9PT0gXCJ0aHVuZGVyLXNob3dlcnMtbmlnaHRcIlxuICApIHtcbiAgICByZXR1cm4gc3Rvcm1TVkc7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gKHRhZywgYXR0ciwgbGlzdGVuZXJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gYXR0cikge1xuICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJba2V5XSk7XG4gIH1cbiAgZm9yIChjb25zdCBldmVudCBpbiBsaXN0ZW5lcnMpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbZXZlbnRdKTtcbiAgfVxuICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2hpbGQgPT09IFwibnVtYmVyXCJcbiAgICAgID8gZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpKVxuICAgICAgOiBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIH0pO1xuICByZXR1cm4gZWw7XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbnN0YW50c1xuICogQHN1bW1hcnkgVXNlZnVsIGNvbnN0YW50c1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCBkYXRlIGNvbnN0YW50cy5cbiAqXG4gKiBUaGUgY29uc3RhbnRzIGNvdWxkIGJlIGltcG9ydGVkIGZyb20gYGRhdGUtZm5zL2NvbnN0YW50c2A6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG1heFRpbWUsIG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogZnVuY3Rpb24gaXNBbGxvd2VkVGltZSh0aW1lKSB7XG4gKiAgIHJldHVybiB0aW1lIDw9IG1heFRpbWUgJiYgdGltZSA+PSBtaW5UaW1lO1xuICogfVxuICogYGBgXG4gKi9cblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgZGF5c0luV2VlayA9IDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5ZZWFyXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgeWVhci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEhvdyBtYW55IGRheXMgaW4gYSB5ZWFyLlxuICpcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJlcyBldmVyeSA0IHllYXJzLCBleGNlcHQgZm9yIHllYXJzIHRoYXQgYXJlIGRpdmlzYWJsZSBieSAxMDAgYW5kIG5vdCBkaXZpc2FibGUgYnkgNDAwLlxuICogPiAxIG1lYW4geWVhciA9ICgzNjUrMS80LTEvMTAwKzEvNDAwKSBkYXlzID0gMzY1LjI0MjUgZGF5c1xuICovXG5leHBvcnQgY29uc3QgZGF5c0luWWVhciA9IDM2NS4yNDI1O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWF4VGltZVxuICogQHN1bW1hcnkgTWF4aW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1heFRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IDg2NDAwMDAwMDAwMDAwMDEgPD0gbWF4VGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSg4NjQwMDAwMDAwMDAwMDAxKTtcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBzdW1tYXJ5IE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSAtODY0MDAwMDAwMDAwMDAwMSA+PSBtaW5UaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKC04NjQwMDAwMDAwMDAwMDAxKVxuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pblRpbWUgPSAtbWF4VGltZTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luV2VlayA9IDYwNDgwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBzZWNvbmRcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luU2Vjb25kID0gMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJblllYXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luWWVhciA9IDUyNTYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbk1vbnRoXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgbW9udGguXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Nb250aCA9IDQzMjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luRGF5XG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luRGF5ID0gMTQ0MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5RdWFydGVyID0gMztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luWWVhclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luWWVhciA9IDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBzdW1tYXJ5IFF1YXJ0ZXJzIGluIDEgeWVhclxuICovXG5leHBvcnQgY29uc3QgcXVhcnRlcnNJblllYXIgPSA0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1pbnV0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1pbnV0ZSA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luRGF5ID0gc2Vjb25kc0luSG91ciAqIDI0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5XZWVrID0gc2Vjb25kc0luRGF5ICogNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblllYXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luWWVhciA9IHNlY29uZHNJbkRheSAqIGRheXNJblllYXI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Nb250aFxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1vbnRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Nb250aCA9IHNlY29uZHNJblllYXIgLyAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luUXVhcnRlciA9IHNlY29uZHNJbk1vbnRoICogMztcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luSG91ciwgbWlsbGlzZWNvbmRzSW5NaW51dGUgfSBmcm9tIFwiLi9jb25zdGFudHMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBwYXJzZUlTT30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHBhcnNlSVNPXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlIElTTyBzdHJpbmdcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFBhcnNlIHRoZSBnaXZlbiBzdHJpbmcgaW4gSVNPIDg2MDEgZm9ybWF0IGFuZCByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBGdW5jdGlvbiBhY2NlcHRzIGNvbXBsZXRlIElTTyA4NjAxIGZvcm1hdHMgYXMgd2VsbCBhcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9ucy5cbiAqIElTTyA4NjAxOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzbid0IGEgc3RyaW5nLCB0aGUgZnVuY3Rpb24gY2Fubm90IHBhcnNlIHRoZSBzdHJpbmcgb3JcbiAqIHRoZSB2YWx1ZXMgYXJlIGludmFsaWQsIGl0IHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudCAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcyMDE0LTAyLTExVDExOjMwOjMwJylcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgc3RyaW5nICcrMDIwMTQxMDEnIHRvIGRhdGUsXG4gKiAvLyBpZiB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdCBpcyAxOlxuICogY29uc3QgcmVzdWx0ID0gcGFyc2VJU08oJyswMjAxNDEwMScsIHsgYWRkaXRpb25hbERpZ2l0czogMSB9KVxuICogLy89PiBGcmkgQXByIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSVNPKGFyZ3VtZW50LCBvcHRpb25zKSB7XG4gIGNvbnN0IGFkZGl0aW9uYWxEaWdpdHMgPSBvcHRpb25zPy5hZGRpdGlvbmFsRGlnaXRzID8/IDI7XG4gIGNvbnN0IGRhdGVTdHJpbmdzID0gc3BsaXREYXRlU3RyaW5nKGFyZ3VtZW50KTtcblxuICBsZXQgZGF0ZTtcbiAgaWYgKGRhdGVTdHJpbmdzLmRhdGUpIHtcbiAgICBjb25zdCBwYXJzZVllYXJSZXN1bHQgPSBwYXJzZVllYXIoZGF0ZVN0cmluZ3MuZGF0ZSwgYWRkaXRpb25hbERpZ2l0cyk7XG4gICAgZGF0ZSA9IHBhcnNlRGF0ZShwYXJzZVllYXJSZXN1bHQucmVzdERhdGVTdHJpbmcsIHBhcnNlWWVhclJlc3VsdC55ZWFyKTtcbiAgfVxuXG4gIGlmICghZGF0ZSB8fCBpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICBsZXQgdGltZSA9IDA7XG4gIGxldCBvZmZzZXQ7XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWUpIHtcbiAgICB0aW1lID0gcGFyc2VUaW1lKGRhdGVTdHJpbmdzLnRpbWUpO1xuICAgIGlmIChpc05hTih0aW1lKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWV6b25lKSB7XG4gICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSk7XG4gICAgaWYgKGlzTmFOKG9mZnNldCkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkaXJ0eURhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lKTtcbiAgICAvLyBKUyBwYXJzZWQgc3RyaW5nIGFzc3VtaW5nIGl0J3MgaW4gVVRDIHRpbWV6b25lXG4gICAgLy8gYnV0IHdlIG5lZWQgaXQgdG8gYmUgcGFyc2VkIGluIG91ciB0aW1lem9uZVxuICAgIC8vIHNvIHdlIHVzZSB1dGMgdmFsdWVzIHRvIGJ1aWxkIGRhdGUgaW4gb3VyIHRpbWV6b25lLlxuICAgIC8vIFllYXIgdmFsdWVzIGZyb20gMCB0byA5OSBtYXAgdG8gdGhlIHllYXJzIDE5MDAgdG8gMTk5OVxuICAgIC8vIHNvIHNldCB5ZWFyIGV4cGxpY2l0bHkgd2l0aCBzZXRGdWxsWWVhci5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0RnVsbFllYXIoXG4gICAgICBkaXJ0eURhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgIGRpcnR5RGF0ZS5nZXRVVENNb250aCgpLFxuICAgICAgZGlydHlEYXRlLmdldFVUQ0RhdGUoKSxcbiAgICApO1xuICAgIHJlc3VsdC5zZXRIb3VycyhcbiAgICAgIGRpcnR5RGF0ZS5nZXRVVENIb3VycygpLFxuICAgICAgZGlydHlEYXRlLmdldFVUQ01pbnV0ZXMoKSxcbiAgICAgIGRpcnR5RGF0ZS5nZXRVVENTZWNvbmRzKCksXG4gICAgICBkaXJ0eURhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCksXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQpO1xufVxuXG5jb25zdCBwYXR0ZXJucyA9IHtcbiAgZGF0ZVRpbWVEZWxpbWl0ZXI6IC9bVCBdLyxcbiAgdGltZVpvbmVEZWxpbWl0ZXI6IC9bWiBdL2ksXG4gIHRpbWV6b25lOiAvKFtaKy1dLiopJC8sXG59O1xuXG5jb25zdCBkYXRlUmVnZXggPVxuICAvXi0/KD86KFxcZHszfSl8KFxcZHsyfSkoPzotPyhcXGR7Mn0pKT98VyhcXGR7Mn0pKD86LT8oXFxkezF9KSk/fCkkLztcbmNvbnN0IHRpbWVSZWdleCA9XG4gIC9eKFxcZHsyfSg/OlsuLF1cXGQqKT8pKD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8kLztcbmNvbnN0IHRpbWV6b25lUmVnZXggPSAvXihbKy1dKShcXGR7Mn0pKD86Oj8oXFxkezJ9KSk/JC87XG5cbmZ1bmN0aW9uIHNwbGl0RGF0ZVN0cmluZyhkYXRlU3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVTdHJpbmdzID0ge307XG4gIGNvbnN0IGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy5kYXRlVGltZURlbGltaXRlcik7XG4gIGxldCB0aW1lU3RyaW5nO1xuXG4gIC8vIFRoZSByZWdleCBtYXRjaCBzaG91bGQgb25seSByZXR1cm4gYXQgbWF4aW11bSB0d28gYXJyYXkgZWxlbWVudHMuXG4gIC8vIFtkYXRlXSwgW3RpbWVdLCBvciBbZGF0ZSwgdGltZV0uXG4gIGlmIChhcnJheS5sZW5ndGggPiAyKSB7XG4gICAgcmV0dXJuIGRhdGVTdHJpbmdzO1xuICB9XG5cbiAgaWYgKC86Ly50ZXN0KGFycmF5WzBdKSkge1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF07XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzFdO1xuICAgIGlmIChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlci50ZXN0KGRhdGVTdHJpbmdzLmRhdGUpKSB7XG4gICAgICBkYXRlU3RyaW5ncy5kYXRlID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlcilbMF07XG4gICAgICB0aW1lU3RyaW5nID0gZGF0ZVN0cmluZy5zdWJzdHIoXG4gICAgICAgIGRhdGVTdHJpbmdzLmRhdGUubGVuZ3RoLFxuICAgICAgICBkYXRlU3RyaW5nLmxlbmd0aCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICBjb25zdCB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lLmV4ZWModGltZVN0cmluZyk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZy5yZXBsYWNlKHRva2VuWzFdLCBcIlwiKTtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWV6b25lID0gdG9rZW5bMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5ncztcbn1cblxuZnVuY3Rpb24gcGFyc2VZZWFyKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFxuICAgIFwiXig/OihcXFxcZHs0fXxbKy1dXFxcXGR7XCIgK1xuICAgICAgKDQgKyBhZGRpdGlvbmFsRGlnaXRzKSArXG4gICAgICBcIn0pfChcXFxcZHsyfXxbKy1dXFxcXGR7XCIgK1xuICAgICAgKDIgKyBhZGRpdGlvbmFsRGlnaXRzKSArXG4gICAgICBcIn0pJClcIixcbiAgKTtcblxuICBjb25zdCBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2gocmVnZXgpO1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4geyB5ZWFyOiBOYU4sIHJlc3REYXRlU3RyaW5nOiBcIlwiIH07XG5cbiAgY29uc3QgeWVhciA9IGNhcHR1cmVzWzFdID8gcGFyc2VJbnQoY2FwdHVyZXNbMV0pIDogbnVsbDtcbiAgY29uc3QgY2VudHVyeSA9IGNhcHR1cmVzWzJdID8gcGFyc2VJbnQoY2FwdHVyZXNbMl0pIDogbnVsbDtcblxuICAvLyBlaXRoZXIgeWVhciBvciBjZW50dXJ5IGlzIG51bGwsIG5vdCBib3RoXG4gIHJldHVybiB7XG4gICAgeWVhcjogY2VudHVyeSA9PT0gbnVsbCA/IHllYXIgOiBjZW50dXJ5ICogMTAwLFxuICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKChjYXB0dXJlc1sxXSB8fCBjYXB0dXJlc1syXSkubGVuZ3RoKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHJpbmcsIHllYXIpIHtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgaWYgKHllYXIgPT09IG51bGwpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuXG4gIGNvbnN0IGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChkYXRlUmVnZXgpO1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgc3RyaW5nXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuXG4gIGNvbnN0IGlzV2Vla0RhdGUgPSAhIWNhcHR1cmVzWzRdO1xuICBjb25zdCBkYXlPZlllYXIgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzFdKTtcbiAgY29uc3QgbW9udGggPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzJdKSAtIDE7XG4gIGNvbnN0IGRheSA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbM10pO1xuICBjb25zdCB3ZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s0XSk7XG4gIGNvbnN0IGRheU9mV2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNV0pIC0gMTtcblxuICBpZiAoaXNXZWVrRGF0ZSkge1xuICAgIGlmICghdmFsaWRhdGVXZWVrRGF0ZSh5ZWFyLCB3ZWVrLCBkYXlPZldlZWspKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gICAgcmV0dXJuIGRheU9mSVNPV2Vla1llYXIoeWVhciwgd2VlaywgZGF5T2ZXZWVrKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgaWYgKFxuICAgICAgIXZhbGlkYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSB8fFxuICAgICAgIXZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCBtb250aCwgTWF0aC5tYXgoZGF5T2ZZZWFyLCBkYXkpKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZURhdGVVbml0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA/IHBhcnNlSW50KHZhbHVlKSA6IDE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZSh0aW1lU3RyaW5nKSB7XG4gIGNvbnN0IGNhcHR1cmVzID0gdGltZVN0cmluZy5tYXRjaCh0aW1lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gTmFOOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuXG4gIGNvbnN0IGhvdXJzID0gcGFyc2VUaW1lVW5pdChjYXB0dXJlc1sxXSk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzJdKTtcbiAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbM10pO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIGhvdXJzICogbWlsbGlzZWNvbmRzSW5Ib3VyICsgbWludXRlcyAqIG1pbGxpc2Vjb25kc0luTWludXRlICsgc2Vjb25kcyAqIDEwMDBcbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZShcIixcIiwgXCIuXCIpKSkgfHwgMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSh0aW1lem9uZVN0cmluZykge1xuICBpZiAodGltZXpvbmVTdHJpbmcgPT09IFwiWlwiKSByZXR1cm4gMDtcblxuICBjb25zdCBjYXB0dXJlcyA9IHRpbWV6b25lU3RyaW5nLm1hdGNoKHRpbWV6b25lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gMDtcblxuICBjb25zdCBzaWduID0gY2FwdHVyZXNbMV0gPT09IFwiK1wiID8gLTEgOiAxO1xuICBjb25zdCBob3VycyA9IHBhcnNlSW50KGNhcHR1cmVzWzJdKTtcbiAgY29uc3QgbWludXRlcyA9IChjYXB0dXJlc1szXSAmJiBwYXJzZUludChjYXB0dXJlc1szXSkpIHx8IDA7XG5cbiAgaWYgKCF2YWxpZGF0ZVRpbWV6b25lKGhvdXJzLCBtaW51dGVzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIChob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSk7XG59XG5cbmZ1bmN0aW9uIGRheU9mSVNPV2Vla1llYXIoaXNvV2Vla1llYXIsIHdlZWssIGRheSkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvV2Vla1llYXIsIDAsIDQpO1xuICBjb25zdCBmb3VydGhPZkphbnVhcnlEYXkgPSBkYXRlLmdldFVUQ0RheSgpIHx8IDc7XG4gIGNvbnN0IGRpZmYgPSAod2VlayAtIDEpICogNyArIGRheSArIDEgLSBmb3VydGhPZkphbnVhcnlEYXk7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuLy8gVmFsaWRhdGlvbiBmdW5jdGlvbnNcblxuLy8gRmVicnVhcnkgaXMgbnVsbCB0byBoYW5kbGUgdGhlIGxlYXAgeWVhciAodXNpbmcgfHwpXG5jb25zdCBkYXlzSW5Nb250aHMgPSBbMzEsIG51bGwsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuZnVuY3Rpb24gaXNMZWFwWWVhckluZGV4KHllYXIpIHtcbiAgcmV0dXJuIHllYXIgJSA0MDAgPT09IDAgfHwgKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpIHtcbiAgcmV0dXJuIChcbiAgICBtb250aCA+PSAwICYmXG4gICAgbW9udGggPD0gMTEgJiZcbiAgICBkYXRlID49IDEgJiZcbiAgICBkYXRlIDw9IChkYXlzSW5Nb250aHNbbW9udGhdIHx8IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAyOSA6IDI4KSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXlPZlllYXJEYXRlKHllYXIsIGRheU9mWWVhcikge1xuICByZXR1cm4gZGF5T2ZZZWFyID49IDEgJiYgZGF5T2ZZZWFyIDw9IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAzNjYgOiAzNjUpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdlZWtEYXRlKF95ZWFyLCB3ZWVrLCBkYXkpIHtcbiAgcmV0dXJuIHdlZWsgPj0gMSAmJiB3ZWVrIDw9IDUzICYmIGRheSA+PSAwICYmIGRheSA8PSA2O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWUoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpIHtcbiAgaWYgKGhvdXJzID09PSAyNCkge1xuICAgIHJldHVybiBtaW51dGVzID09PSAwICYmIHNlY29uZHMgPT09IDA7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIHNlY29uZHMgPj0gMCAmJlxuICAgIHNlY29uZHMgPCA2MCAmJlxuICAgIG1pbnV0ZXMgPj0gMCAmJlxuICAgIG1pbnV0ZXMgPCA2MCAmJlxuICAgIGhvdXJzID49IDAgJiZcbiAgICBob3VycyA8IDI1XG4gICk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoX2hvdXJzLCBtaW51dGVzKSB7XG4gIHJldHVybiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8PSA1OTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBwYXJzZUlTTztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==