//Complexity
//Time complexity : O(n2)O(n^2)O(n^2) We consider every possible subarray by traversing over the complete array for every start point possible.
//Space complexity : O(1)O(1)O(1). Only two variables zeroeszeroeszeroes and onesonesones are required.

//Function for the longest contiguous subarray with an equal number of 0 and 1.
let findMaxLength = function (nums) {
    //initialize
  let hash = { 0: -1 };
  let count = 0;
  let max = 0;
  //traverse over an array find length of an array 
  for (let i = 0; i < nums.length; i++) {
    //if num[i] == 0 decrement
    if (nums[i] == 0) count--;
    //else increment
    else count++;
//if hash[count] is not equal to null then set max value
    if (hash[count] != null) max = Math.max(max, i - hash[count]);
    //else hash[count] equal to integer
    else hash[count] = i;
  }
  return max;
};
console.log(findMaxLength([0, 1]));
