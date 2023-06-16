//Complexity
//Time Complexity: O(n log n).
//Auxiliary Space: O(1) because it is using constant space for variables

//function for doubled array changed by appending twice the value of every element in origin
const findOriginalArray = function (arr) {
  // Sort the input array in ascending order
  arr.sort((a, b) => a - b);
  // If the length of the array is odd, return an empty array as no solution is possible
  if (arr.length % 2 == 1) return [];
  // Initialize an empty object to store the frequency of each element in the array
  let obj = {};
  // Iterate through the input array
  for (let i = 0; i < arr.length; i++) {
    // If the current element is already present in the object, increment its count
    if (obj[arr[i]]) obj[arr[i]]++;
    // Otherwise, add the element to the object with a count of 1
    else obj[arr[i]] = 1;
  }
  // Initialize an empty array to store the original elements of the input array
  let ans = [];
  // Iterate through the input array again
  for (let i = 0; i < arr.length; i++) {
    // Store the current element in a variable
    let curr = arr[i];
    // If the current element is present in the frequency object
    if (obj[curr]) {
      // Calculate the double value of the current element
      let doubleVal = 2 * curr;
      // If the double value is also present in the frequency object
      if (obj[doubleVal]) {
        // Decrement the count of the current element and double value in the frequency object
        obj[curr]--;
        obj[doubleVal]--;
        // Push the current element to the "ans" array
        ans.push(arr[i]);
      }
      //if the elem did not have a double elem, that means we can return []
      else return [];
    }
  }
  return ans;
};

console.log(findOriginalArray([1,3,4,2,6,8]));
