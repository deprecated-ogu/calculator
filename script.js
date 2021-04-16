const calculator = document.querySelector('.calculator'); 
const buttons = calculator.querySelector('.calculator__buttons'); 

function calculateFunction(n1, operator, n2) {
  let result = 0;
  if (operator === '+')
    result = Number(n1) + Number(n2);
  if (operator === '-')
    result = n1 - n2;
  if (operator === '*')
    result = n1 * n2;
  if (operator === '/')
    result = n1 / n2;
  return String(result);
}

const display = document.querySelector('.calculator__display'); 
let prevNum, operator, recentKey, recentNum;

buttons.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')) {
    if (action === 'number') {
      if (display.textContent === '0' || recentKey === 'operator' || recentKey === 'calculate') 
        display.textContent = buttonContent; 
      else
        display.textContent += buttonContent; 
      recentKey = 'number';
    }

    if (action === 'operator') {
      if (prevNum !== undefined && operator !== undefined && recentKey === 'number') { 
        recentNum = Number(display.textContent); 
        prevNum = calculateFunction(prevNum, operator, recentNum); 
        display.textContent = prevNum; 
      }
      else {
        if (prevNum !== undefined) 
          recentNum = Number(display.textContent); 
        else 
          prevNum = Number(display.textContent); 
      }
      operator = buttonContent; 
      recentKey = 'operator';
    }

    if (action === 'decimal') {
      if (recentKey === 'operator')
        display.textContent = '0.'; 
      if (display.textContent.indexOf('.') === -1) 
        display.textContent += '.'; 
      recentKey = 'decimal';
    }

    if (action === 'clear') { 
      prevNum = undefined;
      operator = undefined;
      recentNum = undefined;
      display.textContent = '0';
      recentKey = 'clear';
    }

    if (action === 'calculate') {
      if (recentKey !== 'calculate') 
        recentNum = Number(display.textContent); 
      if (operator !== undefined) { 
        prevNum = calculateFunction(prevNum, operator, recentNum); 
        display.textContent = prevNum; 
      }    
      recentKey = 'calculate';
    }
  }
});

window.addEventListener("keydown", (x) => {
  let inputKey;
  inputKey = x.key;
  console.log((x.key));
  if (Number(inputKey) >= 0 && Number(inputKey) <= 9) {
    
    if (display.textContent === '0' || recentKey === 'operator' || recentKey === 'calculate')
      display.textContent = inputKey;
    else
      display.textContent += inputKey;
    recentKey = 'number';
  }

  if (inputKey === '+' || inputKey === '-' || inputKey === '*' || inputKey === '/') {
    if (prevNum !== undefined && operator !== undefined && recentKey === 'number') {
      recentNum = Number(display.textContent);
      prevNum = calculateFunction(prevNum, operator, recentNum);
      display.textContent = prevNum;
    }
    else {
      if (prevNum !== undefined)
        recentNum = Number(display.textContent);
      else
        prevNum = Number(display.textContent);
    }
    operator = inputKey;
    recentKey = 'operator';
  }

  if (inputKey === '.') {
    if (recentKey === 'operator')
      display.textContent = '0.';
    if (display.textContent.indexOf('.') === -1)
      display.textContent += '.'; 
    recentKey = 'decimal';
  }

  if (inputKey === 'Backspace') { 
    prevNum = undefined;
    operator = undefined;
    recentNum = undefined;
    display.textContent = '0';
    recentKey = 'clear';
  }
  
  if (inputKey === 'Enter') {
    if (recentKey !== 'calculate') 
      recentNum = Number(display.textContent); 
    if (operator !== undefined) { 
      prevNum = calculateFunction(prevNum, operator, recentNum); 
      display.textContent = prevNum; 
    }
    recentKey = 'calculate';
  }
    
})