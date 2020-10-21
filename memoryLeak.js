function parentFunction(paramA) {
  const a = paramA;
  function childFunction() {
    return a + 2;
  }
  return childFunction;
}
setInterval(parentFunction(1000), 1000);
