/* global describe, it, beforeEach */

'use strict';

process.env.NODE_ENV = 'test';

var privateModule = require('../lib/module-private');
var instance1;
var instance2;

var should = require('should');
var stubs = {};

describe('Private Module Tests', function () {
    beforeEach(function (done) {
        for (var stub in stubs) {
            try {
                stubs[stub].restore();
            }
            catch (err) {}
        }
        done();
    });
    describe('Initializing', function () {
        describe('when creating a new instance of the module', function () {
            it('should not have an error', function (done) {
                var x = privateModule({
                    mocking: true
                });
                x.should.have.property('initializeModule');
                should.not.exist(x.initialized);
                done();
            });
        });
    });
    describe('Function Calls', function () {
        describe('when calling "initializeModule"', function () {
            it('should not have an error', function (done) {
                var x = privateModule({
                    mocking: {}
                });
                x.should.have.property('initializeModule');
                should.not.exist(x.initialized);
                x.initializeModule(x);
                should.exist(x.initialized);
                done();
            });
        });
        describe('when creating more than one instance', function () {
            it('should not have an error', function (done) {
                instance1 = privateModule({
                    mocking: true
                });
                instance1.initializeModule(instance1);
                instance2 = privateModule({
                    mocking: true
                });
                instance2.initializeModule(instance2);
                done();
            });
            describe('if we add .name = "instance1" to the first instance', function () {
                it('"instance2" should not have a name', function (done) {
                    delete instance1.name;
                    delete instance2.name;
                    instance1.name = 'instance1';
                    instance1.name.should.equal('instance1');
                    should.not.exist(instance2.name);
                    done();
                });
            });
            describe('if we add .name = "instance2" to the second instance', function () {
                it('"instance1" should not have a name', function (done) {
                    delete instance1.name;
                    delete instance2.name;
                    instance2.name = 'instance2';
                    instance2.name.should.equal('instance2');
                    should.not.exist(instance1.name);
                    done();
                });
            });
            describe('if we add .name to both instances and they are different names', function () {
                it('they should keep their own names', function (done) {
                    delete instance1.name;
                    delete instance2.name;
                    instance1.name = 'instance1';
                    instance1.name.should.equal('instance1');
                    instance2.name = 'instance2';
                    instance2.name.should.equal('instance2');
                    instance1.name.should.not.equal(instance2.name);
                    instance2.name.should.not.equal(instance1.name);
                    done();
                });
            });
        });
    });
});
