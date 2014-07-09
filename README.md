### npm-base-package
***

A basic npm package setup with grunt, jshint and blanket coverage reports for unit tests.

I wanted something basic that I could copy/paste and rename a few items in order to have jshint, coverage reports and grunt already setup with watchers.

Using this is quite simple. Just clone down the repo and it's a basic copy paste to your own folder.  Once you've copied it make the following changes:

***lib/module.js***
  ~ Rename file to the name of your package.

***test/module-tests.js***
  ~ Rename file to match module.name-tests.js and inside ensure you are requiring the correct module name.

***package.json***
  ~ Replace all instances of npm-base-package with your own, update git urls and update the entry point file reference.

### Private Use

There are times when you want to make a package that when used always creates a new instance of itself. Such as your typical "car" model.

Example usage of the private module would be:

```javascript
// it can be instantiated multiple ways
// declaring the class as a variable
var carClass = require('module-private');
// then using it
var car = carClass(options, eventHandlers);
var car = new carClass(options, eventHandlers);

// just using the class by itself
var car = require('module-private')(options, eventHandlers);
var car = new require('module-private')(options, eventHandlers);

// options and eventHandlers are objects
// e.g.
var car = require('module-private')({
    logger: console
}, {
    initialized: function () {
        console.log('ready to use');
    }
});
var car = new require('module-private')({
    logger: console
}, {
    initialized: function () {
        console.log('ready to use');
    }
});

// currently any event being subscribed to that is called immediately on setup must be subscribed to in the passed arguments
// any other event you create after that is fine to call with car.on('someevent', fn);
```

Each instance will be it's own.

### Shared Use

Note: If anyone knows how or why I can't setup event emitter to work like the private example let me know!

If you were to make helper module that once instantiated needed to be shared among many. Any changes by one caller affects all others.

Example usage of the shared module would be:

```javascript
var sharedModule = require('module-shared');
var instance1 = sharedModule(options);
var instance2 = sharedModule(options);
// because instance1 already "initialized" the module, the second call would just return the first one.

// setting a name means all instances will share the same variable
instance1.name = "name1";
console.log(instance2.name); // results in "name1"
```
