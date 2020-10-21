function getSequence(start, end) {
  const sequenceTotalLength = end-start+1;
  const sequence = [];
  const index = 0;
  while (sequence.length < sequenceTotalLength) {
    const randomNumber = Math.floor(Math.random() * sequenceTotalLength)+1;
    const exist = sequence.includes(randomNumber);
    if (!exist) sequence.push(randomNumber);
  }
  console.log(sequence);
}

getSequence(1, 10);