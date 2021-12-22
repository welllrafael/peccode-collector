
// Main Process
const { app, BrowserWindow, ipcMain, Notification, autoUpdater, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  // Browser Window <- Renderer Process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')    }
  })

  win.loadFile('index.html')
  isDev && win.webContents.openDevTools();

  if (isDev) {
    // const server = 'https://your-deployment-url.com'
    // const url = `${server}/update/${process.platform}/${app.getVersion()}`
    const url = 'https://github.com/welllrafael/peccode-collector/releases/tag/update'

    autoUpdater.setFeedURL({ url })
    console.log(url);
  }
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })

}

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 15000);

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
});

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
});

app.whenReady().then(createWindow);

ipcMain.on('notify', (_,message) => {
  new Notification({title: 'Notification', body: message}).show();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})


// Chromium -> web eingine for rendering the UI, full Chrome-like web browser
// V8 -> engine that provides capabilities to execute, run, JS code in the browser
// Node JS(V8) -> we are able to run JS code + provides more features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in the browsert
// Babel -> js a JS compiler

// const { app, BrowserWindow } = require('electron');
