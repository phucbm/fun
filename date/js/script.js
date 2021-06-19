let DATE = {
    /** check leap year **/
    isLeapYear: (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0),

    /** log **/
    log(string, warn = false) {
        if (warn) {
            console.warn(string);
        } else {
            console.log(string);
        }
    },

    /** get month object **/
    getMonth(m, y) {
        let monthIndex = Math.max(Math.min(11, m - 1), 0),
            months = [
                {name: 'Jan', days: 31},
                {name: 'Feb', days: this.isLeapYear(y) ? 29 : 28},
                {name: 'Mar', days: 31},
                {name: 'Apr', days: 30},
                {name: 'May', days: 31},
                {name: 'Jun', days: 30},
                {name: 'Jul', days: 31},
                {name: 'Aug', days: 31},
                {name: 'Sep', days: 30},
                {name: 'Oct', days: 31},
                {name: 'Nov', days: 30},
                {name: 'Dec', days: 31}
            ];
        return months[monthIndex];
    },

    /** get date object **/
    getDate(dateString) {
        // length must equal to 10 to fit with format "dd/mm/yyyy"
        if (dateString.length !== 10) {
            this.log(`Invalid input [${dateString}]. Length of input must be 10.`, true);
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
            this.log(`Invalid year [${dateObject.y}]. Only accept year from 0 to 4444.`, true);
            return false;
        }

        // month in range [1;12]
        if (dateObject.m < 1 || dateObject.m > 12) {
            this.log(`Invalid month [${dateObject.m}]. Only accept month from 1 to 12.`, true);
            return false;
        }

        // day in range [1;maxDaysOfMonth]
        const month = this.getMonth(dateObject.m, dateObject.y);
        if (dateObject.d < 1 || dateObject.d > month.days) {
            if (dateObject.d > month.days && month.days === 29) {
                this.log(`Invalid day [${dateObject.d}]. [${dateObject.y}] is a leap year, so there are only 29 days in ${month.name}.`, true);
            } else {
                this.log(`Invalid day [${dateObject.d}]. Day in ${month.name} of [${dateObject.y}] must from 1 to ${month.days}.`, true);
            }
            return false;
        }

        return dateObject;
    },

    /** get year days **/
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

    /** operate date **/
    operate: (dateString1, operator, dateString2) => {
        return DATE.getDate(dateString1);
    },
};


let date = DATE.getDate("13/10/1996"), num = DATE.dateToNumber(date);
console.log(num);
console.log(DATE.numberToDate(num));