// global elements
let currentNumber = '';
let previousNumber = '';
let operator = '';

window.addEventListener('keydown', handleKeyPress);

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const posNegButton = document.querySelector('[data-posNeg]');
posNegButton.addEventListener('click', posNeg);

const decimalButton = document.querySelector('[data-decimal]');
decimalButton.addEventListener('click', () => {
    addDecimal();
});

const equalsButton = document.querySelector('[data-equals]');
equalsButton.addEventListener('click', () => {
    if (currentNumber != '' && previousNumber != '') {
        calculate();
    }
});


const deleteButton = document.querySelector('[data-delete]');
deleteButton.addEventListener('click', handleDelete);

const allClearButton = document.querySelector('[data-all-clear]');
allClearButton.addEventListener('click', allClear);

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
    // to allow us to enter number to continue operand
    if (previousNumber !== '' && currentNumber !== '' && operator === '') {
        previousNumber = ''
        currentOperandTextElement.textContent = currentNumber
    }
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
    if (previousNumber === '') {
        previousNumber = currentNumber;
        continueOperand(op);
    } else if (currentNumber === ''){
        continueOperand(op);
    } else {
        calculate();
        operator = op;
        currentOperandTextElement.textContent = '';
        previousOperandTextElement.textContent = previousNumber + ' ' + operator;
    }
};

function continueOperand(text) {
    operator = text;
    previousOperandTextElement.textContent = previousNumber + ' ' + operator;
    currentOperandTextElement.textContent = '';
    currentNumber = '';
}

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
    } else if (operator === '÷' || operator === '/') {
        if (currentNumber === 0) {
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
    if (previousNumber.length <= 12) {
        currentOperandTextElement.textContent = previousNumber;
    } else {
        currentOperandTextElement.textContent = previousNumber.slice(0,12) + '...';
    }
    previousOperandTextElement.textContent = '';
    operator = '';
    currentNumber = '';
};

function allClear() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    currentOperandTextElement.textContent = '';
    previousOperandTextElement.textContent = '';
};

function addDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        currentOperandTextElement.textContent = currentNumber;
    }
};

function handleKeyPress(e) {
    e.preventDefault()
    if(e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === 'Enter' || 
    (e.key === '=' && currentNumber != '' && previousNumber != '')) {
        calculate();
    }
    if (e.key === '+' || e.key === '-' || e.key === '/') {
        handleOperator(e.key);
    }
    if (e.key === '*') {
        handleOperator('*');
    }
    if (e.key === '.') {
        addDecimal();
    }
    if (e.key === 'Backspace') {
        handleDelete();
    }
};

function handleDelete() {
    if (currentNumber != '') {
        currentNumber = currentNumber.slice(0, -1);
        currentOperandTextElement.textContent = currentNumber;
        if (currentNumber === '') {
            currentNumber = '';
        }
    }
    if (currentNumber === '' && previousNumber !== '' && operator === '') {
        previousNumber = previousNumber.slice(0, -1);
        currentOperandTextElement.textContent = previousNumber;
    }
};

function posNeg() {
    if (currentNumber.indexOf('-') == 0) {
        currentNumber = currentNumber.substring(1); // removes the first - sign
    } else {
        currentNumber = '-' + currentNumber;
    }
    currentOperandTextElement.textContent = currentNumber;
};