/**
 * Quick sort
 * @param array
 * @param asc
 * @returns {*[]|*}
 */
function quick_sort(array, asc = true) {
    if (array.length < 2) return array;

    let pivotIndex = array.length - 1, // get the last item as pivot
        pivot = array[pivotIndex],
        left = [], right = [],
        currentItem;

    // loop [0;pivotIndex)
    for (let i = 0; i < pivotIndex; i++) {
        currentItem = array[i];

        if (currentItem < pivot) {
            if (asc) {
                left.push(currentItem);
            } else {
                right.push(currentItem);
            }
        } else {
            if (asc) {
                right.push(currentItem);
            } else {
                left.push(currentItem);
            }
        }
    }

    // merge left + pivot + right and return
    return [...quick_sort(left, asc), pivot, ...quick_sort(right, asc)];
}


/**
 * Quick sort (for dev mode)
 * @param array
 * @param asc
 * @param side
 * @param push
 * @returns {*[]|*}
 */
function quick_sort_dev(array, asc = true, side = 'full', push = 1) {
    if (array.length < 2) {
        print(`Stop sorting ${side} array ${array_to_string(array)}`);
        return array;
    }

    let pivotIndex = array.length - 1, // get the last item as pivot
        pivot = array[pivotIndex],
        left = [], right = [],
        currentItem;

    print(`From ${side} array ${array_to_string(array)}, set pivot = ${color.pivot(pivot)}`);

    // loop [0;pivotIndex)
    for (let i = 0; i < pivotIndex; i++) {
        currentItem = array[i];

        if (currentItem < pivot) {
            if (asc) {
                left.push(currentItem);
                print(`#${push} Push ${color.num(currentItem)} to the left side of pivot => ${color.num(array_to_string(left))} + ${color.pivot(pivot)}`);
                push++;
            } else {
                right.push(currentItem);
                print(`#${push} Push ${color.num(currentItem)} to the right side of pivot => ${color.pivot(pivot)} + ${color.num(array_to_string(right))}`);
                push++;
            }
        } else {
            if (asc) {
                right.push(currentItem);
                print(`#${push} Push ${color.num(currentItem)} to the right side of pivot => ${color.pivot(pivot)} + ${color.num(array_to_string(right))}`);
                push++;
            } else {
                left.push(currentItem);
                print(`#${push} Push ${color.num(currentItem)} to the left side of pivot => ${color.num(array_to_string(left))} + ${color.pivot(pivot)}`);
                push++;
            }
        }
    }

    return [...quick_sort_dev(left, asc, 'left', push), pivot, ...quick_sort_dev(right, asc, 'right', push)];
}


/**
 * Print and decor functions
 */
let color = {
    num: (num) => `<span class="tag is-info">${num}</span>`,
    pivot: (num) => `<span class="tag is-success">${num}</span>`,
}, print = function (string) {
    $('#printer').append(`<div class="box">${string}</div>`);
};


/**
 * Convert array of numbers to a string for demo purpose
 * @param array
 * @returns {string}
 */
function array_to_string(array) {
    let string = '[';
    for (let i in array) {
        string += array[i] + ((i < array.length - 1) ? ', ' : '');
    }
    return string + ']';
}


/**
 * Convert a string to an array of numbers
 * @param string
 * @returns {*[]}
 */
function string_to_number_array(string) {
    let result = [],
        array = string.split(' '), number;
    for (let i in array) {
        number = parseFloat(array[i]);
        if (!isNaN(number)) {
            result.push(number);
        }
    }
    return result;
}


/**
 * On input changing
 */
$('#input').on('change keyup', function () {
    $('#printer').html('');

    let $this = $(this),
        array = string_to_number_array($this.val()),
        sortedString = array_to_string(quick_sort_dev(array));

    // update sorted numbers
    $('#converted-array').val(sortedString);
});