class Model {
    name;
    path;
    type;

    /**
     * Model
     * @param {string} name - Name of the model
     * @param {string} path - Path of the model (from /pubilc)
     * @param {modelTypes} type - Type of the model
     */
    constructor({name, path, type}) {
        this.name = name;
        this.path = path;
        this.type = type;
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default Model
