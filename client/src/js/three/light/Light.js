class Light {
    name;
    light;
    initialPosition = {x: 0, y: 0, z: 0};

    constructor({
        name = "undefined",
        light,
        initialPosition = {x: 0, y: 0, z: 0},
        properties = {}
    }) {
        this.name = name
        this.light = light

        if(initialPosition) {
            this.initialPosition = initialPosition
            this.setLightPosition(initialPosition)
        }
        if(properties) this.updateLightProperties(properties)
    }

    /**
     * Set light position
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    setLightPosition({x, y, z}){
        if(x) this.light.position.x = x
        if(y) this.light.position.y = y
        if(z) this.light.position.z = z
    }

    /**
     * Update light properties
     * @param {{}} properties
     */
    updateLightProperties(properties) {
        for(let [key, value] of Object.entries(properties)) {
            if(this.light[key] !== null && this.light[key] !== undefined){
                this.light[key] = value
            }
        }
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default Light
