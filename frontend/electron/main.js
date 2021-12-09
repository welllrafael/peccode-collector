const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const server = 'https://your-deployment-url.com' 
const url = `${server}/update/${process.platform}/${app.getVersion()}`  

const UPDATE_CHECK_INTERVAL = 10000
setInterval(() => {
  autoUpdater.checkForUpdates()
}, UPDATE_CHECK_INTERVAL)

autoUpdater.setFeedURL({ url })
require("../backend/index");

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }
dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

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