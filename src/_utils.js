export const getQuery = param => param.match(/[^\?q=]/gi).reduce((a, b) => a + b);

export const isObjectEqual = (obj1, obj2) => { // Works with objects of same length & same key order only
  const arr1 = Object.values(obj1);
  const arr2 = Object.values(obj2);
  const length = arr1.length;

  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}