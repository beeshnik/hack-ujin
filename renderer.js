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
    const container = document.querySelector('.main-block-container');

    buildingItems.forEach(item => {
        item.addEventListener('click', function () {
            // Удаляем id 'selected-building' у предыдущего элемента
            const previousSelected = document.getElementById('selected-floor');
            if (previousSelected) {
                previousSelected.removeAttribute('id');
            }

            // Добавляем id 'selected-building' к текущему элементу
            item.id = 'selected-floor';
            container.innerHTML = "<img class=\"content__planning\" src=\"../img/Planning%20no%20cameras.png\" alt=\"\"><div class=\"change-cameras\">\n" +
                "                <button class=\"delete-camera add-delete-camera\">-</button>\n" +
                "                <button class=\"add-camera add-delete-camera\">+</button>\n" +
                "            </div>"
        });
    });
}

async function subcribeFloor(build) {
    const floorsDiv = document.getElementById('content__floor-bar')
    const floors = await window.electronAPI.getFloors(build.id)
    floorsDiv.innerHTML = ''

    floors.forEach(floor => {
        let floorDiv = document.createElement("div")
        floorDiv.className = "content__floor-item"
        console.log(floor)
        if (floor.number === 0) {
            floorDiv.innerText = floor.name
        } else {
            floorDiv.innerText = floor.number
        }
        floorsDiv.appendChild(floorDiv)
        floorDiv.addEventListener("click", async () => {
            const cameras = await window.electronAPI.getCameras(floor.id)
            console.log(cameras)
            insertCameraImages(cameras)
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
    const src_icon = '../icons/camera-icon.svg';

    cameras.forEach(camera => {
        const newCamera = document.createElement('img');
        newCamera.src = src_icon;
        newCamera.alt = 'camera';
        newCamera.classList.add('content__camera'); // Добавляем класс, если нужно
        newCamera.style.position = 'absolute';
        newCamera.style.bottom = camera.y + 'vh';
        newCamera.style.left = camera.x + 'vh';
        container.appendChild(newCamera);
    });
}

