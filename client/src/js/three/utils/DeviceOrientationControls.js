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

var DeviceOrientationControls = function (object) {

    var scope = this;

    this.object = object;
    this.object.rotation.reorder('YXZ');

    this.enabled = true;

    this.deviceOrientation = {};
    this.screenOrientation = 0;

    this.alphaOffset = 0; // radians


    this.setScreenOrientation = function (screenOrientation) {
        scope.screenOrientation = screenOrientation || 0;
    }

    // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

    var setObjectQuaternion = function () {

        var zee = new Vector3(0, 0, 1);

        var euler = new Euler();

        var q0 = new Quaternion();

        var q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

        return function (quaternion, alpha, beta, gamma, orient) {

            euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us

            quaternion.setFromEuler(euler); // orient the device

            quaternion.multiply(q1); // camera looks out the back of the device, not the top

            quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation

        };

    }();

    this.connect = function () {

        scope.enabled = true;

    };

    this.update = function (orientation) {

        if (orientation) {

            var alpha = orientation.alpha ? MathUtils.degToRad(orientation.alpha) + scope.alphaOffset : 0; // Z

            var beta = orientation.beta ? MathUtils.degToRad(orientation.beta) : 0; // X'

            var gamma = orientation.gamma ? MathUtils.degToRad(orientation.gamma) : 0; // Y''

            var orient = scope.screenOrientation ? MathUtils.degToRad(scope.screenOrientation) : 0; // O

            setObjectQuaternion(scope.object.quaternion, alpha, beta, gamma, orient);

        }

    };

    this.connect();

};

export {DeviceOrientationControls};
