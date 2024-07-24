enum LocalStorageKey {
  Token = 'token',
  UserId = 'userId',
}

export const getLocalStorage = (key: LocalStorageKey) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
