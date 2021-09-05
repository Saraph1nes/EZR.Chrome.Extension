export const setLocalStorageItem = (key, value) => {
  const storage = localStorage.getItem('ezr-chrome-extension-storage');

  if (storage) {
    const item = JSON.parse(localStorage.getItem('ezr-chrome-extension-storage'));
    let keyValue = {};
    keyValue[key] = value;
    let setItem = JSON.stringify(Object.assign(item, keyValue));
    localStorage.setItem('ezr-chrome-extension-storage', setItem);
  } else {
    let keyValue = {};
    keyValue[key] = value;
    let setItem = JSON.stringify(Object.assign({}, keyValue));
    localStorage.setItem('ezr-chrome-extension-storage', setItem);
  }
};

export const getLocalStorageItem = (key) => {
  const storage = localStorage.getItem('ezr-chrome-extension-storage');
  if (storage) {
    const item = JSON.parse(storage);
    if (item[key]) {
      return item[key];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
