export const saveArrayToLocalStorage = function (storageKey, value) {
  if (localStorage.getItem(storageKey)) {
    let arrayOfValues = JSON.parse(localStorage.getItem(storageKey));

    if (storageKey === "favourite-countries") {
      if (arrayOfValues.includes(value)) {
        arrayOfValues = arrayOfValues.filter((arrValue) => arrValue !== value);
      } else {
        arrayOfValues.push(value);
      }
    }

    if (storageKey === "history") {
      arrayOfValues = arrayOfValues.filter((arrValue) => arrValue !== value);
      arrayOfValues.unshift(value);
      if (arrayOfValues.length > 10) {
        arrayOfValues = arrayOfValues.slice(0, 10);
      }
    }

    localStorage.setItem(storageKey, JSON.stringify(arrayOfValues));
  } else {
    localStorage.setItem(storageKey, JSON.stringify([value]));
  }
};
