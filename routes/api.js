'use strict'

const expect = require('chai').expect
const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query;
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    if (initUnit === 'invalid unit' && initNum === 'invalid number') {  
      return res.send('invalid number and unit')
    }

    if (initUnit === 'invalid unit') {
      return res.send('invalid unit')
    }

    if (initNum === 'invalid number') {
      return res.send('invalid number')
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)

    const resultObj = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    }

    res.json(resultObj)

  })

};
