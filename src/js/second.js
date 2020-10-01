console.log("Hello from second js-file");



// Test ES6
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);

console.log(map1);


// Test ES6
function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));