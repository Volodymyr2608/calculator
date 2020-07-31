const display = document.querySelector(".display");
const opers = ["+", "-", "*", "/", "."];
let warnZero = document.querySelector(".warn");
let flagDott = false;
let posOper = -1;

document
  .querySelectorAll(".digits button")
  .forEach((button) => button.addEventListener("click", digitPressed));

function digitPressed(ev) {
  const digit = ev.target.innerText;
  console.log(display.value)
  if (display.value == 0) {
    display.value = digit
    return 1
  }
  display.value += digit;
}

const operPressed = (ev) => {
  oper = ev.target.innerText; 

  if (display.value === "") display.value += "0";
  if (display.value === "" && oper === '.') display.value += '0.'
  if (display.value.includes('^')) {

  }

  if (opers.includes(display.value[display.value.length - 1])) {
    const arrDigit = display.value.split("");
    arrDigit[arrDigit.length - 1] = oper;
    display.value = arrDigit.join("");
    return 1;
  }
  
  if (oper === '.') {
    if (!flagDott) {
      display.value += oper
      flagDott = true
    }
  }else {
    display.value += oper
    flagDott = false
  }

  posOper = display.value.lastIndexOf(oper)
};

document
  .querySelectorAll(".opers button")
  .forEach((button) => button.addEventListener("click", operPressed));

document.querySelector(".eq").addEventListener("click", eqPressed);

document
  .querySelectorAll('.baseFunction button')
  .forEach((button) => button.addEventListener("click", baseFunc));


function baseFunc(ev) {
  let el = ev.target.innerText
  let power = el.length === 2 ? el.slice(1): el;
  console.log(power)
  if (posOper === -1) {
    display.value = Math.pow(display.value, power)
    return 1
  }  
  display.value = display.value.slice(0, posOper + 1) + Math.pow(display.value.slice(posOper + 1), power)
}


function eqPressed() {
  if (!isFinite(eval(display.value))) {
    warnZero.style.display = "block";
    display.value = display.value.slice(0, display.value.length - 1);
    return 0;
  }
  warnZero.style.display = "none";
  display.value = eval(display.value);
}

document.querySelector(".reset button").addEventListener("click", () => {
  warnZero.style.display = "none";
  display.value = "";
  flagDott = false;
});
