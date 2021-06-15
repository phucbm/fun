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
        console.log(`Stop sorting ${side} array`);
        return array;
    }

    let pivotIndex = array.length - 1, // get the last item as pivot
        pivot = array[pivotIndex],
        left = [], right = [],
        currentItem;

    console.log(`   Get pivot = ${pivot} in ${side} array `, array);

    // loop [0;pivotIndex)
    for (let i = 0; i < pivotIndex; i++) {
        currentItem = array[i];

        if (currentItem < pivot) {
            if (asc) {
                left.push(currentItem);
                console.log(`#${push} Push `, currentItem, ` to left `, left, ' < ', pivot);
                push++;
            } else {
                right.push(currentItem);
                console.log(`#${push} Push `, currentItem, ` to right `, right, ' < ', pivot);
                push++;
            }
        } else {
            if (asc) {
                right.push(currentItem);
                console.log(`#${push} Push `, currentItem, ` to right `, right, ' > ', pivot);
                push++;
            } else {
                left.push(currentItem);
                console.log(`#${push} Push `, currentItem, ` to left `, left, ' > ', pivot);
                push++;
            }
        }
    }

    return [...quick_sort_dev(left, asc, 'left', push), pivot, ...quick_sort_dev(right, asc, 'right', push)];
}


console.log(quick_sort_dev([100, 2, 5, 4, 7, 5, 6, 8, 0, 12, 34, 15]));