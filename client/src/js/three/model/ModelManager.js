import Model from "./Model";

class ModelManager {

    models = [];

    constructor() {

    }


    addModel(model) {
        this.models.push(model)
        // console.log('create model', model)
    }

    loadModels() {
        return new Promise((resolve, reject) => {
            this.models.forEach((model) => {
                console.log('loading model : ', model.name)
                resolve();
            })
        })

    }
}

export default ModelManager
