const checkDivision = (possibleFraction) => {
  const nums = possibleFraction.split('/')
  if (nums.length <= 2) {
    return nums
  }
  return false
}

function ConvertHandler() {

  this.getNum = function (input) {
    let result = input.match(/[.\d\/]+/g) || ['1']
    const nums = checkDivision(result[0])

    if (!nums) {
      return 'invalid number'
    }

    const num1 = nums[0]
    const num2 = nums[1] || '1'

    if (isNaN(num1) || isNaN(num2)) {
      return 'invalid number'
    }

    result = parseFloat(num1) / parseFloat(num2)

    return result
  }

  this.getUnit = function (input) {
    const units = ['L', 'mi', 'km', 'gal', 'lbs', 'kg']
    let result = input.match(/[a-zA-Z]+/g)
    if (!result) return undefined

    result = ['l', 'L'].includes(result[0]) ? 'L' : result[0].toLowerCase()
    return units.includes(result) ? result : 'invalid unit'
  }

  this.getReturnUnit = function (initUnit) {
    let result
    switch (initUnit) {
      case 'gal':
        result = 'L'
        break
      case 'L':
        result = 'gal'
        break;
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'

    }

    return result
  }

  this.spellOutUnit = function (unit) {
    let result
    switch (unit) {
      case 'gal':
        result = 'gallons'
        break
      case 'L':
        result = 'liters'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'km':
        result = 'kilometers'
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms'
    }
    return result
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    let result

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break
      case 'L':
        result = initNum / galToL
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsToKg
        break
    }

    return result?.toFixed(5)
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }

}

module.exports = ConvertHandler;
