export function toggleValueInList<T>(value: T, list: Array<T>): Array<T> {
  let newList;
  if (list.includes(value)) {
    newList = list.filter((i: T) => value !== i);
  } else {
    newList = [...list, value];
  }
  return newList;
}
