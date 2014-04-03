var webdriverjs = require('webdriverjs');
var events = require('events');
  
var color = {
    white: '\x1b[37m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    black: '\x1b[30m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
};

equal = require('assert').equal;
var task = 1;
var register = 0;
var event = new events.EventEmitter();
test = {};

$ = webdriverjs.remote({desiredCapabilities: {browserName: 'chrome'}});

Array.prototype.remove = function(index) {
    this.splice(index, 1);
};

ok = function(key, value) {
    log('TEST ' + key + ' = ' + value, color.white);
    try
    {
        equal(key, value);
    } catch (err) {
        log('ERROR ! NOT EQUAL ', color.red);
        process.exit();
    } finally { 
        log('OK', color.green);
    }
};

next = function() {
    action('REMOVE', 'Task ' + task, color.yellow);
    event.removeAllListeners('task_' + task);
    task++;
    action('GO TO', 'Task ' + task, color.cyan);
    event.emit('task_' + task, {});
};

exec = function(func) {
    if (typeof func !== 'undefined')
        func();
};

action = function(name, action, color) {
    log(name + ' : ' + action, color);
};

isEmpty = function(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true; 
};

// Multi click on ['selector1', 'selector2']
click = function(a) {
    
    var func = function(a, func) {
        if (typeof a === 'string') {
            action('CLICK', a, color.green);
            $.click(a, function() {
                next(); 
            });
            return; 
        }

        var loop = function() {
            if (a.length === 0)
                return;
            else {
                action('CLICK', a[0], color.green);
                $.click(a[0], function() {
                    a.remove(0);
                    a.length === 0 ? next() : loop();
                });
            } 
        };

        loop();
    };

    // Register event to waiting ...  
    if (register > 0) {
        register++;  
        action('REGISTER', 'Task ' + register, color.yellow);
        event.on('task_' + register, function() {
            func(a); 
        });
    } else {
        register=1;
        action('GO TO', 'Task 1', color.red); 
        func(a);
    }
};

Pair = function(key, value) {
    this.key = key;
    this.value = value;
};

load = function(a) {
    var func = function(a) {
        a();
    };

    // Register event to waiting ...  
    if (register > 0) { 
        register++;
        action('REGISTER', 'Task ' + register, color.yellow);
        event.on('task_' + register, function() {
            func(a);
        });
    } else {
        register=1; 
        action('GO TO', 'Task 1', color.red); 
        func(a); 
    }
};

submit = function(a) {
    load(function() {
        $.submitForm(a, function() {
            next();
        });
    });
};

title = function(a) {
    var func = function(a) {
        $.getTitle(function(err, title) {
            ok(title, a);
            next();  
        });
    };
    
    // Register event to waiting ...
    if (register > 0) { 
        register++;   
        action('REGISTER', 'Task ' + register, color.yellow); 
        event.on('task_' + register, function() {
            func(a);
        });  
    } else { 
        register=1;
        action('GO TO', 'Task 1', color.red); 
        func(a);
    }
};

// Multi set {key1:value1, key2:value2} 
set = function(a) {
    var func = function(a) {
        if (!(a instanceof Array)) {
            var b = [];
            for (item in a) {
                b.push(new Pair(item, a[item]));
            }
            a = b;
        }

        var key = 0, value = 0;

        var loop = function() {
            if (a.length === 0)
                return;
            else {
                key = a[0].key;
                value = a[0].value;
                action('SET', key + ' = ' + value, color.green);
                $.setValue(key, value, function() {
                    a.remove(0);
                    a.length === 0 ? next() : loop();
                });
            }
        };
        loop();
    };

    // Register event to waiting ...  
    if (register > 0) {
        register++;
        action('REGISTER', 'Task ' + register, color.yellow); 
        event.on('task_' + register, function() {
            func(a);
        }); 
    } else {
        register=1;
        action('GO TO', 'Task 1', color.red); 
        func(a);
    }

};


define = function(client) {
};

log = function(text, c) {
    console.log(c, "\n --> " + text + "\n");
};

pass = function() {
    console.log("\n -------------------\n");
};

done = function() {
    load(function() { 
        process.exit();
    });   
};
 
// Test case
require('./task.js');

describe('ORCA TEST', function(done) {
    this.timeout(999999999);

    before(function() {
        $.init();
        console.log("\n" + '--------------- START TEST -----------------' + "\n");
    });

    it('LOGIN', function(done) {
        $.url("http://localhost/login", function() {
            $.done = done;
            define($);
            test.start(); 
        });
    }); 

    after(function(done) {
        $.end(done);
    });
});