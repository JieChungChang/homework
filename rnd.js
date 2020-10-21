var randomNum = (function() {
  const today = new Date();
  const seed = today.getTime();

  function rnd() {
    seed = ( seed * 9301 + 49297 ) % 233280;
    return seed / ( 233280.0 );
  };

  return function rand(number){
    return Math.ceil(rnd(seed) * number);
  };
})();

console.log(randomNum(100))
console.log(randomNum(100))
console.log(randomNum(100))