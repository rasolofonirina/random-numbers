const series = document.getElementById('series');
const numbers = document.getElementById('numbers');
const from = document.getElementById('from');
const to = document.getElementById('to');
const inputs = document.querySelectorAll('input');
const generate = document.getElementById('generate');
const results = document.getElementById('results');

function enableGenerateButton() {
    generate.removeAttribute('disabled');
}

function disableGenerateButton() {
    generate.setAttribute('disabled', 'true');
}

function checkInputs() {
    let allInputsNotEmptyAndNumbers = true;

    for (let input of inputs) {
        if (input.value === '') {
            allInputsNotEmptyAndNumbers = false;
            break;
        }

        if (isNaN(input.value)) {
            allInputsNotEmptyAndNumbers = false;
            break;
        }
    }

    if (allInputsNotEmptyAndNumbers) {
        enableGenerateButton();
    } else {
        disableGenerateButton();
    }
}

function clearInputs() {
    for (let input of inputs) {
        input.value = '';
    }
}

function countNumbersInRange(start, end) {
    let count = 0;
    for (let i = start; i <= end; i++) {
        count++;
    }
    return count;
}

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}

function getRandomNumbers(min, max, count) {
    let randomNumbers = [];

    for (let i = 0; i < count; i++) {
        let randomNumber = getRandomNumber(min, max);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        } else {
            i--;
        }
    }

    randomNumbers.sort((a, b) => a - b);

    let output = randomNumbers.join(' ');

    return output;
}

function getSeriesOfRandomNumbers(min, max, count, series) {
    let seriesOfRandomNumbers = [];

    for (let i = 0; i < series; i++) {
        let randomNumbers = getRandomNumbers(min, max, count);
        seriesOfRandomNumbers.push(randomNumbers);
    }

    return seriesOfRandomNumbers;
}

checkInputs();

inputs.forEach(input => {
    input.addEventListener('change', function () {
        checkInputs();
    });
});

generate.addEventListener('click', function () {
    let fromValue = parseInt(from.value);
    let toValue = parseInt(to.value);
    let numbersValue = parseInt(numbers.value);
    let seriesValue = parseInt(series.value);

    if (fromValue <= toValue && fromValue > 0 && toValue > 0) {
        let numbersInRange = countNumbersInRange(fromValue, toValue);

        if (numbersValue <= numbersInRange && numbersValue > 0) {
            let seriesOfRandomNumbers = getSeriesOfRandomNumbers(fromValue, toValue, numbersValue, seriesValue);

            let output = seriesOfRandomNumbers.join('<br />');

            results.innerHTML = `<div class="alert alert-success"><b>${output}</b></div>`;
        } else {
            results.innerHTML = '<div class="alert alert-danger">Please check the number(s) field or the range (from ... to) fields.</div>';
        }
    } else {
        results.innerHTML = '<div class="alert alert-danger">Please check the entered values.</div>';
    }
});
