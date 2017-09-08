"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
// make array of all keys, querySelectorAll standard gives a nodelist
const keys = [...document.querySelectorAll('.bottom span')];
console.log(typeof(keys));
console.log(Array.isArray(keys));
const operators = ["+", "-", "x", "÷"];

let operation = "";
let ans;
let hasDecimal = false;

// which is faster?
// console.log(keys[0].dataset.key);
// console.log(keys[0].getAttribute("data-key"));

keys.map(key => key.addEventListener("click", keyHandler));


function keyHandler(e) {
    const key = e.target.dataset.key;
    // console.log(e);
    // console.log(e.target);

    console.log(input.innerHTML);
    if (key === "." && hasDecimal) {
        return;
    }

    if(key === "." && operation.length === 0) {
        input.innerHTML = "0.";
    }

    if (key !== "delete") {
        operation += key;
        input.innerHTML = operation;
        if (key === ".") {
            hasDecimal = true;
        }
    }

    if (key === 'delete') {
        operation = operation.slice(0, -1);
        input.innerHTML = operation;
    } else if (key === "=") {
        if (ans.toString().indexOf(".") === -1) {
            hasDecimal = false;
        }
        operation = operation.slice(0, -1);
        operation = ans.toString();
        ans = "&nbsp;";
        input.innerHTML = operation;
        result.innerHTML = ans;
    }

    if (operators.indexOf(key) !== -1) {
      hasDecimal = false;
    }

    if (key.match(/\d/)) {
        let jsMath = operation.replace(/x/g, "*").replace(/÷/g, "/");
        ans = +(eval(jsMath)).toFixed(5);
        console.log(ans);
        result.innerHTML = ans;
    }
}
