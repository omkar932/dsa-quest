// src/utils/helpers.ts

export const bubbleSort = (arr: number[]): number[] => {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
};

export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }
  const a = [...arr];
  const pivot = a[Math.floor(a.length / 2)];
  const left = [];
  const right = [];
  for (let i = 0; i < a.length; i++) {
    if (i === Math.floor(a.length / 2)) continue;
    if (a[i] < pivot) {
      left.push(a[i]);
    } else {
      right.push(a[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const merge = (leftArr: number[], rightArr: number[]): number[] => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        result.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        result.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
  };

  return merge(mergeSort(left), mergeSort(right));
};
