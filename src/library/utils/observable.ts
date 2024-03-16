export const observable = <T>() => {
    let _observers = new Array();
    return {
        add: (callback?: ((eventData: T) => void) | null | undefined) => {
            _observers.push(callback);
        },
        remove: (callback?: ((eventData: T) => void) | null | undefined) => {
            _observers = _observers.filter((cb) => cb !== callback);
        },
        notify: (eventData: T) => {
            _observers.forEach((cb) => cb(eventData));
        },
    };
};
