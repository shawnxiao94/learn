export default class Emitter {
    constructor() {
        this._listener = [];
    }
    bind(eventName, callback) {
        let listener = this._listener[eventName] || [];
        listener.push(callback);
        this._listener[eventName] = listener;
    }
    trigger(eventName) {
        let args = Array.prototype.slice.apply(arguments).slice(1);
        let listener = this._listener[eventName];
        if (!Array.isArray(listener)) return;
        listener.forEach(function(callback) {
            try {
                callback.apply(this, args);
            } catch (e) {
                console.error(e);
            }
        });
    }
}
