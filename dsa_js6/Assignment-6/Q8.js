//Complexity
//Time Complexity: O(nxn).
//Auxiliary Space: O(1) because it is using constant space for variables

class sparse_matrix {
  constructor(r, c) {
    // Maximum number of elements in matrix
    this.MAX = 100;
    // Array representation of sparse matrix[][0] represents row[][1] represents col[][2] represents value
    this.data = new Array(this.MAX);
    for (var i = 0; i < this.MAX; i++) this.data[i] = new Array(3);

    // dimensions of matrix
    this.row = r;
    this.col = c;

    // total number of elements in matrix
    this.len = 0;
  }

  // insert elements into sparse matrix
  insert(r, c, val) {
    // invalid entry
    if (r > this.row || c > this.col) {
      console.log("Wrong entry");
    } else {
      // insert row value
      this.data[this.len][0] = r;

      // insert col value
      this.data[this.len][1] = c;

      // insert element's value
      this.data[this.len][2] = val;

      // increment number of data in matrix
      this.len++;
    }
  }

  add(b) {
    // if matrices don't have same dimensions
    if (this.row != b.row || this.col != b.col) {
      console.log("Matrices can't be added");
    } else {
      let apos = 0,
        bpos = 0;
      let result = new sparse_matrix(this.row, this.col);

      while (apos < this.len && bpos < b.len) {
        // if b's row and col is smaller
        if (
          this.data[apos][0] > b.data[bpos][0] ||
          (this.data[apos][0] == b.data[bpos][0] &&
            this.data[apos][1] > b.data[bpos][1])
        ) {
          // insert smaller value into result
          result.insert(b.data[bpos][0], b.data[bpos][1], b.data[bpos][2]);

          bpos++;
        }

        // if a's row and col is smaller
        else if (
          this.data[apos][0] < b.data[bpos][0] ||
          (this.data[apos][0] == b.data[bpos][0] &&
            this.data[apos][1] < b.data[bpos][1])
        ) {
          // insert smaller value into result
          result.insert(
            this.data[apos][0],
            this.data[apos][1],
            this.data[apos][2]
          );

          apos++;
        } else {
          // add the values as row and col is same
          let addedval = this.data[apos][2] + b.data[bpos][2];

          if (addedval != 0)
            result.insert(this.data[apos][0], this.data[apos][1], addedval);
          // then insert
          apos++;
          bpos++;
        }
      }

      // insert remaining elements
      while (apos < this.len)
        result.insert(
          this.data[apos][0],
          this.data[apos][1],
          this.data[apos++][2]
        );

      while (bpos < b.len)
        result.insert(b.data[bpos][0], b.data[bpos][1], b.data[bpos++][2]);

      // print result
      result.print();
    }
  }

  transpose() {
    // new matrix with inversed row X col
    let result = new sparse_matrix(this.col, this.row);

    // same number of elements
    result.len = this.len;

    // to count number of elements in each column
    let count = new Array(this.col + 1);

    // initialize all to 0
    for (var i = 1; i <= this.col; i++) count[i] = 0;

    for (var i = 0; i < this.len; i++) count[this.data[i][1]]++;

    let index = new Array(this.col + 1);

    // to count number of elements having col smaller than particular i as there is no col with value < 1
    index[1] = 0;

    // initialize rest of the indices
    for (var i = 2; i <= this.col; i++) index[i] = index[i - 1] + count[i - 1];

    for (var i = 0; i < this.len; i++) {
      // insert a data at rpos and increment its value
      var rpos = index[this.data[i][1]]++;

      // transpose row=col
      result.data[rpos][0] = this.data[i][1];

      // transpose col=row
      result.data[rpos][1] = this.data[i][0];

      // same value
      result.data[rpos][2] = this.data[i][2];
    }

    // the above method ensures sorting of transpose matrix according to row-col value
    return result;
  }

  multiply(b) {
    if (this.col != b.row) {
      // Invalid multiplication
      console.log("Can't multiply, " + "Invalid dimensions");

      return;
    }

    // transpose b to compare row and col values and to add them at the end
    b = b.transpose();
    let apos, bpos;

    // result matrix of dimension row X b.col however b has been transposed, hence row X b.row
    let result = new sparse_matrix(this.row, b.row);

    // iterate over all elements of A
    for (apos = 0; apos < this.len; ) {
      // current row of result matrix
      let r = this.data[apos][0];

      // iterate over all elements of B
      for (bpos = 0; bpos < b.len; ) {
        // current column of result matrix data[][0] used as b is transposed
        let c = b.data[bpos][0];

        // temporary pointers created to add all multiplied values to obtain current element of result matrix
        let tempa = apos;
        let tempb = bpos;

        let sum = 0;

        // iterate over all elements with same row and col value to calculate result[r]
        while (
          tempa < this.len &&
          this.data[tempa][0] == r &&
          tempb < b.len &&
          b.data[tempb][0] == c
        ) {
          if (this.data[tempa][1] < b.data[tempb][1])
            // skip a
            tempa++;
          else if (this.data[tempa][1] > b.data[tempb][1])
            // skip b
            tempb++;
          // same col, so multiply and
          // increment
          else sum += this.data[tempa++][2] * b.data[tempb++][2];
        }

        // insert sum obtained in result[r] if its not equal to 0
        if (sum != 0) result.insert(r, c, sum);

        while (bpos < b.len && b.data[bpos][0] == c)
          // jump to next column
          bpos++;
      }

      while (apos < this.len && this.data[apos][0] == r)
        // jump to next row
        apos++;
    }

    result.print();
  }

  // printing matrix
  print() {
    console.log("Dimension: " + this.row + "x" + this.col);
    console.log("Sparse Matrix: \nRow Column Value");

    for (var i = 0; i < this.len; i++) {
      console.log(
        this.data[i][0] + " " + this.data[i][1] + " " + this.data[i][2]
      );
    }
  }
}

// create two sparse matrices and insert values
let a = new sparse_matrix(4, 4);
let b = new sparse_matrix(4, 4);

a.insert(1,0,0);
a.insert(-1,0,3);
b.insert(7,0,0);
b.insert(0,0,0);
b.insert(0,0,1);

// Output result
console.log("Addition: ");
a.add(b);
console.log("\nMultiplication: ");
a.multiply(b);
console.log("\nTranspose: ");
let atranspose = a.transpose();
atranspose.print();
