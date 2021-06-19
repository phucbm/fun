let DATE = {
    /** log **/
    log(string, warn = false, print = false) {
        if (warn) {
            console.warn(string);
        } else {
            console.log(string);
        }
        if (print) {
            $('#printer').append(`<div class="box">${string}</div>`);
        }
    },

    /** check leap year **/
    isLeapYear: (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0),

    /** get month object **/
    getMonth(m, y) {
        let monthIndex = Math.max(Math.min(11, m - 1), 0),
            months = [
                {name: 'January', days: 31},
                {name: 'February', days: this.isLeapYear(y) ? 29 : 28},
                {name: 'March', days: 31},
                {name: 'April', days: 30},
                {name: 'May', days: 31},
                {name: 'June', days: 30},
                {name: 'July', days: 31},
                {name: 'August', days: 31},
                {name: 'September', days: 30},
                {name: 'October', days: 31},
                {name: 'November', days: 30},
                {name: 'December', days: 31}
            ];
        return months[monthIndex];
    },

    /** get date object from date string **/
    getDate(dateString, print = false) {
        // length must equal to 10 to fit with format "dd/mm/yyyy"
        if (dateString.length !== 10) {
            this.log(`Invalid input [${dateString}]. Length of input must be 10.`, true, print);
            return false;
        }

        // extract string into date object
        let dateObject = {
            d: parseInt(dateString.substr(0, 2)),
            m: parseInt(dateString.substr(3, 2)),
            y: parseInt(dateString.substr(6)),
        };

        // year in range [1;9999]
        if (dateObject.y < 0 || dateObject.y > 4444) {
            this.log(`Invalid year [${dateObject.y}]. Only accept year from 0 to 4444.`, true, print);
            return false;
        }

        // month in range [1;12]
        if (dateObject.m < 1 || dateObject.m > 12) {
            this.log(`Invalid month [${dateObject.m}]. Only accept month from 1 to 12.`, true, print);
            return false;
        }

        // day in range [1;maxDaysOfMonth]
        const month = this.getMonth(dateObject.m, dateObject.y);
        if (dateObject.d < 1 || dateObject.d > month.days) {
            if (dateObject.d > month.days && month.days === 29) {
                this.log(`Invalid day [${dateObject.d}]. [${dateObject.y}] is a leap year, so there are only 29 days in ${month.name}.`, true, print);
            } else {
                this.log(`Invalid day [${dateObject.d}]. Day in ${month.name} of [${dateObject.y}] must from 1 to ${month.days}.`, true, print);
            }
            return false;
        }

        return dateObject;
    },

    /** get number of days in year **/
    getYearDays(y) {
        return this.isLeapYear(y) ? 366 : 365;
    },

    /** convert date to number **/
    dateToNumber(dateObject) {
        let days = dateObject.d;

        // count month
        for (let i = dateObject.m - 1; i > 0; i--) {
            days += this.getMonth(i, dateObject.y).days;
        }

        // count year
        for (let y = dateObject.y - 1; y >= 0; y--) {
            days += this.getYearDays(y);
        }

        return days;
    },

    /** convert number to date **/
    numberToDate(number) {
        let dateObject = {y: 0, m: 1, d: 1};

        // find year
        let nextYearDays = this.getYearDays(dateObject.y + 1),
            currentYearDays = this.getYearDays(dateObject.y);
        while (number > nextYearDays && number > currentYearDays) {
            // increase year
            dateObject.y++;

            // update
            number -= currentYearDays;
            nextYearDays = this.getYearDays(dateObject.y + 1);
            currentYearDays = this.getYearDays(dateObject.y);
        }

        // find month
        let nextMonthDays = this.getMonth(dateObject.m + 1, dateObject.y).days,
            currentMonthDays = this.getMonth(dateObject.m, dateObject.y).days;
        while (number > nextMonthDays && number > currentMonthDays) {
            // increase month
            dateObject.m++;

            // update
            number -= currentMonthDays;
            nextMonthDays = this.getMonth(dateObject.m + 1, dateObject.y).days;
            currentMonthDays = this.getMonth(dateObject.m, dateObject.y).days;
        }

        // update day
        dateObject.d = number;

        return dateObject;
    },

    /** get formatted date in **/
    formatDate(dateObject) {
        return `${dateObject.d}/${dateObject.m}/${dateObject.y}`;
    },

    /** compare date **/
    compare(dateObject1, operator, dateObject2) {
        let result = false,
            numDate1 = this.dateToNumber(dateObject1),
            numDate2 = this.dateToNumber(dateObject2);
        switch (operator) {
            case '>':
                result = numDate1 > numDate2;
                break;
            case '<':
                result = numDate1 < numDate2;
                break;
            case '>=':
                result = numDate1 >= numDate2;
                break;
            case '<=':
                result = numDate1 <= numDate2;
                break;
            case '==':
                result = numDate1 === numDate2;
                break;
            case '!=':
                result = numDate1 !== numDate2;
                break;
        }
        return result;
    },

    /** calculate **/
    calculate(dateObject, operator) {
        let newDateObject = false,
            numDate = this.dateToNumber(dateObject);
        switch (operator) {
            case '++':
            case 'tomorrow':
                newDateObject = this.numberToDate(numDate + 1);
                break;
            case '--':
            case 'yesterday':
                newDateObject = this.numberToDate(numDate - 1);
                break;
        }
        return newDateObject;
    },

    /** get day different **/
    diff(dateObject1, dateObject2) {
        return this.dateToNumber(dateObject1) - this.dateToNumber(dateObject2);
    },

    /** get today in object **/
    getToday() {
        let today = new Date();
        return {
            y: today.getFullYear(),
            m: today.getMonth() + 1,
            d: today.getDate()
        };
    },

    /** get weekday **/
    getWeekday(dateObject) {
        let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if (dateObject.m < 3) {
            dateObject.m += 12;
            dateObject.y--;
        }

        return day[(dateObject.d + 2 * dateObject.m + Math.floor((3 * (dateObject.m + 1)) / 5) + dateObject.y + Math.floor(dateObject.y / 4)) % 7];
    },


    /** get lunar year **/
    getLunarYearName(dateObject) {
        let can = ["Canh", "Tan", "Nham", "Quy", "Giap", "At", "Binh", "Dinh", "Mau", "Ky"],
            chi = ["Than", "Dau", "Tuat", "Hoi", "Ty", "Suu", "Dan", "Mao", "Thin", "Ty", "Ngo", "Mui"];

        return can[dateObject.y % 10] + " " + chi[dateObject.y % 12];
    },


    /** get zodiac **/
    getZodiac(dateObject) {
        let zodiac = [
            {
                'name': 'Aries',
                'from': {d: 21, m: 3},
                'to': {d: 20, m: 4},
            },
            {
                'name': 'Taurus',
                'from': {d: 20, m: 4},
                'to': {d: 21, m: 5},
            },
            {
                'name': 'Gemini',
                'from': {d: 21, m: 5},
                'to': {d: 21, m: 6},
            },
            {
                'name': 'Cancer',
                'from': {d: 21, m: 6},
                'to': {d: 23, m: 7},
            },
            {
                'name': 'Leo',
                'from': {d: 23, m: 7},
                'to': {d: 23, m: 8},
            },
            {
                'name': 'Virgo',
                'from': {d: 23, m: 8},
                'to': {d: 23, m: 9},
            },
            {
                'name': 'Libra',
                'from': {d: 23, m: 9},
                'to': {d: 23, m: 10},
            }, {
                'name': 'Scorpio',
                'from': {d: 23, m: 10},
                'to': {d: 22, m: 11},
            },
            {
                'name': 'Sagittarius',
                'from': {d: 23, m: 11},
                'to': {d: 22, m: 12},
            },
            {
                'name': 'Capricorn',
                'from': {d: 22, m: 12},
                'to': {d: 20, m: 1},
            },
            {
                'name': 'Aquarius',
                'from': {d: 20, m: 1},
                'to': {d: 19, m: 2},
            },
            {
                'name': 'Pisces',
                'from': {d: 19, m: 2},
                'to': {d: 21, m: 3},
            },
        ];

        for (let i = 0; i < zodiac.length; i++) {
            let fromDate = {d: zodiac[i].from.d, m: zodiac[i].from.m, y: dateObject.y},
                toDate = {d: zodiac[i].to.d, m: zodiac[i].to.m, y: dateObject.y};

            if (DATE.compare(fromDate, '>', toDate)) {
                // toDate is the next year
                toDate.y++;
            }

            // check date in range
            if (DATE.compare(dateObject, '>=', fromDate) && DATE.compare(dateObject, '<=', toDate)) {
                return zodiac[i];
            }
        }
        return {
            'name': 'Zodiac not found!',
            'from': {d: 0, m: 0},
            'to': {d: 0, m: 0},
        };
    }
};

/**
 * On input update
 */
$('#date').on('keyup click', function () {
    let dateObject = DATE.getDate($(this).val()),
        $print = $('#printer');

    $print.html('');

    if (dateObject) {
        let month = DATE.getMonth(dateObject.m, dateObject.y),
            today = DATE.getToday(),
            livedDayNumber = DATE.dateToNumber(today) - DATE.dateToNumber(dateObject),
            livedDayObject = DATE.numberToDate(livedDayNumber),
            thisYearBirthday = {y: today.y, m: dateObject.m, d: dateObject.d},
            tillBirthday = DATE.diff(thisYearBirthday, today),
            zodiac = DATE.getZodiac(dateObject);

        // your were born
        $print.append(`<div class="box">You were born on ${DATE.getWeekday(dateObject)}, ${month.name} ${dateObject.d}, ${dateObject.y} (${DATE.getLunarYearName(dateObject)})</div>`);

        // zodiac
        $print.append(`<div class="box">Your zodiac sign is ${zodiac.name} (${zodiac.from.d}/${zodiac.from.m} - ${zodiac.to.d}/${zodiac.to.m})</div>`);

        // days in this month
        //$print.append(`<div class="box">There are ${month.days} days in ${month.name}</div>`);

        // is leap year
        $print.append(`<div class="box">${dateObject.y} is a ${DATE.isLeapYear(dateObject.y) ? 'leap' : 'common'} year.</div>`);

        // is leaper
        if (dateObject.m === 2 && dateObject.d === 29) {
            if (DATE.isLeapYear(today.y)) {
                $print.append(`<div class="box">Congrats and happy birthday! You're a leaper.</div>`);
            } else {
                $print.append(`<div class="box">Be happy! You will have your birthday soon.</div>`);
            }
        }

        // days from that day to today
        $print.append(`<div class="box">You have lived on earth for ${livedDayObject.y} years, ${livedDayObject.m} months, ${livedDayObject.d} days in total ${livedDayNumber} days.</div>`);

        // till birthday
        if (tillBirthday < 0) {
            $print.append(`<div class="box">Your birthday was ${tillBirthday} days ago.</div>`);
        } else if (tillBirthday > 0) {
            $print.append(`<div class="box">Your next birthday will come in ${tillBirthday} days.</div>`);
        } else {
            $print.append(`<div class="box">Happy birthday! It's your birthday today.</div>`);
        }

        // yesterday, today, tomorrow
        $print.append(`<div class="box">Yesterday was ${DATE.formatDate(DATE.calculate(today, 'yesterday'))}</div>`);
        $print.append(`<div class="box">Today is ${DATE.formatDate(today)}</div>`);
        $print.append(`<div class="box">Tomorrow is ${DATE.formatDate(DATE.calculate(today, '++'))}</div>`);
    } else {
        DATE.getDate($(this).val(), true);
    }

});