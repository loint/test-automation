// Copyright © 2014 Swiss IT Bridge
// Author: Nguyen Trung Loi (loi.nguyen)
// Maintain by loi.nguyen and ha.tran

driver = require('webdriverjs')
events = require('events')
equal = require('assert').equal
key = require('webdriverjs/lib/utils/unicodeChars');

color = {
    white: '\x1b[37m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    black: '\x1b[30m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
}

task = 1
register = 0
event = new events.EventEmitter()
test = {}
config = {}

// Remove first element of an array
Array.prototype.remove = function(index) {
    this.splice(index, 1)
}

// Show the results of test
result = function(c) {
    log('PASS ' + task + ' / ' + register, c);
    process.exit();
}

// Debug variable
debug = function(v) {
    console.log(v)
}

// Make a test for your expert 
ok = function(key, value) {
    
    if (show('expect')) {
        log('TEST ' + key + ' = ' + value, color.white)
    }
    
    try 
    {
        equal(key, value)
    } catch (err) {
        if (show('expect'))
            log('ERROR! NOT EQUAL ', color.red)
        result(color.yellow);
    } finally {
        if (show('expect'))
            log('OK', color.green)
    }
}

// You can redefine or add your function to WebDriverJS library
define = function(client) {
    // Define client again in here
}

log = function(text, c) {
    console.log(c, "\n --> " + text + "\n")
}

show = function(a) {
    return config.step.indexOf(a) != -1 ? true : false;
}

// Go to next task
next = function() {
    if (show('remove')) {
        action('REMOVE', 'Task ' + task, color.yellow)
    }
    event.removeAllListeners('task_' + task)
    task++
    if (show('goto')) {
        action('GO TO', 'Task ' + task, color.cyan)
    }
    event.emit('task_' + task, {})
}

// Execute function
exec = function(func) {
    if (typeof func !== 'undefined') {
        func(); 
        return true; 
    } else return false;
}

// You can write an action to console with many color
action = function(name, action, color) {
    log(name + ' - ' + action, color)
}

start = function() {
    console.log("\n" + '------------------- ' + config.project.toUpperCase() + ' TEST -------------------' + "\n")
    log('START', color.red)
}

// Reuse WebdriverJS library or you want to define an asynchronous function 
load = function(a) {
    func = function(a) {
        a()
    }
    // Register event to waiting ...  
    if (register > 0) {
        register++;
        if (show('register'))
            action('REGISTER', 'Task ' + register, color.yellow)
        event.on('task_' + register, function() {
            func(a)
        })
    } else {
        register = 1
        if (show('goto'))
            action('GO TO', 'Task 1', color.cyan)
        func(a)
    }
}

// Waiting for ajax or some action need more time.
wait = function(time) {
    load(function() {
        setTimeout(function() {
            next()
        }, time)
    })
}

// Finish test and stop excute
done = function() {
    load(function() {
        log('DONE', color.red)
        result(color.green)
    })
}

// Multi-click is consecutive click sequence on multi-selector 
// click(['selector1', 'selector2', 'selectorN'])
click = function(a) {
    load(function() {

        if (typeof a === 'string') {
            if (show('click'))
                action('CLICK', a, color.green)
            $.click(a, function() {
                next()
            })
            return
        }

        loop = function() {
            if (a.length === 0) {
                return;
            } else {
                if (show('click')) {
                    action('CLICK', a[0], color.green)
                }
                $.click(a[0], function() {
                    a.remove(0)
                    a.length === 0 ? next() : loop()
                })
            }
        }

        loop()
    })
}

// Submit a form
submit = function(a) {
    load(function() {
        $.submitForm(a, function() {
            next()
        })
    })
}

press = function(value) { 
    
    function checkUnicode(value) {
        return key.hasOwnProperty(value) ? [unicodeChars[value]] : value.split('');
    }
     
    load(function() {  
        if (show('key')) {
            action('PRESS KEY', value, color.green)
        }
        keys = []
        data = {}
        if (typeof value === 'string') { 
            keys = checkUnicode(value);
        } else if (value instanceof Array) { 
            value.forEach(function(charSet, i) {
                keys = key.concat(checkUnicode(charSet));
            });
        } else {
            keys = [];
        }
        data = {'value': keys}; 
        $.requestHandler.create("/session/:sessionId/keys",data, function() {
            next(); 
        });
    })
    
}

cookie = function(a) {

}

// Check the title match your expect
title = function(a) {
    load(function() {
        $.getTitle(function(err, title) {
            ok(title, a)
            next()
        })
    });
}

cmp = function(a, value) {

}

// Multi-set is consecutive set sequence on multi-selector 
// set {key1:value1, key2:value2} 
set = function(a) {
    load(function() {

        if (!(a instanceof Array)) {
            b = []
            Pair = function(key, value) {
                this.key = key
                this.value = value
            }
            for (item in a) {
                b.push(new Pair(item, a[item]))
            }
            a = b
        }

        key = 0
        value = 0

        loop = function() {
            if (a.length === 0)
            {
                return;
            } else {
                key = a[0].key
                value = a[0].value
                if (show('set'))
                    action('SET', key + ' = ' + value, color.green)
                $.setValue(key, value, function() {
                    a.remove(0)
                    a.length === 0 ? next() : loop()
                })
            }
        }

        loop()
    })
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

test.start = function() {
    num = 0; 
    while (true) {  
        num++;   
        func = eval('test.$'+num);  
        if (!exec(func)) {
            done();
            break;
        }  
    }
}

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