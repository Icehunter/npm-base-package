'use strict';

process.env.NODE_ENV = 'test';

var myModule = null;
var stubs = {};

describe('module tests', function () {
    beforeEach(function (done) {
        for (var stub in stubs) {
            try {
                stubs[stub].restore();
            }
            catch (err) {
            }
        }
        done();
    });
    describe('when initializing the module', function () {
        it('should be successful', function (done) {
            myModule = require('../lib/module')();
            done();
        });
    });
});