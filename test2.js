var t;
var o = { "hi": 'Hello World!' };

t = 2 + 3;
console.log(t); //5

t = o;
console.log(t); //{ hi: 'Hello World!' }

t += 2;
console.log(t); //[object Object]2

t = o || 5;
console.log(t); //{ hi: 'Hello World!' }

t = o || false;
console.log(t); //{ hi: 'Hello World!' }

t = o && false;
console.log(t); //false

t = o && true;
console.log(t); //true

t = false || o;
console.log(t); //{ hi: 'Hello World!' }

t = true || o;
console.log(t); //true

t = false && o;
console.log(t); //false

t = true && o;
console.log(t); //{ hi: 'Hello World!' }

p = { "bye" : "Goodbye World!" };
t = true && o && p;
console.log(t); //{ bye: 'Goodbye World!' }

t = true && o || p;
console.log(t); //{ hi: 'Hello World!' }

t = true && o || p;
console.log(t); //{ hi: 'Hello World!' }
