const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', () => {
        test('Whole number input', (done) => {
            const input = '32L'
            assert.equal(convertHandler.getNum(input), 32)
            done()
        })

        test('Decimal input', (done) => {
            const input = '3.2L'
            assert.equal(convertHandler.getNum(input), 3.2)
            done()
        })

        test('Fractional input', (done) => {
            const input = '3/2L'
            assert.equal(convertHandler.getNum(input), 3 / 2)
            done()
        })

        test('Fractional input with a decimal', (done) => {
            const input = '3.2/2L'
            assert.equal(convertHandler.getNum(input), 3.2 / 2)
            done()
        })

        test('Double fraction', (done) => {
            const input = '3.2/2/2L'
            assert.equal(convertHandler.getNum(input), 'invalid number')
            done()
        })

        test('No numerical input provided', (done) => {
            const input = 'L'
            assert.equal(convertHandler.getNum(input), 1)
            done()
        })

        test('Correctly read each valid input unit', (done) => {
            let input = '2L'
            assert.equal(convertHandler.getUnit(input), 'L')
            input = '3gal'
            assert.equal(convertHandler.getUnit(input), 'gal')
            input = '4mi'
            assert.equal(convertHandler.getUnit(input), 'mi')
            input = '2.5km'
            assert.equal(convertHandler.getUnit(input), 'km')
            input = '6kg'
            assert.equal(convertHandler.getUnit(input), 'kg')
            input = '7lbs'
            assert.equal(convertHandler.getUnit(input), 'lbs')
            done()
        })

        test('Correctly return an error for an invalid input unit', (done) => {
            let input = '2Ll'
            assert.equal(convertHandler.getUnit(input), 'invalid unit')
            done()
        })

        test('Return the correct return unit for each valid input unit', (done) => {
            let input = '2l'
            assert.equal(convertHandler.getUnit(input), 'L')
            input = '3GAl'
            assert.equal(convertHandler.getUnit(input), 'gal')
            input = '4Mi'
            assert.equal(convertHandler.getUnit(input), 'mi')
            input = '2.5km'
            assert.equal(convertHandler.getUnit(input), 'km')
            input = '6Kg'
            assert.equal(convertHandler.getUnit(input), 'kg')
            input = '7lbs'
            assert.equal(convertHandler.getUnit(input), 'lbs')
            done()
        })

        test('Correctly return the spelled-out string unit for each valid input unit', (done) => {
            assert.equal(convertHandler.spellOutUnit('L'), 'liters')
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
            done()
        })

        test('Correctly convert gal to L', (done) => {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L')
            done()
        })

        test('Correctly convert L to gal', (done) => {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal')
            done()
        })

        test('Correctly convert km to mi', (done) => {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi')
            done()
        })

        test('Correctly convert mi to km', (done) => {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km')
            done()
        })

        test('Correctly convert kg to lbs', (done) => {
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
            done()
        })

        test('Correctly convert lbs to kg', (done) => {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
            done()
        })

    })
});