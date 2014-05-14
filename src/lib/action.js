/**
 * Wait
 * Waiting for ajax or some action need more time.
 * 
 * @example wait(0.5)
 */ 
wait = function(time) { 
    load(function() {
        setTimeout(function() {
            next()  
        }, time*1000)  
    })  
}   

/**
 * Done
 * Finish test and stop excute
 * 
 */
done = function() {
    load(function() {
        log('DONE', color.red)
        result(color.green)
    })
}

/**
 * Click
 * Multi-click is consecutive click sequence on multi-selector 
 * 
 * @example click(['selector1', 'selector2', 'selectorN']) or click('selector1')
 */   
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

/**
 * Wait
 * Waiting for ajax or some action need more time.
 * 
 */
// Submit a form
submit = function(a) {
    load(function() {
        if (show('submit'))
                action('SUBMIT', a, color.green)
        $.submitForm(a, function() {
            next()
        })
    })
}

/**
 * Wait
 * Multi-click is consecutive select sequence on multi-selector 
 * 
 */
select = function(a, o) {
    load(function() { 
        
        if (typeof a === 'string') {
            if (show('click'))
                action('CLICK', a, color.green)
            $.click(a, function() {
                next()
            })
            return
        }
        
        a = obj2arr(a)
        
        key = 0
        value = 0 
        
        loop = function() {
            if (a.length === 0)
            {
                return;
            } else {
                key = a[0].key
                value = a[0].value
                if (show('select'))
                    action('SELECT', key + ' = ' + value, color.green)
                
                $.click(a[0], function() {
                    a.remove(0)
                    a.length === 0 ? next() : loop()
                })
                
                // Do some things and callback
                /*
                    a.remove(0)
                    a.length === 0 ? next() : loop()
                */
            }
        } 
        loop()
    })
}

/**
 * Press
 * Press a key 
 *  
 * @example press(key.Enter)
 */
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
        $.requestHandler.create("/session/:sessionId/keys", data, function() {
            next();
        });
    })
    
} 

/**
 * Set
 * Multi-set is consecutive set sequence on multi-selector 
 * 
 * @example set({key1:value1, key2:value2}) or set(key1,value)
 */ 
set = function(a) {
    load(function() {
        a = obj2arr(a)

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
