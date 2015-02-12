(function() {

    // DOM elements
    var elMinimize = document.getElementById('minimize'),
        elMaximize = document.getElementById('maximize'),
        elResult = document.getElementById('result'),
        elCalculator = document.getElementById('calculator'),
        elClear = document.getElementById('clear'),
        elClearMemory = document.getElementById('clearMemory'),
        elClose = document.getElementById('close'),
        elDecimal = document.getElementById('decimal'),
        elPolarity = document.getElementById('polarity'),
        elZero = document.getElementById('zero'),
        elEquals = document.getElementById('equals'),
        elsNumbers = document.getElementsByClassName('num'),
        elsOperators = document.getElementsByClassName('operator');

    var lastNum;
    var currentOperator;
    var memoryValue;
    var currentPolarity = '+';
    var resetResult = false;

    // Event handlers

    var onClearClick = function () {
        lastNum = 0;
        currentPolarity = '+';
        elResult.innerHTML = lastNum.toString();
    };

    var onClearMemoryClick = function() {
        memoryValue = undefined;
    };

    var onCloseClick = function() {
        elCalculator.classList.add('hide');
    };

    var onEqualsClick = function () {
        var result;
        var currentNum = parseFloat(elResult.innerHTML);

        switch (currentOperator.toLowerCase()) {
            case '+' :
                result = lastNum + currentNum;
                break;

            case '-' :
                result = lastNum - currentNum;
                break;

            case 'x' :
                result = lastNum * currentNum;
                break;

            case '%' :
                result = lastNum / currentNum;
                break;
        }

        elResult.innerHTML = result;
    };

    var onLiteralClick = function (e) {
        var val = e.currentTarget.innerHTML;

        // only allow one decimal
        if (val !== '.' || elResult.innerHTML.indexOf('.') < 0) {
            elResult.innerHTML += e.currentTarget.innerHTML;
        }
    };

    var onMaximizeClick = function() {
        elCalculator.classList.remove('min');
    };

    var onMinimizeClick = function() {
        elCalculator.classList.add('min');
    };

    var onNumberClick = function (e) {
        var num = parseInt(e.target.innerHTML);

        if (resetResult) {
            resetResult = false;
            elResult.innerHTML = num.toString();
        } else {
            elResult.innerHTML = parseFloat(elResult.innerHTML + num).toString();
        }
    };

    var onOperatorClick = function (e) {
        lastNum = parseFloat(elResult.innerHTML);
        resetResult = true;
        currentOperator = e.currentTarget.innerHTML;
    };

    var onPolarityClick = function() {
        var currentVal = elResult.innerHTML;

        if (parseInt(currentVal) !== 0) {
            currentPolarity = currentPolarity === '+' ? '-' : '+';
            elResult.innerHTML = currentPolarity === '+' ?
                elResult.innerHTML.replace('-', '') :
                currentPolarity + elResult.innerHTML;
        }
    };

    // Event handler bindings

    elClear.addEventListener('click', onClearClick);
    elClearMemory.addEventListener('click', onClearMemoryClick);
    elClose.addEventListener('click', onCloseClick);
    elDecimal.addEventListener('click', onLiteralClick);
    elEquals.addEventListener('click', onEqualsClick);
    elMaximize.addEventListener('click', onMaximizeClick);
    elMinimize.addEventListener('click', onMinimizeClick);
    elPolarity.addEventListener('click', onPolarityClick);
    elZero.addEventListener('click', onLiteralClick);

    for (var j = 0; j < elsNumbers.length; j++) {
        elsNumbers[j].addEventListener('click', onNumberClick);
    }

    for (var i = 0; i < elsOperators.length; i++) {
        elsOperators[i].addEventListener('click', onOperatorClick);
    }

})();