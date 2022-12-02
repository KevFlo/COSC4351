const isHighTraffic = require('./high_traffic');

describe('Tests the high traffic module', () => {
    test('Checks if 12/03/2022, a weekend, is a high traffic day)', () => {
        expect(isHighTraffic(new Date('2022-12-03 00:00'))).toBe(true);
    });
    
    test('Checks if 12/21/2022, neither holiday or weekend, is a high traffic day', () => {
        expect(isHighTraffic(new Date('2022-12-21 00:00'))).toBe(false);
    });
    
    test('Checks if 11/24/2022, a day of the week holiday, is a high traffic day', () => {
        expect(isHighTraffic(new Date('2022-11-24 00:00'))).toBe(true);
    });
    
    test('Checks if 07/04/2022, a fixed date holiday, is a high traffic day', () => {
        expect(isHighTraffic(new Date('2022-07-04 00:00'))).toBe(true);
    });
});
