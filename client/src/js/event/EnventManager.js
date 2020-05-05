/**
 * The **EventManager** can be used to pass events between different parts of the application. It's a singleton that can be imported and used everywhere (Vue components, js files, store, ...).
 *
 * @example
 * import EventManager from './event/EventManager';
 */
class EventManager {
    instance;
    subscriptions = {}

    constructor() {
        this.instance = this
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - The name of the event
     * @param {Function} callback - Function triggered when event received
     * @return {{unsubscribe: unsubscribe}}
     *
     * @example
     * // Subscribe to an event
     * EventManager.subscribe('my_event', (data) => {
     *     // Do what you need with the data
     * });
     *
     * @example
     * // Subscribe to an event and keep tracking to unsubscribe later
     * const event = EventManager.subscribe('my_event', (data) => {
     *     // Do what you need with the data
     * });
     *
     * // Unsubscribe this event
     * event.unsubscribe()
     */
    subscribe(eventName, callback) {
        const id = Symbol('id');
        if (!this.subscriptions[eventName]) this.subscriptions[eventName] = { };
        this.subscriptions[eventName][id] = callback;
        return {
            unsubscribe: () => {
                delete this.subscriptions[eventName][id];
                if (Object.getOwnPropertySymbols(this.subscriptions[eventName]).length === 0) {
                    delete this.subscriptions[eventName];
                }
            },
        };
    }

    /**
     * Globally unsubscribe an event
     * @param {string} eventName - The name of the event
     *
     * @example
     * EventManager.unsubscribe('my_event');
     */
    unsubscribe(eventName) {
        if (!this.subscriptions[eventName]) return;

        Object.getOwnPropertySymbols(this.subscriptions[eventName])
        delete this.subscriptions[eventName];
    }

    /**
     * Publish an event
     * @param {string} eventName - The name of the event
     * @param {Object} data - Data
     *
     * @example
     * EventManager.publish('my_event', {foo: bar})
     */
    publish(eventName, data) {
        if (!this.subscriptions[eventName]) return;

        Object.getOwnPropertySymbols(this.subscriptions[eventName])
            .forEach(key => this.subscriptions[eventName][key](data));
    }
}

// Export singleton
export default new EventManager().instance
