const {ipcRenderer, contextBridge} = require("electron")

// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }
//
//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

contextBridge.exposeInMainWorld("electronAPI", {
  getBuildings: () => ipcRenderer.invoke("api:get-buildings"),
  getFloors: (e, id) => ipcRenderer.invoke("api:get-floors", e, id),
  getCameras: (e, id) => ipcRenderer.invoke("api:get-cameras", e, id),
  getCameraInfo: (e, id) => ipcRenderer.invoke("api:get-camera-info", e, id),
  sendMouseCoords:() => ipcRenderer.send("window:send-coords"),
  onGetMouseCoords:(callback) => ipcRenderer.on("window:get-coords", (_event, value) => callback(value)),
})


