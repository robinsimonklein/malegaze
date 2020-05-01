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
