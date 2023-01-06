//Creating a class that consists of all the functionality for the calculator

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    //this method clears the input field

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //this method deletes the last number from the input field

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //this method adds a new number to the current input

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //this method selects the operation

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //this method calculcates the result

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        //the switch statement with the 4 different options and default action is below

        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
                default: 
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //this method displays the numbers properly if a decimal is used

    getDisplayNumner(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        let decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(intDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
        
    }

    //this method displays the desired result on the input field

    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumner(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandElement.textContent = `${this.getDisplayNumner(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }

    }
}

//we get a reference for the needed buttons below

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

//we create an instance of the class below
const calculator = new Calculator(previousOperandElement, currentOperandElement);

//when the numbers button is clicked we have to add the number and display the result
numberBtns.forEach(button => button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
}))


//when the operation button is clicked we have to call the operation method and display the result
operationBtns.forEach(button => button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
}))

//when the equals button is clicked we have to calculate the result and display it
equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
//when the AC button is clicked we have to clear the input field
allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
//when the delete button is clicked we remove the last number from the input field
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})