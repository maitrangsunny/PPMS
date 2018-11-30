export function setObject(key, field) {
    return localStorage.setItem(key, JSON.stringify(field));
}

export function getObject(key) {
    return JSON.parse(localStorage.getItem(key) || "{}");
}

export function setArray(key, field) {
    return localStorage.setItem(key, JSON.stringify(field));
}

export function getArray(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

export function set(key, field) {
    return localStorage.setItem(key, field);
}

export function get(key) {
    return localStorage.getItem(key);
}

export function clear() {
    return localStorage.clear();
}

export function removeItem(item) {
    return localStorage.removeItem(item);
}