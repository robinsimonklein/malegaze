import * as THREE from "three";
import {CatmullRomCurve3} from "three";

/**
 * Generate a unique ID
 * @param {number} [length=9] - Max length of the ID
 * @return {string}
 * @example
 * const id = ID()
 * console.log(id) // _bg4bka7yx
 */
export function ID(length= 9) {
    return '_' + Math.random().toString(36).substr(2, length);
}

/**
 * Convert an array into several chunks array
 * @param {Array} array - The array to chunk
 * @param {number} size - Chunk size
 * @return {Array}
 */
export function chunkArray(array, size){
    let index = 0;
    let arrayLength = array.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += size) {
        const chunk = array.slice(index, index+size);
        // Do something if you want with the group
        tempArray.push(chunk);
    }

    return tempArray;
}

/**
 * Convert a THREE.Line into a THREE.CatmullRomCurve3
 * @param {THREE.Line} line - A THREE.Line object
 * @return {CatmullRomCurve3}
 */
export function lineToCurve(line) {
    // Extract the array of all points positions [x, y, z, x, y, z, ...]
    const positionArray = Array.from(line.geometry.attributes.position.array)

    // Extract chunks of this array
    const chunks = chunkArray(positionArray, 3)

    // Convert this array into an array of Vector3
    const points = Array.from(chunks, point => new THREE.Vector3(point[0], point[1], point[2]))

    // Create the curve
    const curve = new CatmullRomCurve3(points)

    // Add the curve into curves list
    curve.name = line.name ?? 'unnamed_curve'
    return curve
}
