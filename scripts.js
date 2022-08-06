// global elements
let currentNumber = '';
let previousNumber = '';
let operator = '';

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
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

// function for operation buttons
operationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    operator = op;
    previousNumber = currentNumber;
    previousOperandTextElement.textContent = previousNumber + ' ' + operator;
    currentNumber = '';
    currentOperandTextElement.textContent = '';
}