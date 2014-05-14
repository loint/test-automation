// Copyright © 2014 Swiss IT Bridge
// Author: Nguyen Trung Loi (loi.nguyen)
// Maintain by loi.nguyen and ha.tran

driver = require('webdriverjs')
events = require('events')
equal = require('assert').equal
key = require('webdriverjs/lib/utils/unicodeChars');





// Make a test for your expert 


// You can redefine or add your function to WebDriverJS library
define = function(client) {
    // Define client again in here
}

// TO DO
// You can define your function in here with pattern
/*
 your_function = function(arguments) { 
 load(function() {
 Your code in here
 })
 }
 */

//--------------------------------------------------
// SCAN TEST CASE AND REGISTER ACTION
require('./task.js')

$ = driver.remote({desiredCapabilities: {
        browserName: config.browser
    }})





describe(config.project, function(done) {
    this.timeout(config.timeout)
    before(function() {
        $.init();
        start()
    })

    it(config.title, function(done) {
        $.url(config.url, function() {
            $.done = done;
            define($)
            test.start()
        })
    })

    after(function(done) {
        $.end(done)
    })
})
