class Model {
    name;
    path;
    type;

    types = {
        GLTF: 'gltf',
        FBX: 'fbx'
    }

    constructor(name, path, type) {
        this.name = name;
        this.path = path;
        this.type = type;
    }
}

class ModelManager {

    models = [];

    constructor() {

    }


    addModel(model) {
        this.models.push(model)
        // console.log('create model', model)
    }

    loadModels() {

    }
}

export default ModelManager
