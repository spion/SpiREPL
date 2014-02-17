#!/usr/bin/env node
var g = global;
var repl = require('repl');
var fs = require('fs');
var vm = require('vm');
var context = {};
var file = process.argv[2];
console.log('Welcome to SpiREPL!');
console.log('This REPL will automatically reload whenever you save ' + file + '.');
console.log('Have fun! (please note, no message is given out when the REPL reloads)')
var r = repl.start({});
var loads = 0;
function reload() {
    loads++;
    g.loads = loads;
    r.context = vm.createContext(g);
    fs.readFile(file, function(err, res) {
        if (err) {
            throw err;
        }
        try {
        vm.runInContext(res, r.context);
        }
        catch (error) {
            console.log('\n\n\nError reloading file.\n' + error + '\nFix it! :P')
        }   
    });
}

fs.watch(file, function(event, filename) {
    if (event == 'change') {
        reload();
    }
});
reload();