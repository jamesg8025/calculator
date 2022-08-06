// global elements
let currentNumber = '';
let previousNumber = '';
let operator = '';

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
equalsButton.addEventListener('click', calculate);


const deleteButton = document.querySelector('[data-delete]');

const allClearButton = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// every time a number button is clicked
numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
       // function for every time a button is clicked
       handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (currentNumber.length <= 12) {
        currentNumber += number;
        currentOperandTextElement.textContent = currentNumber;
    };
};

operationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

// function for operation buttons
function handleOperator(op) {
    operator = op;
    previousNumber = currentNumber;
    previousOperandTextElement.textContent = previousNumber + ' ' + operator;
    currentNumber = '';
    currentOperandTextElement.textContent = '';
};

function calculate() {
    // convert into numbers
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if (operator === '+') {
        previousNumber += currentNumber;
    } else if (operator === '-') {
        previousNumber -= currentNumber;
    } else if (operator === '*') {
        previousNumber *= currentNumber;
    } else if (operator === '÷') {
        if (currentNumber <= 0) {
            previousNumber = 'Error'
            displayResults();
            return;
        }
        previousNumber /= currentNumber;
    }
    previousNumber = roundNumbers(previousNumber);
    // convert back to string
    previousNumber = previousNumber.toString();
    displayResults();
};

function roundNumbers(number) {
    return Math.round(number * 100000) / 100000;
}

function displayResults() {
    previousOperandTextElement.textContent = '';
    operator = '';
    if (previousNumber.length <= 12) {
        currentOperandTextElement.textContent = previousNumber;
    } else {
        currentOperandTextElement.textContent = previousNumber.slice(0,12) + '...';
    }
};