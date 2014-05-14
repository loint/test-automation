// Remove first element of an array
Array.prototype.remove = function(index) {
    this.splice(index, 1)
}

// Convert object to array
obj2arr = function(a) {
    if (!(a instanceof Array)) {
        b = []
        Pair = function(key, value) {
            this.key = key
            this.value = value
        }
        for (item in a) {
            b.push(new Pair(item, a[item]))
        }
        return b
    } else
        return a
}
