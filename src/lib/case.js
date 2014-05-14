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

// Check the title match your expect
title = function(a) {
    load(function() {
        $.getTitle(function(err, title) {
            ok(title, a)
            next()
        })
    });
}




