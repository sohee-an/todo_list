enum LocalStorageKey {
  USER_ID = 'userId',
  TOKEN = 'token',
}

class LocalStorageWrapper {
  getItem<T>(key: LocalStorageKey): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  setItem<T>(key: LocalStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}

const localStorageWrapper = new LocalStorageWrapper();

export default localStorageWrapper;
