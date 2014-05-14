// Show the results of test
result = function(c) {
    real_task = task - 1;
    real_register = register -1;
    
    log('PASS ' + real_task + ' / ' + real_register, c); 
    
    process.exit();
}

// Debug variable
debug = function(v) {
    console.log(v)
}

log = function(text, c) {
    console.log(c, "\n --> " + text + "\n")
}

show = function(a) {
    return config.step.indexOf(a) != -1 ? true : false;
}

// You can write an action to console with many color
action = function(name, action, color) {
    log(name + ' - ' + action, color)
}

start = function() {
    console.log("\n" + '------------------- ' + config.project.toUpperCase() + ' TEST -------------------' + "\n")
    log('START', color.red)
}