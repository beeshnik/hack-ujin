document.addEventListener('DOMContentLoaded', function () {
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
});

document.addEventListener('DOMContentLoaded', function () {
    const buildingItems = document.querySelectorAll('.content__floor-item');

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
});

document.addEventListener("DOMContentLoaded", async () => {
    const buildings = await window.electronAPI.getBuildings()
    const buildingsDiv = document.getElementById("content__buildings-menu")
    const floorsDiv = document.getElementById('content__floor-bar')
    buildings.forEach(build => {
        let buildDiv = document.createElement("div")
        buildDiv.className = "content__buildings-item"
        buildDiv.innerText = build.name

        buildDiv.addEventListener("click", async () => {
            const floors = await window.electronAPI.getFloors(build.id)
            floorsDiv.innerHTML = ''

            floors.forEach(floor => {
                let floorDiv = document.createElement("div")
                floorDiv.className = "content__floor-item"
                console.log(floor)
                if (floor.number === 0){
                    floorDiv.innerText = floor.name
                }
                else{
                    floorDiv.innerText = floor.number
                }
                floorsDiv.appendChild(floorDiv)
            })
        })

        buildingsDiv.appendChild(buildDiv)
    })
})