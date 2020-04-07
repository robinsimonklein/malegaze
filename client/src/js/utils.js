/**
 * Create a unique ID
 * @return {string}
 */
export function ID(length) {
    return '_' + Math.random().toString(36).substr(2, length);
}
