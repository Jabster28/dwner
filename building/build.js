const port = 2222;
var fs = require("fs");
var express = require("express");
var app = express();
var exec = require("child_process").exec;
var execute = (command) => {
	exec(command, (e, so, se) => {
		console.log("out:", so);
		console.log("err:", se);
		if (e) {
			console.log("exec error:", e);
		}
	});
};
var makeid = (length) => {
	var result = '';
	var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@£$%^&*_+-=|;/?.,~`;
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
var buildmaps = {};
fs.writeFileSync("./temp/stuff.json", JSON.stringify(buildmaps));
app.get("/build", (q, s) => {
	buildmaps = JSON.parse(fs.readFileSync("./temp/stuff.json"));
	if (q.query.p == "win") {
		var x = encodeURIComponent(makeid(5));
		while (Object.keys(buildmaps).includes(x)) x = encodeURIComponent(makeid(5));
		buildmaps[x] = {
			finished: 0,
			code: x
		};
		s.send(buildmaps[x]);
		fs.writeFileSync("./temp/stuff.json", JSON.stringify(buildmaps));
		execute("node building/make.js");
	} else if (Object.keys(buildmaps).includes(encodeURIComponent(q.query.k))) {
		s.send(buildmaps[encodeURIComponent(q.query.k)]);
	} else {
		s.sendStatus(404);
		console.log(encodeURIComponent(q.query.k));
		console.log(buildmaps);
	}
});
app.get("/", (q, s) => {
	s.sendStatus(404);
});
app.listen(port, () => {
	console.log(`Accepting build requests on ${port}.`);
});
