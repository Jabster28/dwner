const fs = require('fs');
var x = JSON.parse(fs.readFileSync("./temp/stuff.json"));
for (var i = 0; i < Object.values(x).length; i++) {
	var y = Object.values(x)[i];
	if (y.finished == 0) {
		y.finished = 1;
		fs.writeFileSync("./temp/stuff.json", JSON.stringify(x));
	}
}
