class Model {
    name;
    path;
    type;
    castShadow;
    receiveShadow;

    /**
     * Model
     * @param {string} name - Name of the model
     * @param {string} path - Path of the model (from /pubilc)
     * @param {modelTypes} type - Type of the model
     * @param {boolean} castShadow - Set to true if you want your model to cast shadow
     * @param {boolean} receiveShadow - Set to true if you want your model to receive shadow
     */
    constructor({name, path, type, castShadow, receiveShadow}) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.castShadow = castShadow;
        this.receiveShadow = receiveShadow;
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default Model
