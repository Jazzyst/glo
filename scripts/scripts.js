let num = 266219;

let result = num.toString().split('').reduce(( res, el) => el * res, 1 );
console.log(result);

result **= 3;
result = result.toString().substr(0, 2)
console.log(result);

