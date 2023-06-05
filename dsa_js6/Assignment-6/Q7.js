//Complexity
//Time Complexity: O(n).
//Auxiliary Space: O(1) because it is using constant space for variables
let generateMatrix = function (n) {
  let c1 = 0;
  let c2 = n - 1;
  let r1 = 0;
  let r2 = n - 1;

  let arr = Array.from(Array(n), () => Array(n));
  let i = 1;
  while (i <= n * n) {
    for (let c = c1; c <= c2; c++) {
      arr[r1][c] = i;
      i++;
    }
    r1++;
    for (let r = r1; r <= r2; r++) {
      arr[r][c2] = i;
      i++;
    }
    c2--;
    for (let c = c2; c >= c1; c--) {
      arr[r2][c] = i;
      i++;
    }
    r2--;
    for (let r = r2; r >= r1; r--) {
      arr[r][c1] = i;
      i++;
    }
    c1++;
  }
  return arr;
};
console.log(generateMatrix(3));
