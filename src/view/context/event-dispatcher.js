
class EventDispatcher {
    constructor() {
        this._eventListeners = [];
    }

    Create() {
        return new EventDispatcher();
    }

    addEventListener(listener) {
        this._eventListeners.push(listener);
    }

    removeEventListener(listener) {
        let index = this._eventListeners.indexOf(listener);
        if (index !== -1) {
            this._eventListeners.splice(index, 1);
        }
    }

    invokeEvent(event) {
        for (let listener of this._eventListeners) 
            listener.invokeEvent(event);
    }
}

export default EventDispatcher;