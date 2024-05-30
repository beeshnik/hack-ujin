module.exports = class API{
    constructor() {
        this.link = "http://192.168.1.78:8080/"
    }

    async getBuilding(){
        return (await fetch(`${this.link}building`, {
            method: "GET"
        })).json()
    }

    async getFloors(id){
        return (await fetch(`${this.link}building/${id}/floors`, {
            method: "GET"
        })).json()
    }

}