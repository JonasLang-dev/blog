---
slug: JS-functions
title: JS 函数式编程
authors: jonas
tags: [bing maps api, react]
---

**编程范型**、**编程范式**或**程序设计法**(Programming paradigm)，是指软件工程重的一类典型的**编程风格**。常见的编程范型有：**函数式编程**[^1]、**指令编程**、**过程编程**、**面向对象编程等等**。

## 纯函数

函数只会有输入输出，不应有任何额外操作。例如：操作全局变量,对全局实例化对象进行操作等等。

```ts
var name: string = "John";
function greet() {
  console.log("Hi, I'm " + name); // Not Pure
}

function greet(name) {
  return "Hi, I'm " + name; // Pure
}
```

## 一等公民

> 函数是'一等公民'（First-class Function）

“**一等公民**”,**头等函数**(**first-class function**， **第一级函数**)是指在程序设计语言中，函数被当作**头等公民**[^2]。这就意味着，函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储数据结构中

由于在 javascript 中函数是一等公民因此具备：

- 内置的属性和方法
- 可以添加属性和方法
- 可以为参数传递从其他函数返回
- 可以分配给变量，数组元素和其他对象

### 内置属性

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

### 高阶函数：函数作为实参传递

```ts
const isEven = (n) => n % 2 === 0;

const judgFunc = (num, callback) => {
  const flag = callback(num);
  return `The number ${num} is an even number: ${isNumEven}.`;
};
```

### 高阶函数:返回函数作为结

```ts
function makeAdjectifier(adjective) {
  return function (string) {
    return adjective + " " + string;
  };
}

var coolifier = makeAdjectifier("coll");
coolifier("conference"); // "cool conference"
```

## 避免迭代

使用 map、 reduce、filter 等，取代 for、 while 进行迭代。

- reduce 函数求和
- filter 函数过滤
- map 函数每个元素执行回调函数并返回由回调函数返回值组成的新数组
- forEach 函数按序对数组每个元素执行回调函数

## 避免数据变异

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

当然随着工程变大会引发效率问题，为进一步提升可以使用一些持久数据结构进行优化

## 优势

函数式编程与其说是一种书写代码规范，不如说是一种思维方式。在面对一个问题，会使用特定思考方式解决问题。当然没有绝对的孰优孰劣，具体需要看应用场景。

- 代码简洁 - 功能抽离，减少重复代码
- 易于理解 - 偏向于自然语言
- 方便维护与拓展 - 函数式编程只要保证输入输出不变，内部实现与外部无关
- 更易于并发 - 函数式编程不修改变量所以不需要考虑"死锁问题"

[^1]: **函数式编程**，或称**函数程序设计**、**泛函编程**（英语：Functional programming），是一种编程范型，它将电脑运算视为函数运算，并且避免使用程序状态以及可变物件。
[^2]: 头等公民：指称支持其他实体通常能获得的所有运算的实体。包括不限于拥有特定的基本权利，都可作为函数的实参，作为函数的结果返回，是赋值语句的主体。
