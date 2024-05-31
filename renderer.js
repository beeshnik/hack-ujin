const addCam = document.getElementById("edit-cameras")
let image
let menu
let x;
let y;

const pngs = {
    "fire" : '../icons/fire.png',
    "lost_item" : '../icons/lost_item.png',
    "emergency_car" : '../icons/emergency_car.png'
}

function addAnimationsBuildings() {
    const buildingItems = document.querySelectorAll('.content__buildings-item');

    buildingItems.forEach(item => {
        item.addEventListener('click', function () {
            // Удаляем id 'selected-building' у предыдущего элемента
            const previousSelected = document.getElementById('selected-building');
            if (previousSelected) {
                previousSelected.removeAttribute('id');
            }

            // Добавляем id 'selected-building' к текущему элементу
            item.id = 'selected-building';
        });
    });
}

function addAnimationsFloors() {
    const buildingItems = document.querySelectorAll('.content__floor-item');
    const container = document.getElementById("main-block-container")

    buildingItems.forEach(item => {
        item.addEventListener('click', function () {
            // Удаляем id 'selected-building' у предыдущего элемента
            const previousSelected = document.getElementById('selected-floor');
            if (previousSelected) {
                previousSelected.removeAttribute('id');
            }

            // Добавляем id 'selected-building' к текущему элементу
            item.id = 'selected-floor';
        });
    });
}

function showMenu(e){
    const rect = image.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;
    menu.style.display = "block"
}

async function subcribeFloor(build) {
    const floorsDiv = document.getElementById('content__floor-bar')
    const floors = await window.electronAPI.getFloors(build.id)
    image = document.getElementById("floor-plan")
    floorsDiv.innerHTML = ''

    floors.forEach(floor => {
        let floorDiv = document.createElement("div")
        floorDiv.className = "content__floor-item"
        if (floor.number === 0) {
            floorDiv.innerText = floor.name
        } else {
            floorDiv.innerText = floor.number
        }
        floorsDiv.appendChild(floorDiv)
        floorDiv.addEventListener("click", async () => {
            const floorWithCamera = await window.electronAPI.getCameras(floor.id)
            image.src = floorWithCamera.planBase64
            insertCameraImages(floorWithCamera.cameras)

            const events = await window.electronAPI.checkEvent(floor.id)
            console.log(events)
            events.forEach(event => {
                const field = document.getElementById("main-block-container")
                const rect = image.getBoundingClientRect();
                const evElem = document.createElement("img")
                evElem.setAttribute("src", pngs.event)
                evElem.style.position = "absolute"
                evElem.style.top = `${y}px`;
                evElem.style.left = `${x}px`;
                evElem.style.zIndex = "20";
                field.appendChild(evElem)
            })


            addCam.addEventListener("click", async (e) => {
                menu = document.getElementById("add-camera-menu")

                image.addEventListener("click", showMenu)

                const closeWindow = document.getElementById("deny")
                const apply = document.getElementById("accept")

                closeWindow.addEventListener("click", ()=>{
                    menu.style.display = "none"

                    image.removeEventListener("click", showMenu)
                })

                const cameraList = document.getElementById("select-cameras")
                const cameras = await window.electronAPI.getAllCameras()
                console.log(cameras)
                cameraList.innerHTML = ""
                cameras.forEach(camera => {
                    let opt = document.createElement("option")
                    opt.value = camera.id
                    opt.textContent = camera.name
                    cameraList.appendChild(opt)
                })

                apply.addEventListener("click", async () => {
                    menu.style.display = "none"
                    image.removeEventListener("click", showMenu)

                    const field = document.getElementById("main-block-container")
                    const rect = image.getBoundingClientRect();
                    const cam = document.createElement("img")
                    cam.setAttribute("src",'../icons/camera.svg')
                    cam.style.position = "absolute"
                    cam.style.top = `${y}px`;
                    cam.style.left = `${x}px`;
                    cam.style.zIndex = "20";
                    field.appendChild(cam)

                    const data = {
                        "floorId": floor.id,
                        "externalId": cameraList.value,
                        "x": x,
                        "y": y
                    }

                    let response = await window.electronAPI.postCamera(data)


                })




            })

        })
    })
    addAnimationsFloors()
}

document.addEventListener("DOMContentLoaded", async () => {
    const buildings = await window.electronAPI.getBuildings()
    const buildingsDiv = document.getElementById("content__buildings-menu")

    buildings.forEach(build => {
        let buildDiv = document.createElement("div")
        buildDiv.className = "content__buildings-item"
        buildDiv.innerText = build.name

        buildDiv.addEventListener("click", async () => {
            await subcribeFloor(build)
        })

        buildingsDiv.appendChild(buildDiv)
    })
    addAnimationsBuildings()
});

function insertCameraImages(cameras) {
    const container = document.querySelector('.main-block-container');
    // container.innerHTML = "<img class=\"content__planning\" src=\"../img/Planning%20no%20cameras.png\" alt=\"\">";
    const src_icon = '../icons/camera-icon.svg';

    cameras.forEach(camera => {
        const newCamera = document.createElement('img');
        newCamera.src = src_icon;
        newCamera.alt = 'camera' ;
        newCamera.classList.add('content__camera'); // Добавляем класс, если нужно
        newCamera.style.position = 'absolute';
        newCamera.style.bottom = camera.y + 'px';
        newCamera.style.left = camera.x + 'px';
        container.appendChild(newCamera);


    });
}
