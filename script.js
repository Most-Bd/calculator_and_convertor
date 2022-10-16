// Imports
import {
  Calculator,
  tempConvertor,
  distConvertor,
  massConvertor,
  volConvertor,
  timeConvertor,
} from "./utilities.js";

// DOM code

// Declaring all variables and catching the elements from the Html DOM
const conversionType = document.querySelector(".conversion-type");

const temperatureUnits = ["Celsius", "Kelvin", "Fahrenheit"];
const lengthUnits = ["m", "cm", "mm", "km", "inch", "feet"];
const massUnits = ["g", "mg", "kg", "ton", "pound", "ounce"];
const volumeUnits = ["m3", "km3", "cm3", "mm3", "l"];
const timeUnits = ["s", "min", "h", "day", "month", "year"];

const previousOperandTextElement = document.querySelector("#calc-illust");
const currentOperandTextElement = document.querySelector("#calc-result");

const valueButtons = document.querySelectorAll(".calculator-value");
const eraseButton = document.querySelector(".erase");
const backButton = document.querySelector(".back");
const equalsButton = document.querySelector("#equals");
const operatorButtons = document.querySelectorAll(".operat");

const burgerMenu = document.querySelector("#burger-menu");

const navItems = document.querySelector(".nav-items");
const linkItems = document.querySelectorAll(".nav-item a");

const bodyElement = document.querySelector("#body");
const navItemsStyle = getComputedStyle(navItems);

const unitSelectStart = document.querySelector(".conversion-unit-start");
const unitSelectEnd = document.querySelector(".conversion-unit-end");

// Set up the first choices of the conversion section on page load
window.addEventListener("load", () => {
  temperatureUnits.forEach((unit) => {
    var newUnitOptionStart = document.createElement("option");
    var newUnitOptionEnd = document.createElement("option");
    newUnitOptionStart.value = unit;
    newUnitOptionEnd.value = unit;
    newUnitOptionStart.setAttribute("class", "conversion-option");
    newUnitOptionEnd.setAttribute("class", "conversion-option");
    newUnitOptionStart.text = unit;
    newUnitOptionEnd.text = unit;
    unitSelectStart.appendChild(newUnitOptionStart);
    unitSelectEnd.appendChild(newUnitOptionEnd);
  });
});

// On option change functionality (conversion section)
conversionType.addEventListener("change", () => {
  const conversionTypeValue = conversionType.value;

  // Removing existing options
  const elementsToRemoveStart = document.querySelectorAll(
    ".conversion-unit-start .conversion-option"
  );
  const elementsToRemoveEnd = document.querySelectorAll(
    ".conversion-unit-end .conversion-option"
  );

  elementsToRemoveStart.forEach((elm) => elm.remove());
  elementsToRemoveEnd.forEach((elm) => elm.remove());

  // Adding new options based on the chosen conversion type
  switch (conversionTypeValue) {
    case "temperature":
      temperatureUnits.forEach((unit) => {
        var newUnitOptionStart = document.createElement("option");
        var newUnitOptionEnd = document.createElement("option");
        newUnitOptionStart.value = unit;
        newUnitOptionEnd.value = unit;
        newUnitOptionStart.setAttribute("class", "conversion-option");
        newUnitOptionEnd.setAttribute("class", "conversion-option");
        newUnitOptionStart.text = unit;
        newUnitOptionEnd.text = unit;
        unitSelectStart.appendChild(newUnitOptionStart);
        unitSelectEnd.appendChild(newUnitOptionEnd);
      });
      break;
    case "length":
      lengthUnits.forEach((unit) => {
        var newUnitOptionStart = document.createElement("option");
        var newUnitOptionEnd = document.createElement("option");
        newUnitOptionStart.value = unit;
        newUnitOptionEnd.value = unit;
        newUnitOptionStart.setAttribute("class", "conversion-option");
        newUnitOptionEnd.setAttribute("class", "conversion-option");
        newUnitOptionStart.text = unit;
        newUnitOptionEnd.text = unit;
        unitSelectStart.appendChild(newUnitOptionStart);
        unitSelectEnd.appendChild(newUnitOptionEnd);
      });
      break;
    case "mass":
      massUnits.forEach((unit) => {
        var newUnitOptionStart = document.createElement("option");
        var newUnitOptionEnd = document.createElement("option");
        newUnitOptionStart.value = unit;
        newUnitOptionEnd.value = unit;
        newUnitOptionStart.setAttribute("class", "conversion-option");
        newUnitOptionEnd.setAttribute("class", "conversion-option");
        newUnitOptionStart.text = unit;
        newUnitOptionEnd.text = unit;
        unitSelectStart.appendChild(newUnitOptionStart);
        unitSelectEnd.appendChild(newUnitOptionEnd);
      });
      break;
    case "volume":
      volumeUnits.forEach((unit) => {
        var newUnitOptionStart = document.createElement("option");
        var newUnitOptionEnd = document.createElement("option");
        newUnitOptionStart.value = unit;
        newUnitOptionEnd.value = unit;
        newUnitOptionStart.setAttribute("class", "conversion-option");
        newUnitOptionEnd.setAttribute("class", "conversion-option");
        newUnitOptionStart.text = unit;
        newUnitOptionEnd.text = unit;
        unitSelectStart.appendChild(newUnitOptionStart);
        unitSelectEnd.appendChild(newUnitOptionEnd);
      });
      break;
    case "time":
      timeUnits.forEach((unit) => {
        var newUnitOptionStart = document.createElement("option");
        var newUnitOptionEnd = document.createElement("option");
        newUnitOptionStart.value = unit;
        newUnitOptionEnd.value = unit;
        newUnitOptionStart.setAttribute("class", "conversion-option");
        newUnitOptionEnd.setAttribute("class", "conversion-option");
        newUnitOptionStart.text = unit;
        newUnitOptionEnd.text = unit;
        unitSelectStart.appendChild(newUnitOptionStart);
        unitSelectEnd.appendChild(newUnitOptionEnd);
      });
      break;
  }
});

// Creating the calculator instance and performing the calculations
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

eraseButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

backButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// Nav-bar burger functionality
burgerMenu.addEventListener("click", () => {
  var tr = navItemsStyle.getPropertyValue("transform");

  //Getting the rotation values from the transform matrix
  var values = tr.split("(")[1],
    values = values.split(")")[0],
    values = values.split(",");

  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];

  //Calculating the rotation value in "deg"
  var angle = Math.round(Math.asin(b) * (180 / Math.PI));

  if (angle === -90) {
    navItems.style.transform = "rotate(0deg)";
    bodyElement.style.overflowY = "hidden";
  } else {
    navItems.style.transform = "rotate(-90deg)";
    bodyElement.style.overflowY = "";
  }
});

// Re-rotating the nav-bar after clicking a nav element (on small screens only)
linkItems.forEach((linkItem) => {
  linkItem.addEventListener("click", () => {
    const navBarSvg = document.querySelector(".nav-bar svg");
    const svgDisplay = getComputedStyle(navBarSvg).getPropertyValue("display");
    if (svgDisplay !== "none") {
      navItems.style.transform = "rotate(-90deg)";
      bodyElement.style.overflowY = "";
    }
  });
});

// Set the rotation of nav-bar when the screen is smaller than 840px
// (had a bug where the overflow and the nav-bar are messed up)
window.addEventListener("resize", function () {
  var newWidth = window.innerWidth;
  if (newWidth >= 840) {
    navItems.style.transform = "rotate(0deg)";
  } else {
    navItems.style.transform = "rotate(-90deg)";
    bodyElement.style.overflowY = "";
  }
});

// Converting the input

const convert = () => {
  var conversionInputValue = conversionInput.value;
  const firstUnit = unitSelectStart.value;
  const lastUnit = unitSelectEnd.value;
  const secondInput = document.querySelector("#conversion-value-end");
  switch (conversionType.value) {
    case "temperature":
      secondInput.value = tempConvertor(
        parseFloat(conversionInputValue),
        firstUnit,
        lastUnit
      );
      break;
    case "length":
      secondInput.value = distConvertor(
        parseFloat(conversionInputValue),
        firstUnit,
        lastUnit
      );
      break;
    case "mass":
      secondInput.value = massConvertor(
        parseFloat(conversionInputValue),
        firstUnit,
        lastUnit
      );
      break;
    case "volume":
      secondInput.value = volConvertor(
        parseFloat(conversionInputValue),
        firstUnit,
        lastUnit
      );
      break;
    case "time":
      secondInput.value = timeConvertor(
        parseFloat(conversionInputValue),
        firstUnit,
        lastUnit
      );
      break;
  }
};

const conversionInput = document.getElementById("conversion-value-start");
conversionInput.addEventListener("input", () => convert());

// Calling the convert function when the conversion options change
conversionType.addEventListener("change", () => convert());
unitSelectStart.addEventListener("change", () => convert());
unitSelectEnd.addEventListener("change", () => convert());
