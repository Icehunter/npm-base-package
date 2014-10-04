'use strict';

var path = require('path');

require('blanket')({
    pattern: [
        path.join(__dirname, '..', 'lib'),
        path.join(__dirname, '..', 'index.js')
    ]
});
