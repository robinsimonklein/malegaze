/**
 * Create a unique ID
 * @param {Number} length Max length of the ID
 * @return {string}
 */
export function ID(length) {
    return '_' + Math.random().toString(36).substr(2, length);
}
