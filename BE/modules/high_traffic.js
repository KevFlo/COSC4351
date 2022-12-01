const date = new Date('2015-01-01 10:20');
const holidays = require('./date_holidays.json');
// Formatted as "month-weekNumInMonth-dayOfTheWeek"
const dotw_holidays = require('./dotw_holidays.json');

function isWeekend(_date) {
    // Saturday and Sunday are considered day 6 and day 0 respectively
    return (_date.getDay() % 6 === 0);
}

function isHoliday(_date) {
    month_day = String(_date.getMonth() + 1)+'-'+String(_date.getDate());
    month_week_dotw = String(_date.getMonth() + 1)+'-'+String(Math.ceil((_date.getDate()) / 7))+'-'+String(_date.getDay());
    console.log(month_day);
    console.log(month_week_dotw);
    return (holidays.includes(month_day) || dotw_holidays.includes(month_week_dotw));
}

function isHighTraffic(_date) {
    return (isWeekend(_date) || isHoliday(_date));
}

console.log(isHighTraffic(date));

module.exports = isHighTraffic;
