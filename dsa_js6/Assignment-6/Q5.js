//Complexity
//Time Complexity: O(n log n).
//Auxiliary Space: O(1) because it is using constant space for variables

//functtion for the minimum product sum
function minValue(A, B, n) {
  // Sort A and B so that minimum and maximum value can easily be fetched.
  A.sort(function (a, b) {
    return a - b;
  });
  B.sort(function (a, b) {
    return a - b;
  });
  // Multiplying minimum value of A and maximum value of B
  let result = 0;
  for (let i = 0; i < n; i++) result += A[i] * B[n - i - 1];

  return result;
}

// Question  two arrays nums1 and nums2 of length n, return the minimum product sum if you are allowed to rearrange the order of the elements in nums1.
let A = [5, 3, 4, 2];
let B = [4, 2, 2, 5];
let n = A.length;
//solution 3*4 + 5*2 + 4*2 + 2*5 = 40 after the product sum
console.log(minValue(A, B, n));
