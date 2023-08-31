"use strict";
//variables
const inputDay = document.querySelector(".input-day");
const inputMonth = document.querySelector(".input-month");
const inputYear = document.querySelector(".input-year");
const inputs = document.querySelectorAll(".input");
let yearsEl = document.querySelector(".years");
let monthsEl = document.querySelector(".months");
let daysEl = document.querySelector(".days");
let iconBtn = document.getElementById("icon-btn");
let smallEl = document.querySelectorAll(".small");
let labelsEl = document.querySelectorAll("label");
const currentDate = new Date();
console.log(currentDate);
const year = currentDate.getFullYear();
console.log(year);
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
console.log(month);
const day = currentDate.getDate();
console.log(day);


yearsEl.textContent = "--";
monthsEl.textContent = "--";
daysEl.textContent = "--";

// render calculated results

const render = () => {
  const calcYears = year - Number(inputYear.value);
  const calcMonths = month - Number(inputMonth.value);
  const calDays = day - Number(inputDay.value);

  for (let i = 0; i < 3; i++) {
    inputs[i].value = "";
  }

  yearsEl.textContent = calcYears;
  monthsEl.textContent = calcMonths;
  daysEl.textContent = calDays;
};

//display errror
const error = () => {
  inputDay.classList.add("inputs-red");
  inputMonth.classList.add("inputs-red");
  inputYear.classList.add("inputs-red");
  for (let i = 0; i < 3; i++) {
    smallEl[i].classList.remove("hidden");
    labelsEl[i].classList.add("labels-red");
  }
};

// display error if all inputs are empty
const emptyInputs = () => {
  if (!inputDay.value && !inputMonth.value && !inputYear.value) {
    error();
  }
};

// display error if all inputs are invalid
const invalidInputsAll = () => {
  error();
  smallEl[0].textContent = "Must be a valid date";
  smallEl[1].textContent = "Must be a valid month";
  smallEl[2].textContent = "Must be in the past";
};

// display error if days input is invalid
const invalidInputsDays = () => {
  error();
  smallEl[0].textContent = "Must be a valid day";
  smallEl[1].classList.add("hidden");
  smallEl[2].classList.add("hidden");
};

// display error if months input is invalid
const invalidInputsMonths = () => {
  error();

  smallEl[0].classList.add("hidden");
  smallEl[1].textContent = "Must be a valid month";
  smallEl[2].classList.add("hidden");
};

// display error if years input is invalid
const invalidInputsYears = () => {
  error();
  smallEl[0].classList.add("hidden");
  smallEl[1].classList.add("hidden");
  smallEl[2].textContent = "Must be in the past";
};


//clear all errors
const clearErrors = () => {
  inputDay.classList.remove("inputs-red");
  inputMonth.classList.remove("inputs-red");
  inputYear.classList.remove("inputs-red");

  for (let i = 0; i < 3; i++) {
    smallEl[i].classList.add("hidden");
    labelsEl[i].classList.remove("labels-red");
  }
};

//calculate inputs
const calc = () => {
  const hasInput = inputDay.value && inputMonth.value && inputYear.value;

  if (!hasInput) {
    emptyInputs();
  } else if (
    inputDay.value > 31 &&
    inputMonth.value > 12 &&
    inputYear.value > year
  ) {
    invalidInputsAll();
  } else if (
    inputDay.value < 1 &&
    inputMonth.value < 1 &&
    inputYear.value < 1
  ) {
    invalidInputsAll();
  } else if (inputDay.value > day || inputDay.value < 1){
    invalidInputsDays()

  }else if (inputMonth.value > 12 || inputMonth.value < 1) {
    invalidInputsMonths();
  } else if (inputYear.value >year || inputYear.value < 1) {
    invalidInputsYears();
  } else {
    render();
  }
};

//calls tthe clearErrors function
for (let i = 0; i < 3; i++) {
  inputs[i].addEventListener("input", clearErrors);
}

//calls the click function
iconBtn.addEventListener("click", calc);
