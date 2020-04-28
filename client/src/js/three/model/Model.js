class Model {
    name;
    path;
    type;

    /**
     * Model
     * @param {String} name
     * @param {String} path
     * @param {'gtlf', 'fbx'} type
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
