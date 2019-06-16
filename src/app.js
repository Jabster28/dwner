import "./stylesheets/main.css";
// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------
import {
	remote, ipcRenderer
} from "electron";
import jetpack from "fs-jetpack";
import {
	greet
} from "./hello_world/hello_world";
import env from "env";
const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
ipcRenderer.on("download complete", (event, file) => {
    console.log(file); // Full file path
});
var aj = (u, s) => {
  window.$.ajax({
    url: u,
    success: (e) => {
      if (s) s()
      return e
    }
  })
}
var download = (a) => {
  var w = aj(`https://dwner.glitch.me/f?m=${a}`)
  while (w == "wait") w = aj(u)
  ipcRenderer.send("download", {
      url: "https://dwner.glitch.me/f?m=" + a,
      filename: "download.mp3"
  });
}
window.$ = window.jQuery = require("jquery");
// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");
const osMap = {
	win32: "Windows",
	darwin: "macOS",
	linux: "Linux"
};
window.$(() => {
	document.querySelector("#greet").innerHTML = greet();
	document.querySelector("#os").innerHTML = osMap[process.platform];
	document.querySelector("#author").innerHTML = manifest.author;
	document.querySelector("#env").innerHTML = env.name;
	document.querySelector("#electron-version").innerHTML = process.versions.electron;
	document.querySelector("#app").style.display = "block";
	window.$("#submit").click(() => {
    window.$("#submit").prop("disabled", true)
		var q = "https://dwner.glitch.me/m?url=" + encodeURIComponent(window.$("#text").val());
		window.$.ajax({
      url: q,
      success: (a) => {
        console.log(a)
        download(a)
      }
    })
	});
});
/*
https://www.youtube.com/watch?v=kKdVeWeYDT8

*/
