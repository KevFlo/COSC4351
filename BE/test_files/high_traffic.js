const date = new Date(2022, 12 - 1, 2);
console.log(date.getDate());
console.log(date.getMonth() + 1);
console.log(date.getDay());
const holidays = require('./date_holidays.json');
// Formatted as "month-weekNumInMonth-dayOfTheWeek"
const dotw_holidays = require('./dotw_holidays.json');

function isWeekend(_date) {
    // Saturday and Sunday are considered day 6 and day 0 respectively
    return (_date.getDay()) % 6 === 0;
}

function isHoliday(_date) {
    month_day = String(_date.getMonth() + 1)+'-'+String(_date.getDate());
    month_week_dotw = String(_date.getMonth() + 1)+'-'+String(Math.ceil((_date.getDate()) / 7))+'-'+String(_date.getDay());
    console.log(month_day);
    console.log(month_week_dotw);
    return holidays.includes(month_day) || dotw_holidays.includes(month_week_dotw);
}

console.log('High Traffic Day: ' + (isWeekend(date) || isHoliday(date)));
