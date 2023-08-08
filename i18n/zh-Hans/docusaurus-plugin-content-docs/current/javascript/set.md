# Set

Set对象允许存储任何的唯一值，无论是原始值或者对象引用。

Set对象是值得合集，按照插入顺序迭代元素。Set中得元素只会**出现一次**,其中Set中的元素是唯一的。

**值的相等**：

对于Set，+0和-0是相同值。另外，NaN和undefined都可以被存储在Set中，NaN之间被视为相同值。

## Constructor

Set() 创建Set对象

``` js
const set = new Set([1, 2, 3, 4, 5]);
```

## 静态属性

get Set[@@species] 构造函数用来创建派生对象。

``` js
class MySet extends Set {
  // Overwrite MySet species to the parent Set constructor
  static get [Symbol.species]() {
    return Set;
  }
}
```

## 实例属性

Set.prototype.size 返回Set对象中的值的个数

``` js
const set1 = new Set();
const object1 = {};

set1.add(42);
set1.add('forty two');
set1.add('forty two');
set1.add(object1);

console.log(set1.size);
// Expected output: 3
```

## 实例方法

Set.prototype.add(value)
在Set对象尾部添加一个元素。返回该 Set 对象。

``` js
const set1 = new Set();

set1.add(42);
set1.add(42);
set1.add(13);
```

Set.prototype.clear()
移除Set对象内的所有元素。

``` js
const set1 = new Set();
set1.add(1);
set1.add('foo');

console.log(set1.size);
// Expected output: 2

set1.clear();

console.log(set1.size);
// Expected output: 0
```

Set.prototype.delete(value)
移除值为 value 的元素，并返回一个布尔值来表示是否移除成功。Set.prototype.has(value) 会在此之后返回 false。

``` js
const set1 = new Set();
set1.add({ x: 10, y: 20 }).add({ x: 20, y: 30 });

// Delete any point with `x > 10`.
set1.forEach((point) => {
  if (point.x > 10) {
    set1.delete(point);
  }
});

console.log(set1.size);
// Expected output: 1
```

Set.prototype.entries()
返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值的 [value, value] 数组。为了使这个方法和 Map 对象保持相似，每个值的键和值相等。

``` js
const set1 = new Set();
set1.add(42);
set1.add('forty two');

const iterator1 = set1.entries();

for (const entry of iterator1) {
  console.log(entry);
  // Expected output: Array [42, 42]
  // Expected output: Array ["forty two", "forty two"]
}
```

Set.prototype.forEach(callbackFn[, thisArg])
按照插入顺序，为 Set 对象中的每一个值调用一次 callBackFn。如果提供了thisArg参数，回调中的 this 会是这个参数。

``` js
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}

new Set(['foo', 'bar', undefined]).forEach(logSetElements);

// Expected output: "s[foo] = foo"
// Expected output: "s[bar] = bar"
// Expected output: "s[undefined] = undefined"
```

Set.prototype.has(value)
返回一个布尔值，表示该值在 Set 中存在与否。

``` js
const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.has(1));
// Expected output: true

console.log(set1.has(5));
// Expected output: true

console.log(set1.has(6));
// Expected output: false
```

Set.prototype.keys()
与 values() 方法相同，返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。

Set.prototype.values()
返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。

``` js
const set1 = new Set();
set1.add(42);
set1.add('forty two');

const iterator1 = set1.values();

console.log(iterator1.next().value);
// Expected output: 42

console.log(iterator1.next().value);
// Expected output: "forty two"
```

Set.prototype\[@@iterator]()
返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。

``` js
const set1 = new Set();

set1.add(42);
set1.add('forty two');

const iterator1 = set1[Symbol.iterator]();

console.log(iterator1.next().value);
// Expected output: 42

console.log(iterator1.next().value);
// Expected output: "forty two"
```
