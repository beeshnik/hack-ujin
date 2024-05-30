const btn = document.getElementsByClassName("btn")
const p = document.getElementById("1")

// window.electronAPI.

// window.addEventListener("DOMContentLoaded", async () => {
//     const buildings = await window.electronAPI.getBuildings()
// })

window.addEventListener("DOMContentLoaded", async () => {
    const buildings = await window.electronAPI.getBuildings()
    console.log(buildings)
})
