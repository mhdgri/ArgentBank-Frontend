export const API_URL = 'http://localhost:3001/api/v1';

export const setStorageItem = (key, value, useLocalStorage) => {
    const storage = useLocalStorage ? localStorage : sessionStorage;
    storage.setItem(key, value);
};

export const getStorageItem = (key) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const removeStorageItem = (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
};

export const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
};