const Application = require("spectron").Application;
const electron = require("electron");
function init() {
  let electronPath = electron;
  const appPath = ".";
  return new Application({
    path: electronPath,
    args: [appPath],
    env: {
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      NODE_ENV: "development"
    },
    startTimeout: 50000,
    chromeDriverLogPath: "../chromelog.txt"
  });
}
module.exports = {init};
