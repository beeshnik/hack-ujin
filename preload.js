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
  getFloors: (id) => ipcRenderer.invoke("api:get-floors", id),
})


