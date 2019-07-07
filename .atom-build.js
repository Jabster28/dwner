module.exports = {
	cmd: "yarn release",
	name: "Release",
	sh: true,
	targets: {
		Start: {
			sh: true,
			cmd: "yarn start"
		},
		Package: {
			sh: true,
			cmd: "yarn package"
		},
		Windows: {
			sh: true,
			cmd: "yarn pwin"
		}
	}
}
