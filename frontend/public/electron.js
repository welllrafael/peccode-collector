const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWin;
function createWindow() {
mainWin = new BrowserWindow({
   width: 800,
   height: 600,
   show: false,
   webPreferences: {
    nodeIntegration: true,
    contextIsolation: false    
   },
  });
const startURL = isDev 
   ? process.env.START_URL
   :`file://${path.join(__dirname, "../build/index.html")}`;
 
  mainWin.loadURL(startURL);
mainWin.webContents.on("did-finish-load", () => {
   const { title, version } = require("../package.json");
   mainWin.setTitle(`${title} : ${version}`);
  });
mainWin.once("ready-to-show", () => mainWin.show());
   mainWin.on("closed", () => {
   mainWin = null;
  });

if(isDev){
  mainWin.webContents.openDevTools();
}
}
app.on("ready", createWindow);