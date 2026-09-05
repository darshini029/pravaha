// LocalStorage persistence helper with fallback
const PREFIX = 'PRAVAHA_';

export function getStorageItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(PREFIX + key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

export function clearPravahaStorage() {
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  } catch (err) {
    console.error('Error clearing PRAVAHA storage:', err);
  }
}
