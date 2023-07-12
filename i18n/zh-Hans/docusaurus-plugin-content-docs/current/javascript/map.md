# Map

Map对象保存键值对，并且能够记住键得原始插入顺序。任何值都可以作为一个键或一个值。

## 描述

Map对象是键值对得集合。Map中得键只能出现一次。当调用set()插入相同的键时，顺序不变，后插入的值会覆盖前者的值。

``` js
const map = new Map()
map.set(1, "value1") // Map(1) {1 => "value1"}
map.set(2, "value2") // Map(1) {1 => "value1", 2 => "value2"}
map.set(1, "value3") // Map(1) {1 => "value3", 2 => "value2"}

```

* 规范要求map平均访问时间与集合的元素数量呈线性关系。具体复杂度根据各家浏览器实现不同而不同。哈希表O(1)，搜索树O(log(N))或任何其他数据结构，时间复杂度小于O(N)

* map键的比较基于零值相等算法(NaN与NaN, 0与-0都将视为相等)

* Object和Map类似，都允许按键取值、删除键、检测一个键是否绑定了值不过任然有一些重要区别，在下列情况Map会是更好的选择：

| | Map | Object |
|---|---|---|
|意外键|Map默认情况不包含任何键。只包含显式插入的键|object有一个原型，原型链上的键名可能与对象设置的键名冲突|
|键类型|任意值|String或Symbol|
|键的顺序|有序，迭代返回插入顺序|目前有序但不能依赖属性顺序|
|size|可根据size属性获取|需手动计算|
|迭代|Map可迭代|Object没有实现迭代协议(对象可以实现迭代协议，使用Object.keys或Obejct.entries)；for...in只允许迭代对象的可枚举属性|
|序列化和解析|不支持（但可手动实现[How do you JSON.stringify an ES6 Map?](https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map)）|使用JSON.stringify()序列化,JSON.parse()解析|
|性能|频繁增删键值对性能更好|未对添加和删除键值对场景进行优化|

* 以下代码能正常运行但不推荐

``` js
 const wrongMap = new Map();
 wrongMap['bla'] = 'blaa'; // X
 wrongMap.has('bla') // X
```

## 构造函数

Map()
创建Map对象

## 静态属性

get Map[@@species]
用于创建派生对象的构造函数

``` js
class MyMap extends Map {
  // 重写覆盖 MyMap species to the parent Map constructor
  static get [Symbol.species]() { return Map; }
}
```

### 实例属性

Map.prototype.size()
返回Map对象中键值对数量

```js
map.size()
```

## 实例方法

* Map.prototype.clear()

移除 Map 对象中所有的键值对。

``` js
map.clear()
```

* Map.prototype.delete()

移除 Map 对象中指定的键值对，如果键值对存在并成功被移除，返回 true，否则返回 false。调用 delete 后再调用 map.has(key) 将返回 false。

``` js
const delectFlag = map.delect(key)
```

* Map.prototype.get()

返回与指定的键 key 关联的值，若不存在关联的值，则返回 undefined。

``` js
map.get(key) // return undefined | value
```

* Map.prototype.has()

返回一个布尔值，用来表明 Map 对象中是否存在与指定的键 key 关联的值。

``` js
map.has(key) // return true or false
```

* Map.prototype.set()

在 Map 对象中设置与指定的键 key 关联的值，并返回 Map 对象。

``` js
map.set(key, value) // Map(n) {key => value, ...}
```

* Map.prototype\[@@iterator]()

返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组，并以插入 Map 对象的顺序排列。

``` js
var myMap = new Map();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz')

var mapIter = myMap[Symbol.iterator]();
//返回的其实是个 generator
console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

* Map.prototype.keys()

返回一个新的迭代对象，其中包含 Map 对象中所有的键，并以插入 Map 对象的顺序排列。

``` js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.keys();

console.log(iterator1.next().value);
// Expected output: "0"

console.log(iterator1.next().value);
// Expected output: 1

```

* Map.prototype.values()

返回一个新的迭代对象，其中包含 Map 对象中所有的值，并以插入 Map 对象的顺序排列。

``` js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.values();

console.log(iterator1.next().value);
// Expected output: "foo"

console.log(iterator1.next().value);
// Expected output: "bar"

```

* Map.prototype.entries()

返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组，并以插入 Map 对象的顺序排列。

``` js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.entries();

console.log(iterator1.next().value);
// Expected output: Array ["0", "foo"]

console.log(iterator1.next().value);
// Expected output: Array [1, "bar"]

```

* Map.prototype.forEach()

以插入的顺序对 Map 对象中存在的键值对分别调用一次 callbackFn。如果给定了 thisArg 参数，这个参数将会是回调函数中 this 的值。

``` js
function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
  .forEach(logMapElements);

// Expected output: "m[foo] = 3"
// Expected output: "m[bar] = [object Object]"
// Expected output: "m[baz] = undefined"

```
