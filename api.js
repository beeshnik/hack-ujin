module.exports = class API{
    constructor() {
        this.link = "http://192.168.228.77:8080/"
    }

    async getBuilds(){
        const result =  (await fetch(`${this.link}building`, {
            method: 'GET'
        })).json()
        return result
    }

    async getFloors(id){
        return (await fetch(`${this.link}building/${id}/floors`, {
            method: 'GET'
        })).json()
    }

    async getCameras(id){
        return (await fetch(`${this.link}floor/${id}`, {
            method: 'GET'
        })).json()
    }

    async getCamerasOnFloor(){
        return (await fetch(`${this.link}camera/available`, {
            method: 'GET'
        })).json()
    }

    async postCamera(data){
        let jsn = {
            "floorId": data.floorId,
            "externalId": data.externalId,
            "x": data.x,
            "y": data.y
        }
        return (await (fetch(`${this.link}camera`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsn)
        }))).json()
    }

    async getEvent(id){
        return (await fetch(`${this.link}event?floorId=${id}`, {
            method: 'GET'
        })).json()
    }

}
