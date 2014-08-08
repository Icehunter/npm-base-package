'use strict';

// if you must declare private/shared (among all instantiations) do it here
// e.g. var moduleName = 'module';

var SetupModule = function setupModule(options, eventHandlers) {
    if (!(this instanceof SetupModule)) {
        return new SetupModule(options, eventHandlers);
    }
    options = options || {};

    var _initialize = true;
    var _this = this;

    // setup emitter subscribers if passed
    if (eventHandlers) {
        for (var key in eventHandlers) {
            _this.on(key, eventHandlers[key]);
        }
    }

    // instantiate anything here that needs to be mocked in tests
    _this.imports = {};
    // _this.imports.externalSomethingOrOther = require('external-something-or-other');

    // variables that need to be different/changeable can be exported
    // as noted at the top of this file any variables there are global to all instantiations
    _this.options = options || {};

    var logger = options.logger || console;

    // setup export or internal functions
    var MyExportsList = function myExportsList() {
        var _this = this;

        logger.log(_this);
    };

    var InitializeModule = function initializeModule() {
        if (!(this instanceof InitializeModule)) {
            return new InitializeModule();
        }
        // anything outside this package should be put here for instantiation when really initializing
        // _this.externalSomethingOrOther = _this.imports.externalSomethingOrOther({});
        _this.initialized = true;
        _this.emit('initialized');
        return _this;
    };

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

// setup optional event emit
require('util').inherits(module.exports, require('events').EventEmitter);
