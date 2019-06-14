// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, Menu } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import createWindow from "./helpers/window";
import { autoUpdater } from "electron-updater";
import env from "env";
// Special module holding environment variables which you declared
// in config/env_xxx.json file.

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};
autoUpdater.checkForUpdatesAndNotify();

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}
// Make the window
app.on("ready", () => {
	setApplicationMenu();
	const mainWindow = createWindow("main", {
		width: 1000,
		height: 600
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "app.html"),
		protocol: "file:",
		slashes: true
	}));
  // Open devtools if in dev stage
	if (env.name === "development") {
		mainWindow.openDevTools();
	}
});
// Quit on close
app.on("window-all-closed", () => {
  app.quit();
});
