const {ipcRenderer, contextBridge} = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  getBuildings: () => ipcRenderer.invoke("api:get-buildings"),
  getFloors: (e, id) => ipcRenderer.invoke("api:get-floors", e, id),
  getCameras: (e, id) => ipcRenderer.invoke("api:get-cameras", e, id),
  getCameraInfo: (e, id) => ipcRenderer.invoke("api:get-camera-info", e, id),
  getAllCameras: () => ipcRenderer.invoke("api:get-all-cameras"),
  postCamera: (e, data) => ipcRenderer.invoke("api:post-camera", e, data),
  checkEvent: (e, id) => ipcRenderer.invoke("api:check-events", e, id),
})


