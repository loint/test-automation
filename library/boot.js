/**
 * Start
 * Automation run the test case
 * 
 */
test.start = function() {
    num = 0;
    while (true) { 
        num++;
        
        func = eval('test.$' + num);
        if (!exec(func)) {
            done();
            break;
        }
    }
}

/**
 * Restart browser
 * 
 */
test.restart = function() {  
    load(function() {
        $.url(config.url, function() {
             
        })    
    });
}