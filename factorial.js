function factorial1(n) {
  let factor = 1
  for(let i=1; i<=n; i++) {
    factor *= i
  }
  return factor
}
console.log(factorial1(5));

function factorial2(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial2(n-1);
}
console.log(factorial2(5));