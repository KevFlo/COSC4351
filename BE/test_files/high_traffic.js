var date = new Date('2022-12-31');
const holidays = require('./date_holidays.json');

function isWeekend(_date) {
    // Saturday and Sunday are considered day 6 and day 0 respectively
    return _date.getDay() % 6 === 0;
}

function isHoliday(_date) {
    month_day = String(_date.getMonth() + 1)+'-'+String(_date.getDate() + 1);
    return holidays.includes(month_day);
}

console.log(isWeekend(date));
console.log(isHoliday(date));
