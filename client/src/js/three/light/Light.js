/**
 * @example
 * new Light({
 *     name: 'spotlights',
 *     light: new THREE.DirectionalLight(0xff4444, 1),
 *     initialPosition: {x: 0, y: 200, z: -700},
 *     properties: {
 *         castShadow: true,
 *         // ...
 *     }
 * })
 */
class Light {
    name;
    type;
    light;
    initialPosition = {x: 0, y: 0, z: 0};
    helper;

    /**
     * @param {string} name - Name of the light
     * @param {lightTypes} type - Type of the light
     * @param {*} light - The Three.js light
     * @param {boolean} castShadow - Set to true if you want your light to castShadow
     * @param {Object} [initialPosition] - Initial position of the light
     * @param {Object} [properties] - Light properties (you can set all the properties of the Three.js light)
     *
     * @see https://threejs.org/docs/#api/en/lights/Light
     */
    constructor({
        name = 'undefined',
        type,
        light,
        castShadow,
        initialPosition = {x: 0, y: 0, z: 0},
        properties = {}
    }) {
        this.name = name;
        this.type = type;
        this.light = light;
        this.light.castShadow = castShadow;

        if (initialPosition) {
            this.initialPosition = initialPosition;
            this.setLightPosition(initialPosition);
        }
        if (properties) {
            this.setLightProperties(properties);
        }
    }

    // --- METHODS

    /**
     * Set light position
     * @param {number} x - Position X
     * @param {number} y - Position Y
     * @param {number} z - Position Z
     */
    setLightPosition({x, y, z}) {
        if(x) this.light.position.x = x;
        if(y) this.light.position.y = y;
        if(z) this.light.position.z = z;
    }

    /**
     * Set light properties
     * @param {Object} properties
     */
    setLightProperties(properties) {
        for (let [key, value] of Object.entries(properties)) {
            if (this.light[key] !== null && this.light[key] !== undefined) {
                this.light[key] = value;
            }
        }
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default Light;
