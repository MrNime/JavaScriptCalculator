"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
// make array of all keys, querySelectorAll standard gives a nodelist
const keys = [...document.querySelectorAll('.bottom span')];
const operators = ["+", "-", "x", "÷"];

let operation = "";
let ans = "&nbsp;";
let hasDecimal = false;

// which is faster?
// console.log(keys[0].dataset.key);
// console.log(keys[0].getAttribute("data-key"));

keys.map(key => key.addEventListener("click", keyHandler));

// TODO: refactor entire keyHandler
function keyHandler(e) {
    const key = e.target.dataset.key;
    console.log(e);
    console.log(e.target);
    console.log(key);

    console.log('innerhtml input before: ' + input.innerHTML);
    console.log('operation before: ' + operation);

    // prevent multiple dots
    if (key === "." && hasDecimal) {
        return;
    }

    // if first input is decimal point, set operation to 0.
    if (key === "." && operation.length === 0) {
        operation += '0' + key;
        input.innerHTML = "0.";
        return;
    }

    // if first input is an operator, ignore input
    if (operators.indexOf(key) !== -1 && operation.length === 0) {
        return;
    }

    if (key !== "delete" && key !== '=') {
        let lastChar = operation[operation.length - 1];
        if (operators.indexOf(key) !== -1 && operators.indexOf(lastChar) !== -1) {
          operation = operation.slice(0, -1) + key;
      } else {
          operation += key;
      }
        input.innerHTML = operation;
        if (key === ".") {
            hasDecimal = true;
        }
    }

    if (key === 'delete') {
        operation = operation.slice(0, -1);
        if (operation.length < 1) {
            // prevent .top from shrinking if empty
            input.innerHTML = "&nbsp;";
        } else {
            input.innerHTML = operation;
        }
    }

    if (key === "=") {
        if (ans !== '&nbsp;') {
            console.log('tis niet nbsp');
            operation = ans.toString();
            ans = "&nbsp;";
            input.innerHTML = operation;
            result.innerHTML = ans;
        }
        if (ans.toString().indexOf(".") === -1) {
            hasDecimal = false;
        }
    }

    if (operators.indexOf(key) !== -1) {
      hasDecimal = false;
    }

    if (key.match(/\d/) || key == 'delete') {
        let jsMath = operation.replace(/×/g, "*").replace(/÷/g, "/");
        if (jsMath) {
            // unary plus operator
            ans = +(eval(jsMath)).toFixed(5);
        } else {
            ans = "&nbsp;";
        }
        console.log('current ans: ' + ans);
        result.innerHTML = ans;
    }
    console.log('innerhtml input after: ' + input.innerHTML);
    console.log('operation after: ' + operation);
}
