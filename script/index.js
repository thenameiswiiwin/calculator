let runningTotal = 0;
let buffer = '0';
let previousOperator;
const screen = document.querySelector('.screen');

const buttonClick = (value) => {
	isNaN(parseInt(value)) ? handleSymbol(value) : handleNumber(value);
	reRender();
};

const handleNumber = (value) =>
	buffer === '0' ? (buffer = value) : (buffer += value);

const handleMath = (value) => {
	if (buffer === '0') return;

	const intBuffer = parseInt(buffer);
	runningTotal === 0 ? (runningTotal = intBuffer) : flushOperation(intBuffer);
	previousOperator = value;
	buffer = '0';
};

const flushOperation = (intBuffer) => {
	previousOperator === '+'
		? (runningTotal += intBuffer)
		: previousOperator === '-'
		? (runningTotal -= intBuffer)
		: previousOperator === '×'
		? (runningTotal *= intBuffer)
		: (runningTotal /= intBuffer);
};

const handleSymbol = (value) => {
	switch (value) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			break;
		case '=':
			if (previousOperator === null) return;
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = +runningTotal;
			runningTotal = 0;
			break;
		case '←':
			buffer.length === 1
				? (buffer = '0')
				: (buffer = buffer.substring(0, buffer.length - 1));
			break;
		case '+':
		case '-':
		case '×':
		case '÷':
			handleMath(value);
			break;
	}
};

const reRender = () => (screen.innerText = buffer);

const init = () =>
	document.querySelector('.calc-btns').addEventListener('click', (e) => {
		buttonClick(e.target.innerText);
	});
init();
