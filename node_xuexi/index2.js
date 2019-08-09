
// firstLoop: 
// for (let i = 0; i < 3; i++) { 
//    for (let j = 0; j < 3; j++) {
//       if (i === j) {
//         continue firstLoop; // 继续 firstLoop 循环
//         // break firstLoop; // 中止 firstLoop 循环
//       }
//       console.log(`i = ${i}, j = ${j}`);
//    }
// }

// let a = ['1','2','3']
// a.join = a.shift;

// let b = {
//   i: 1,
//   toString () {
//     return this.i++
//   }
// }

// let c = new Proxy({}, {
//   t: 1,
//   get: function () {
//     return () => this.t++
//   }
// })

// let d = {[Symbol.toPrimitive]: (function (hint) {
//   let i = 1
//   return () => i ++
// })()}

// console.log(b == 1 && b == 2 && b == 3)
// console.log(a == 1 && a == 2 && a == 3)
// console.log(c == 1 && c == 2 && c == 3)
// console.log(d == 1 && d == 2 && d == 3)

function flattenDeep (arr) {
  return arr.flat(Math.pow(2, 53) - 1)
}
console.log(flattenDeep([1, [2, [3, [4]], 5],6]))