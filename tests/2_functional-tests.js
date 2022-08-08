const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert a valid input such as 10L', (done) => {
        const input = '2gal'
        chai.request(server)
            .get(`/api/convert`)
            .query({ input })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                assert.hasAllKeys(res.body, ['initNum', 'initUnit', 'returnNum', 'returnUnit', 'string'])
                assert.equal(res.body.returnNum, 3.78541 * 2)
                done()
            })
    })

    test('Convert an invalid input such as 32g', (done) => {
        const input = '32g'
        chai.request(server)
            .get(`/api/convert`)
            .query({ input })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(res.text, 'invalid unit')
                done()
            })
    })

    test('Convert an invalid number such as 3/7.2/4kg', (done) => {
        const input = '3/7.2/4kg'
        chai.request(server)
            .get(`/api/convert`)
            .query({ input })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(res.text, 'invalid number')
                done()
            })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done) => {
        const input = '3/7.2/4kilomegagram'
        chai.request(server)
            .get(`/api/convert`)
            .query({ input })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(res.text, 'invalid number and unit')
                done()
            })
    })

    test('Convert with no number such as kg', (done) => {
        const input = 'kg'
        chai.request(server)
            .get(`/api/convert`)
            .query({ input })
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                assert.deepEqual(res.body, { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" })
                done()
            })
    })
});
