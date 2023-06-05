//Time Complexity:- O(NLogN)
//Space Complexity:- O(1)

// Function to check if an array represents a permutation or not
var diStringMatch = function(s) {    
    let arr = []                            // array to store result
    let a = 0                               // start value for 'I'
    let b = s.length                        // start value for 'D'

    for (let i = 0; i < s.length; i++) 
        if (s[i] == 'D') 
            arr.push(b--)                   // push b to arr and decrement b
        else 
            arr.push(a++)                   // push a to arr and increment a

    arr.push(a)         // push final value to arr
    
    return arr          // return arr as result

};
console.log(diStringMatch([0, 4, 1, 3, 2]));