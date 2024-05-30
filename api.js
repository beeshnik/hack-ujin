module.exports = class API{
    constructor() {
        this.link = "http://192.168.1.78:8080/"
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
}