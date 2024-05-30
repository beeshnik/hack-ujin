module.exports = class API{
    constructor() {
        this.link = ""
    }

    async getBuilds(){
        return (await fetch(`${this.link}building`, {
            method: 'GET'
        })).json()
    }

    async getFloors(id){
        return (await fetch(`${this.link}building/${id}/floors`, {
            method: 'GET'
        })).json()
    }
}