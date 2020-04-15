/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

import {
    Euler,
    MathUtils,
    Quaternion,
    Vector3
} from "three";

import store from './../../../store/index'

class MobileOrientationControls {

    scope = this;

    object;

    deviceOrientation = {};
    screenOrientation = 0;

    alphaOffset = 0; // radians

    constructor(object) {
        this.object = object
        this.object.rotation.reorder('YXZ');
    }

    setScreenOrientation(screenOrientation) {
        this.scope.screenOrientation = screenOrientation || 0;
    }

    getDeviceOrientation() {
        return JSON.parse(JSON.stringify(store.state.mobile.orientation))
    }
    getScreenOrientation() {
        return JSON.parse(JSON.stringify(store.state.mobile.screenOrientation))
    }

    // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''
    setObjectQuaternion(quaternion, alpha, beta, gamma, orient) {

        var zee = new Vector3(0, 0, 1);

        var euler = new Euler();

        var q0 = new Quaternion();

        var q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

        euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us

        quaternion.setFromEuler(euler); // orient the device

        quaternion.multiply(q1); // camera looks out the back of the device, not the top

        quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation

    }

    update() {
        this.deviceOrientation = this.getDeviceOrientation()
        this.screenOrientation = this.getScreenOrientation()

        var alpha = this.deviceOrientation.alpha ? MathUtils.degToRad(this.deviceOrientation.alpha) + this.scope.alphaOffset : 0; // Z

        var beta = this.deviceOrientation.beta ? MathUtils.degToRad(this.deviceOrientation.beta) : 0; // X'

        var gamma = this.deviceOrientation.gamma ? MathUtils.degToRad(this.deviceOrientation.gamma) : 0; // Y''

        var orient = this.screenOrientation ? MathUtils.degToRad(this.screenOrientation) : 0; // O

        this.setObjectQuaternion(this.scope.object.quaternion, alpha, beta, gamma, orient);
    }
}

export default MobileOrientationControls;
