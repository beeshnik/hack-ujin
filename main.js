// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, MouseInputEvent} = require('electron')
const path = require('node:path')
const API = require(__dirname + "/api.js")
const electron = require("electron");
const events = require("events");

const api = new API()

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/html/zone_choice.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

async function sendBuilds(){
  const result = await api.getBuilds()
  return result
}

async function sendFloors(e, id){
  const result = await api.getFloors(id)
  return result
}

async function sendCameras(e, id){
  const result = await api.getCameras(id)
  return result
}

async function sendCameraInfo(e, id){
  const result = await api.getCameraInfo(id)
  return result
}

function sendCoords(){
  mainWindow.webContents.send("window:get-coords", "wdsaw")
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.handle("api:get-buildings", sendBuilds)
  ipcMain.handle("api:get-floors", sendFloors)
  ipcMain.handle("api:get-cameras", sendCameras)
  ipcMain.handle("api:get-camera-info", sendCameraInfo)
  ipcMain.on("window:send-coords", sendCoords)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
