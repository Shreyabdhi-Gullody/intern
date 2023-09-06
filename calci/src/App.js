import React, { useState } from 'react';
import './App.css';
import * as math from 'mathjs';

function App() {
  const [display, setDisplay] = useState('0');
  const [currentNumber, setCurrentNumber] = useState('');
  const [previousNumber, setPreviousNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [calculatorColor, setCalculatorColor] = useState('white'); // Initial color is white
  const [history, setHistory] = useState('');

  function handleNumberClick(num) {
    if (currentNumber === '0' || currentNumber === '') {
      setCurrentNumber(num);
      setDisplay(num);
    } else {
      setCurrentNumber(currentNumber + num);
      setDisplay(currentNumber + num);
    }
  }

  function handleOperatorClick(newOperator) {
    if (operator === '') {
      if (newOperator === '+' || newOperator === '-') {
        if (currentNumber === '') {
          setCurrentNumber(newOperator);
          setDisplay(newOperator);
        } else {
          setOperator(newOperator);
          setPreviousNumber(currentNumber);
          setCurrentNumber('');
          setHistory(history + ' ' + currentNumber + ' ' + newOperator);
          setDisplay(newOperator);
        }
      } else {
        setOperator(newOperator);
        setPreviousNumber(currentNumber);
        setCurrentNumber('');
        setHistory(history + ' ' + currentNumber + ' ' + newOperator);
        setDisplay(newOperator);
      }
    } else {
      calculateResult();
      setOperator(newOperator);
      setHistory(history + ' ' + currentNumber + ' ' + newOperator);
      setDisplay(newOperator);
    }
  }  

  function handleDelete() {
    if (currentNumber !== '' && operator !== '') {
      // If there is a current number and an operator, clear both
      setCurrentNumber('');
      setOperator('');
      setDisplay('0');
    } else if (currentNumber !== '') {
      // If there is a current number, remove the last character
      const newCurrentNumber = currentNumber.slice(0, -1);
      setCurrentNumber(newCurrentNumber);
      setDisplay(newCurrentNumber === '' ? '0' : newCurrentNumber);
    } else if (operator !== '') {
      // If there is an operator, clear it
      setOperator('');
      // Do not clear the history or change the display here
    } else {
      // If none of the above, clear the previous number
      setPreviousNumber('');
      setDisplay('0');
    }
  }
  
  
  
  

  function handleColorChange() {
    if (calculatorColor === 'white') {
      setCalculatorColor('lightblue'); // Change the color to light blue
    } else if(calculatorColor === 'lightblue'){
      setCalculatorColor('pink'); // Reset the color to pink
    }
    else{
      setCalculatorColor('white');
    }
  }

  function calculateResult() {
    let result;
    switch (operator) {
      case '+':
        result = math.add(parseFloat(previousNumber), parseFloat(currentNumber));
        break;
      case '-':
        result = math.subtract(parseFloat(previousNumber), parseFloat(currentNumber));
        break;
      case '*':
        result = math.multiply(parseFloat(previousNumber), parseFloat(currentNumber));
        break;
      case '/':
        if (parseFloat(currentNumber) === 0) {
          result = 'Error: Division by zero';
        } else {
          result = math.divide(parseFloat(previousNumber), parseFloat(currentNumber));
        }
        break;
      default:
        return;
    }
    setHistory(history + ' ' + currentNumber + '=' + result);
    setDisplay(result.toString());
    setPreviousNumber(result.toString());
    setCurrentNumber('');
    setOperator('');
  }


  function handleClear() {
    setDisplay('0');
    setCurrentNumber('');
    setPreviousNumber('');
    setOperator('');
    setHistory('');
  }

  function handleEquals() {
    calculateResult();
  }

  return (
    <div className="calculator" style={{ backgroundColor: calculatorColor }}>
       <button onClick={handleColorChange} className="color-button">
        Change Color
      </button>
      <br/>
      <div className="display">{display}</div>
      <div className="history">{history}</div>
      <br/>
      <div className="buttons">
        <div className="row">
          <button onClick={handleClear} className="clear-button">
            C
          </button>
          <button onClick={handleEquals} className="equals-button">
            =
          </button>
          <button onClick={handleDelete} className="delete-button">
            DEL
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleOperatorClick('*')} className="operator-button">
            *
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleOperatorClick('-')} className="operator-button">
            -
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('+')} className="operator-button">
            +
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('0')} className="zero-button">
            0
          </button>
          <button onClick={() => handleNumberClick('.')}>.</button>
          <button onClick={() => handleOperatorClick('/')} className="operator-button">
            /
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;