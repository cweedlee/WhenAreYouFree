var fs = require('fs');

fs.readFile('home.js', 'utf-8', function (error, data) {
	console.log('01 readsync : %s', data);

});

var data = fs.readFileSync('home.js', 'utf-8');
console.log('02 readsync : %s', data);

var data2 = fs.readFile('home.js','utf-8', (error, data2) => {
console.log('03 readSync : %s', data2);
})
