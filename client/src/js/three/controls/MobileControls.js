import store from './../../../store/index'

/**
 * MobileControls receive a stream of mobile controls (like zoom). It can be used in a {@link Scenery} to update some objects settings in real time (i.e. the zoom of the camera).
 */
class MobileControls {

    object;
    controls = {};

    /**
     * @param {*} object - The object to control
     */
    constructor(object) {
        this.object = object
    }

    /**
     * Get updated mobile controls from store
     * @return {any}
     * @private
     */
    getMobileControls() {
        return JSON.parse(JSON.stringify(store.state.mobile.controls))
    }

    /**
     * Update loop
     * @param {string[]} controlsToUpdate - The controls to update
     * @example
     * let mobileControls = new MobileControls(myCamera)
     * mobileControls.update(['focalLength'])
     */
    update(controlsToUpdate) { // Pass an array of the controls keys you want to update
        this.controls = this.getMobileControls()

        for(let i = 0; i < controlsToUpdate.length ; i++) {
            this.object.settings[controlsToUpdate[i]] = this.controls[controlsToUpdate[i]]
        }

    }
}

export default MobileControls;
