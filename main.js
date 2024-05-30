// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const apiModule = require("./api.js")

const API = new apiModule()
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(path.join(__dirname, '/html/index.html'))

  mainWindow.webContents.openDevTools()
}

async function getBuildings(){
  const resp = await API.getBuilding()
  return resp
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.handle('api:getBuildings', getBuildings)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
