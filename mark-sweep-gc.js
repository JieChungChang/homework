let heap = [];

function root() {
  return heap[0];
}

const a = { name: 'a' };
heap.push(a);

// root -> a -> b
const b = {name: 'b'};
heap.push(b);
a.b = b;

// root -> a -> c
const c = {name: 'c'};
heap.push(c);
a.c = c;

// root -> a -> b -> d
const d = {name: 'd'};
heap.push(d);
b.d = d;

// Mark stage
function mark() {
  const todo = [root()];
  while (todo.length) {
    const object = todo.pop();
    if (!object.mark) {
      object.mark = true;
      for (let key in object) {
        if (typeof object[key] == 'object') {
          todo.push(object[key]);
        }
      }
    }
  }
}

function sweep() {
  heap = heap.filter((object)=>{
    if (object.mark) {
      object.mark = false;
      return true;
    } else {
      return false;
    }
  });
}

function gc() {
  // Trace all objects to mark reachable objects.
  mark();
  console.log('Current heap status after mark stage:', heap);
  // Collect the garbage.
  sweep();
}

// Before GC: [{a}, {b}, {c}, {d}]
console.log('Heap before all GC:', heap);

// Run first GC
gc();
console.log('Heap after first GC:', heap);
console.log('==========================');

// Remove "c" reference from "a"
delete a.c;
// Run GC
gc();
console.log('Heap after second GC:', heap);
console.log('==========================');

// Removed "b" reference from "a"
delete a.b;
// Run GC
gc();
console.log('Heap after third GC:', heap);
console.log('==========================');