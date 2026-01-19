export const saveArrayToLocalStorage = function (storageKey, value) {
  if (localStorage.getItem(storageKey)) {
    const arrayOfValues = JSON.parse(localStorage.getItem(storageKey));
    if (arrayOfValues.includes(value)) {
      const result = arrayOfValues.filter((arrValue) => arrValue !== value);
      localStorage.setItem(storageKey, JSON.stringify(result));
    } else {
      arrayOfValues.push(value);
      localStorage.setItem(storageKey, JSON.stringify(arrayOfValues));
    }
  } else {
    localStorage.setItem(storageKey, JSON.stringify([value]));
  }
};
