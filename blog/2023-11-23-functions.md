---
slug: JS-functions
title: JS functional programming
authors: jonas
tags: [JS]
---

Programming paradigm refers to a typical **programming style** in software engineering.Common programming paradigms are: **functional programming**[^1], **instruction programming**, **procedural programming**, **object-oriented programming, etc.**.

## pure function

Functions only have input and output, and should not have any additional operations. For example: operate global variables, operate on global instantiated objects, and so on.

```ts
var name: string = "John";
function greet() {
  console.log("Hi, I'm " + name); // Not Pure
}

function greet(name) {
  return "Hi, I'm " + name; // Pure
}
```

## First-class

**first-class function** means that in a programming language, functions are treated as **first-class citizens**[^2].This means that functions can be used as parameters of other functions, return values of functions, assigned to variables or stored in data structures

Since functions are first-class citizens in javascript, they have:

- Built-in properties and methods
- properties and methods can be added
- can be returned from other functions for parameter passing
- can be assigned to variables, array elements and other objects

### properties

```ts
//Assign a function to a variable originalFunc
const originalFunc = (num) => {
  return num + 2;
};

//Re-assign the function to a new variable newFunc
const newFunc = originalFunc;

//Access the function's name property
newFunc.name; //'originalFunc'

//Return the function's body as a string
newFunc.toString(); //'(num) => { return num + 2 }'

//Add our own isMathFunction property to the function
newFunc.isMathFunction = true;
```

### Higher-order functions: functions are passed as arguments

```ts
const isEven = (n) => n % 2 === 0;

const judgFunc = (num, callback) => {
  const flag = callback(num);
  return `The number ${num} is an even number: ${isNumEven}.`;
};
```

### Higher-order functions: return functions as knots

```ts
function makeAdjectifier(adjective) {
  return function (string) {
    return adjective + " " + string;
  };
}

var coolifier = makeAdjectifier("coll");
coolifier("conference"); // "cool conference"
```

## avoid iteration

Use map, reduce, filter, etc. instead of for and while for iteration.

- reduce function summation
- filter function filtering
- The map function executes the callback function for each element and returns a new array composed of the return value of the callback function
- The forEach function executes the callback function on each element of the array in sequence

## Avoid data mutation

```ts
var rooms = ["H1", "H2", "H3"];
var newRooms = rooms.map(function (rm) {
  if (rm == "H3") {
    return "H4";
  } else {
    return rm;
  }
});

// newRooms => ["H1", "H2", "H4"]
// rooms => ["H1", "H2", "H3"]
```

Of course, as the project becomes more efficient, it will cause efficiency problems. For further improvement, some persistent data structures can be used for optimization.

## Advantage

Functional programming is not so much a way of writing code as it is a way of thinking. When faced with a problem, use a specific way of thinking to solve the problem. Of course, there is no absolute superiority or inferiority, depending on the application scenario.

- Code is concise - function extraction, reduce duplication of code
- Easy to understand - favor natural language
- Convenient maintenance and expansion - Functional programming only needs to ensure that the input and output remain unchanged, and the internal implementation has nothing to do with the external
- Easier to concurrency - functional programming does not modify variables so there is no need to worry about "deadlock problems"

[^1]: Functional programming is a programming paradigm that treats computer operations as functions and avoids the use of program state and mutable objects.
[^2]: First Class Citizen: Refers to an entity that supports all operations normally available to other entities. Including but not limited to having specific basic rights, they can be used as the actual parameters of the function, returned as the result of the function, and are the main body of the assignment statement.
