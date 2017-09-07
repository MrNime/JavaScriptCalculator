"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");
const operators = ["+", "-", "x", "÷"];

let operation = "";
let answer;
let hasDecimal = false;
