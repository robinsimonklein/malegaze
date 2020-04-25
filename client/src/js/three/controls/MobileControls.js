import store from './../../../store/index'

class MobileControls {

    object;

    controls = {};

    constructor(object) {
        this.object = object
    }

    getMobileControls() {
        return JSON.parse(JSON.stringify(store.state.mobile.controls))
    }

    update(controlsToUpdate) { // Pass an array of the controls object keys you want to update
        this.controls = this.getMobileControls()

        for(let i = 0; i < controlsToUpdate.length ; i++) {
            this.object.settings[controlsToUpdate[i]] = this.controls[controlsToUpdate[i]]
        }

    }
}

export default MobileControls;
