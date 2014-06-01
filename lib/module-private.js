'use strict';

// if you must declare private/shared (among all instantiations) do it here
// e.g. var moduleName = 'module';

var MyExportsList = function myExportsList() {
    var _this = this;

    _this.logger.log(_this);
};

var InitializeModule = function initializeModule(parent) {
    if (!(this instanceof InitializeModule)) {
        return new InitializeModule(parent);
    }
    // if calling this function manually in a unit test you must pass the object into itself
    // e.g. var x = module(config); x.initializeModule(x);
    parent = parent || this;

    var _this = parent;

    // anything outside this package should be put here for instantiation when really initializing
    // _this.externalSomethingOrOther = _this.imports.externalSomethingOrOther({});
    _this.initialized = true;
    return _this;
};

var SetupModule = function SetupModule(config) {
    if (!(this instanceof SetupModule)) {
        return new SetupModule(config);
    }
    config = config || {};

    var _initialize = true;
    var _this = this;

    // instantiate anything here that needs to be mocked in tests
    _this.imports = {};
    // _this.imports.externalSomethingOrOther = require('external-something-or-other');

    // variables that need to be different/changeable can be exported
    // as noted at the top of this file any variables there are global to all instantiations
    _this.options = config || {};
    _this.logger = _this.options.logger || console;

    // exports functions if needed
    _this.myExportsList = MyExportsList;

    // determine if mocked
    if (_this.options.mocking) {
        _initialize = false;
        // mocking can be a object or true
        // if you pass an object do all the funky stuff you need here with that object
        _this.initializeModule = InitializeModule;
    }
    if (_initialize) {
        return new InitializeModule(_this);
    }
    return _this;
};

module.exports = SetupModule;