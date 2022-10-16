// Creating the calculator class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Temperature conversion function
const tempConvertor = (tempValue, fromUnit, toUnit) => {
  switch (fromUnit) {
    case "Celsius":
      switch (toUnit) {
        case "Celsius":
          return tempValue;
        case "Kelvin":
          return tempValue + 273.15;
        case "Fahrenheit":
          return tempValue * (9 / 5) + 32;
        default:
          return;
      }
    case "Kelvin":
      switch (toUnit) {
        case "Celsius":
          return tempValue - 273.15;
        case "Kelvin":
          return tempValue;
        case "Fahrenheit":
          return (tempValue - 273.15) * (9 / 5) + 32;
        default:
          return;
      }
    case "Fahrenheit":
      switch (toUnit) {
        case "Celsius":
          return ((tempValue - 32) * 9) / 5;
        case "Kelvin":
          return (tempValue - 32) * (5 / 9) + 273.15;
        case "Fahrenheit":
          return tempValue;
        default:
          return;
      }
    default:
      return;
  }
};

// Distance conversion function
const distConvertor = (distValue, fromUnit, toUnit) => {
  switch (fromUnit) {
    case "m":
      switch (toUnit) {
        case "m":
          return distValue;
        case "cm":
          return distValue * 100;
        case "mm":
          return distValue * 1000;
        case "km":
          return distValue / 1000;
        case "inch":
          return distValue * 39.37;
        case "feet":
          return distValue * 3.2808;
        default:
          return;
      }
    case "cm":
      return distConvertor(0.01 * distValue, "m", toUnit);
    case "mm":
      return distConvertor(0.001 * distValue, "m", toUnit);
    case "km":
      return distConvertor(1000 * distValue, "m", toUnit);
    case "inch":
      return distConvertor(distValue / 39.37, "m", toUnit);
    case "feet":
      return distConvertor(distValue / 3.2808, "m", toUnit);
    default:
      return;
  }
};

// Mass conversion function
const massConvertor = (massValue, fromUnit, toUnit) => {
  switch (fromUnit) {
    case "g":
      switch (toUnit) {
        case "g":
          return massValue;
        case "mg":
          return massValue * 1000;
        case "kg":
          return massValue / 1000;
        case "ton":
          return massValue / 1000000;
        case "pound":
          return massValue * 0.0022;
        case "ounce":
          return massValue / 28.34952;
        default:
          return;
      }
    case "mg":
      return massConvertor(0.001 * massValue, "g", toUnit);
    case "kg":
      return massConvertor(1000 * massValue, "g", toUnit);
    case "ton":
      return massConvertor(1000000 * massValue, "g", toUnit);
    case "pound":
      switch (toUnit) {
        case "pound":
          return massValue;

        default:
          return massConvertor(453.592 * massValue, "g", toUnit);
      }
    case "ounce":
      switch (toUnit) {
        case "ounce":
          return massValue;

        default:
          return massConvertor(28.34952 * massValue, "g", toUnit);
      }
    default:
      return;
  }
};

// Volume conversion function
const volConvertor = (volValue, fromUnit, toUnit) => {
  switch (fromUnit) {
    case "m3":
      switch (toUnit) {
        case "m3":
          return volValue;
        case "km3":
          return volValue / 1000000000;
        case "cm3":
          return volValue * 1000000;
        case "mm3":
          return volValue / 1000000000;
        case "l":
          return volValue * 1000;
        default:
          return;
      }
    case "km3":
      return volConvertor(1000000000 * volValue, "m3", toUnit);
    case "cm3":
      return volConvertor(volValue / 1000000, "m3", toUnit);
    case "mm3":
      return volConvertor(volValue / 1000000000, "m3", toUnit);
    case "l":
      return volConvertor(volValue / 1000, "m3", toUnit);
    default:
      return;
  }
};

// Time conversion function
const timeConvertor = (timeValue, fromUnit, toUnit) => {
  switch (fromUnit) {
    case "h":
      switch (toUnit) {
        case "h":
          return timeValue;
        case "min":
          return timeValue * 60;
        case "s":
          return timeValue * 3600;
        case "day":
          return timeValue / 24;
        case "month":
          return timeValue / 730;
        case "year":
          return timeValue / 8760;
        default:
          return;
      }
    case "min":
      return timeConvertor(timeValue / 60, "h", toUnit);
    case "s":
      return timeConvertor(timeValue / 3600, "h", toUnit);
    case "day":
      return timeConvertor(24 * timeValue, "h", toUnit);
    case "month":
      return timeConvertor(730 * timeValue, "h", toUnit);
    case "year":
      return timeConvertor(8760 * timeValue, "h", toUnit);
    default:
      return;
  }
};

// Exports
export {
  Calculator,
  tempConvertor,
  distConvertor,
  massConvertor,
  volConvertor,
  timeConvertor,
};
