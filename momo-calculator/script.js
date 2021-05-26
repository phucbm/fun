jQuery(document).ready(function ($) {
    let tempKeys = [],
        functions = ['ac', 'del', 'equal', '000'],
        operators = ['subtraction', 'addition', 'multiplication', 'division'],
        orderOfOperators = [
            ['multiplication', 'division'],
            ['addition', 'subtraction']
        ];

    function get_key_type(key) {
        if (functions.indexOf(key) >= 0) return 'function';
        if (operators.indexOf(key) >= 0) return 'operator';
        return 'number';
    }

    function temp_to_string() {
        let result = '';
        for (let i = 0; i < tempKeys.length; i++) {
            result += tempKeys[i].type === "number" ? tempKeys[i].value : tempKeys[i].label;
        }

        $('.output input').val(result);

        return result;
    }

    function calculate(tempKeys) {
        let expression = temp_to_string(tempKeys);
        console.log('calculating ' + expression);

        // calculate in order of operators
        for (let i = 0; i < orderOfOperators.length; i++) {
            // find all operators in this order
            for (let j = 0; j < orderOfOperators[i].length; j++) {
                let thisOperator = orderOfOperators[i][j],
                    moveToNextOperator = false;

                while (!moveToNextOperator) {

                    // find this operator in temp keys array
                    for (let k = 0; k < tempKeys.length; k++) {
                        let thisKey = tempKeys[k];

                        if (thisKey.type === "number") {
                            // last key
                            if (k === tempKeys.length - 1) {
                                moveToNextOperator = true;
                                break;
                            }

                            // skip to next key if is not the last key
                            continue;
                        }

                        // check if is allowed operator
                        if (thisKey.type === "operator" && thisKey.value === thisOperator) {
                            let lastKey = tempKeys[k - 1],
                                nextKey = tempKeys[k + 1],
                                newKey = {
                                    "type": "number",
                                    "value": "",
                                    "label": lastKey.value + thisKey.label + nextKey.value
                                };

                            if (thisKey.value === "multiplication") {
                                newKey.value = parseInt(lastKey.value) * parseInt(nextKey.value);
                            }
                            if (thisKey.value === "division") {
                                newKey.value = Math.floor(parseInt(lastKey.value) / parseInt(nextKey.value));
                            }
                            if (thisKey.value === "addition") {
                                newKey.value = parseInt(lastKey.value) + parseInt(nextKey.value);
                            }
                            if (thisKey.value === "subtraction") {
                                newKey.value = parseInt(lastKey.value) - parseInt(nextKey.value);
                            }

                            let explanation = newKey.value < 0 ? "(Not accept minus value)" : "";
                            newKey.value = Math.max(newKey.value, 0);

                            newKey.value = newKey.value.toString();
                            console.log(lastKey.value, thisKey.label, nextKey.value, '=', newKey.value, explanation);

                            // add new key after the next key
                            tempKeys.splice(k + 2, 0, newKey);

                            // remove operator key and two keys around it
                            tempKeys.splice(k - 1, 3);

                            // break this loop
                            break;
                        }
                    }
                }
            }
        }
        console.log('result of ' + expression + " = " + tempKeys[0].value);
        return tempKeys[0].value;
    }

    function save_key_to_temp(key, label) {
        let lastKeyIndex = tempKeys.length - 1,
            lastKey = tempKeys[lastKeyIndex],
            isFirstKey = tempKeys.length === 0,
            thisKey = {'type': get_key_type(key), 'value': key, 'label': label};


        /** check operators **/
        if (thisKey.type === "operator") {
            let isDoubleOperators = !isFirstKey && lastKey.type === "operator";

            if (isDoubleOperators) {
                console.warn('[' + lastKey.type + '] and [' + key + '] are operators and cannot stand by side');
                return false;
            }
            if (isFirstKey) {
                console.warn('expression cannot begin with an operator [' + key + ']');
                return false;
            }
        }


        /** check functions **/
        if (thisKey.type === "function") {
            let isEqualAfterOperator = !isFirstKey && lastKey.type === "operator" && thisKey.value === "equal";

            if (isFirstKey) {
                console.warn('cannot execute function [' + key + '] when input is empty');
                return false;
            }
            if (isEqualAfterOperator) {
                console.warn('operator [' + lastKey.value + '] need a number after it');
                return false;
            }
            if (thisKey.value === "ac") {
                console.clear();
                tempKeys = [];
                return true;
            }
            if (thisKey.value === "del") {
                let isLastNumberHaveOneDigit = lastKey.type === "number" && lastKey.value.length === 1;

                if (isLastNumberHaveOneDigit || lastKey.type === "operator") {
                    tempKeys.pop();
                    return true;
                }
                if (!isLastNumberHaveOneDigit) {
                    // remove the last digit
                    lastKey.value = lastKey.value.slice(0, -1);

                    // replace last key with last key
                    tempKeys[lastKeyIndex] = lastKey;
                    return true;
                }
            }
            if (thisKey.value === "000") {
                if (lastKey.type === "number") {
                    // multiply last value with 1000
                    lastKey.value = (parseInt(lastKey.value) * 1000).toString();

                    // replace last key with last key
                    tempKeys[lastKeyIndex] = lastKey;
                    return true;
                }
            }
            if (thisKey.value === "equal") {
                let newKey = {"type": "number", "value": calculate(tempKeys), "label": "calc"};
                tempKeys = [newKey];
                return true;
            }
        }


        /** check numbers **/
        if (thisKey.type === "number") {
            let isNumberAfterNumber = !isFirstKey && lastKey.type === "number",
                isZeroAfterZero = isNumberAfterNumber && parseInt(lastKey.value) === 0 && thisKey.value === "0";

            if (isZeroAfterZero) {
                console.warn('zero cannot goes after a zero');
                return false;
            }
            if (isNumberAfterNumber) {
                // concat this last number with this number
                thisKey.value = lastKey.value + '' + thisKey.value;

                // replace last key with this key
                tempKeys[lastKeyIndex] = thisKey;
                return true;
            }
        }


        // save to temp keys array
        tempKeys.push(thisKey);
        return true;
    }


    /** on button click **/
    $('[data-key]').on('click', function () {
        let key = $(this).attr('data-key'),
            isSaved = save_key_to_temp(key, $(this).text());

        if (isSaved) {
            temp_to_string();
            console.log("input " + temp_to_string());
        }
    });
});