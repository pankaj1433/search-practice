const debounce = (callback, timeout = 0) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, timeout);
    };
}

export default debounce;
