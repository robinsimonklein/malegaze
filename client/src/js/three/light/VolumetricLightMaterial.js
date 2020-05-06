import * as THREE from 'three';

const THREEx = THREEx || {}

/**
 *
 * @param {number} attenuation
 * @param {number} anglePower
 * @param {Vector3} spotPosition
 * @param {Color} lightColor
 * @param {number} alpha
 * @return {ShaderMaterial}
 * @constructor
 *
 * @see https://threejs.org/docs/#api/en/lights/VolumetricLightMaterial
 */
THREEx.VolumetricSpotLightMaterial = function (attenuation, anglePower, spotPosition, lightColor, alpha) {
    const vertexShader =
        `
            varying vec3 vNormal;
            varying vec3 vWorldPosition;
            
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.);
                vWorldPosition = worldPosition.xyz;
                vNormal = normalize(normalMatrix * normal);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }`;

    const fragmentShader = [
        'varying vec3 vNormal;',
        'varying vec3 vWorldPosition;',

        'uniform vec3 lightColor;',

        'uniform vec3 spotPosition;',

        'uniform float attenuation;',
        'uniform float anglePower;',
        'uniform float alpha;',

        'void main() {',
        'float intensity;',

        'intensity = distance(vWorldPosition, spotPosition) / (attenuation * 80.);',
        'intensity = 1. - clamp(intensity, 0., 1.);',

        'vec3 normal = vec3(vNormal.x, vNormal.y, abs(vNormal.z));',
        'float angleIntensity = pow(dot(normal, vec3(0., 0., 1.)), anglePower);',
        'intensity = intensity * angleIntensity;',

        'gl_FragColor.rgb = lightColor;',
        'gl_FragColor.a = min(intensity, alpha);',
        '}',
    ].join('\n');

    return new THREE.ShaderMaterial({
        uniforms: {
            attenuation: {
                value: attenuation
            },
            anglePower: {
                value: anglePower
            },
            spotPosition: {
                value: spotPosition
            },
            lightColor: {
                value: lightColor
            },
            alpha: {
                value: alpha
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
    });
}

export default THREEx;