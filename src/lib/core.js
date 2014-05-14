// System global variables 

task = 1
register = 0
event = new events.EventEmitter()
test = {}
config = {}

/**
 * Next
 * Go to the next task in queue
 * 
 */
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
    
/**
 * Execute
 * Execute a function 
 * 
 */
exec = function(func) {
    if (typeof func !== 'undefined') {
        func(); 
        return true; 
    } else {
        return false;
    }
} 

/**
 * Load 
 * Load an asynchronous function as synchronous function
 *  
 * @param function a 
 */
load = function(a) {
    
    func = function(a) {
        a()
    }
    
    // Register event to waiting ...    
    if (register > 0) {
        
        register++;
        
        if (show('register')) {
            action('REGISTER', 'Task ' + register, color.yellow)
        }
        
        event.on('task_' + register, function() {
            func(a)
        })
        
    } else {
        register = 1
        if (show('goto')) {
            action('GO TO', 'Task 1', color.cyan)
        }
        func(a)
    }
}


