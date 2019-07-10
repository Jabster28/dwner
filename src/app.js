import "./stylesheets/main.css";
// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------
import { remote, ipcRenderer } from "electron";
import jetpack from "fs-jetpack";
import env from "env";
const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
ipcRenderer.on("download complete", () => {});
var aj = (u, s) => {
  window.$.ajax({
    url: u,
    success: e => {
      if (s) s(e);
    }
  });
};
var download = a => {
  var xxx = r => {
    aj(`https://dwner.glitch.me/f?m=${a}`, e => {
      if (e == "wait") {
        setTimeout(1000, xxx(r));
        return 5;
      }
      r();
    });
  };
  xxx(() => {
    ipcRenderer.send("download", {
      url: "https://dwner.glitch.me/x?m=" + a,
      properties: {
        filename: "download.mp3",
        onStart: () => {}
      }
    });
  });
};
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
  window.$("#text").val("https://www.youtube.com/watch?v=kKdVeWeYDT8");
  document.querySelector("#greet").innerHTML = "Hii!!!";
  document.querySelector("#os").innerHTML = osMap[process.platform];
  document.querySelector("#author").innerHTML = manifest.author;
  document.querySelector("#env").innerHTML = env.name;
  document.querySelector("#electron-version").innerHTML =
    process.versions.electron;
  document.querySelector("#version").innerHTML = manifest.version;
  document.querySelector("#app").style.display = "block";
  window.$("#submit").click(() => {
    window.$("#submit").prop("disabled", true);
    var q =
      "https://dwner.glitch.me/m?url=" +
      encodeURIComponent(window.$("#text").val());
    window.$.ajax({
      url: q,
      success: a => {
        download(a);
      }
    });
  });
});
/*
https://www.youtube.com/watch?v=kKdVeWeYDT8

*/
