

// Function to check if the given array is mountain array or not
    const isMountainArray = (arr) => {
        if (arr.length < 3)
            return false;
        let flag = 0, i = 0;
        for (i = 1; i < arr.length; i++)
            if (arr[i] <= arr[i - 1])
                break;
 
        if (i == arr.length || i == 1)
            return false;
 
        for (; i < arr.length; i++)
            if (arr[i] >= arr[i - 1])
                break;
        return i == arr.length;
    }
 
    // Question it is a valid mountain array.
 
    let arr = [2,1];
    (isMountainArray(arr)
        ? console.log("true")
        : console.log("false"));
 