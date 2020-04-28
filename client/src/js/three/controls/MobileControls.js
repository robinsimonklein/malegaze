import store from './../../../store/index'

class MobileControls {

    object;

    controls = {};

    /**
     * MobileControls
     * @param object The object to control
     */
    constructor(object) {
        this.object = object
    }

    /**
     * Get updated mobile controls from store
     * @returns {any}
     */
    getMobileControls() {
        return JSON.parse(JSON.stringify(store.state.mobile.controls))
    }

    /**
     * Update loop
     * @param {[String]} controlsToUpdate
     */
    update(controlsToUpdate) { // Pass an array of the controls keys you want to update
        this.controls = this.getMobileControls()

        for(let i = 0; i < controlsToUpdate.length ; i++) {
            this.object.settings[controlsToUpdate[i]] = this.controls[controlsToUpdate[i]]
        }

    }
}

export default MobileControls;
