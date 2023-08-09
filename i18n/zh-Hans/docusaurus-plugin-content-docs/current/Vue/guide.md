# 基础

创建Vue工程

可以使用[create-vue](https://github.com/vuejs/create-vue)脚手架快速创建Vue工程项目(typescript，eslint，jsx，prettier，Pinia，vitest等等支持)

``` shell
npm init vue@latest

✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

亦可通过vite创建vue项目

``` shell
yarn create vite
```

## 模板语法

### 文本插值

使用Mustache语法进行文本插值
支持显示原始HTML

``` jsx
<span>Message: {{ msg }}</span>

<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

* 在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 XSS 漏洞

### Attribute 绑定

响应式地绑定一个attribute，需要使用v-bind指令：

``` jsx
<div v-bind:id="dynamicId"></div>

// 简写
<div :id="dynamicId"></div>
```

v-bind 指令指示 Vue 将元素的 id attribute 与组件的 dynamicId 属性保持一致。如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。

#### 布尔型Attribute

``` jsx
<button :disabled="isButtonDisabled">Button</button>
```

当 isButtonDisabled 为真值或一个空字符串 (即 <button disabled=""\>) 时，元素会包含这个 disabled attribute。而当其为其他假值时 attribute 将被忽略。

#### 绑定多个值

``` jsx
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

<div v-bind="objectOfAttrs"></div>
```

### 使用表达式

``` jsx
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

### 调用函数

``` jsx
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

---

* 指令 Directives：指令是带有 v- 前缀的特殊 attribute。
* 参数 Arguments：某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。

``` jsx
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>

<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

* 动态参数：同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内
* 数值的限制：动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。
* 语法的限制：动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。

``` jsx
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">
```

* 修饰符 Modifiers：修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 .prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()

``` jsx
<form @submit.prevent="onSubmit">...</form>
```

![directive](/img/directive.69c37117.png)

## 响应式

### 声明响应式状态

#### ref()

``` jsx
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}

/* --------------- */

import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}

/* --------------- */

<div>{{ count }}</div>

<button @click="increment">
  {{ count }}
</button>
```

#### reactive()

``` jsx
import { reactive } from 'vue'

const state = reactive({ count: 0 })

<button @click="state.count++">
  {{ state.count }}
</button>
```

##### 缺点

1. 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

2. 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。

3. 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接

``` jsx
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })

const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

## 计算属性

``` jsx
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

模板中的表达式虽然方便,但是模板中书写大多逻辑会导致臃肿，难以维护。

``` jsx
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

### 计算属性缓存 vs 方法

计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 author.books 不改变，无论多少次访问 publishedBooksMessage 都会立即返回先前的计算结果，而不用重复执行 getter 函数。

``` jsx
<p>{{ calculateBooksMessage() }}</p>

// 组件中
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}

// 下面计算属性永远不会更新，Date.now() 并不是一个响应式依赖
const now = computed(() => Date.now())
```

方法调用总是会在重渲染发生时再次执行函数。

### 可写计算属性

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

``` jsx
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

* Getter 不应有副作用 - 不要在 getter 中做异步请求或者更改 DOM
* 避免直接修改计算属性值

## 类与样式绑定

### 绑定 HTML class

``` jsx
const isActive = ref(true)
const hasError = ref(false)

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

// 渲染结果
<div class="static active"></div>
```

#### 对象

``` jsx
const classObject = reactive({
  active: true,
  'text-danger': false
})

<div :class="classObject"></div>

// 计算属性
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))

<div :class="classObject"></div>

// 等同于上例渲染结果
<div class="static active"></div>
```

#### 数组

``` jsx
const activeClass = ref('active')
const errorClass = ref('text-danger')

<div :class="[activeClass, errorClass]"></div>

// 渲染结果
<div class="active text-danger"></div>

// 可使用条件渲染
<div :class="[isActive ? activeClass : '', errorClass]"></div>

// 使用嵌套对象优化
<div :class="[{ active: isActive }, errorClass]"></div>
```

#### 组件

``` jsx
<!-- 在使用组件时 -->
<MyComponent class="baz boo" />

// 渲染结果
<p class="foo bar baz boo">Hi!</p>

<MyComponent :class="{ active: isActive }" />

// 渲染结果
<p class="foo bar active">Hi!</p>


// 手动指定接受class

<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<MyComponent class="baz" />

// 渲染结果

<p class="baz">Hi!</p>
<span>This is a child component</span>

```

### 绑定内联样式

#### 绑定对象

``` jsx
const activeColor = ref('red')
const fontSize = ref(30)

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

<div :style="styleObject"></div>
```

#### 绑定数组

``` jsx
<div :style="[baseStyles, overridingStyles]"></div>
```

#### 样式多值

``` jsx
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex。

## 条件渲染

``` jsx
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

### template与v-if

``` jsx
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-show

``` jsx
<h1 v-show="ok">Hello!</h1>
```

* v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。

* v-show 不支持在 <template\> 元素上使用，也不能和 v-else 搭配使用。

### v-if vs. v-show

* v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

* v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

* 相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

* 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

### v-if 和 v-for

当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。请查看列表渲染指南获取更多细节。

## 列表渲染

``` jsx
<div v-for="item of items"></div>

<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>

<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

### v-for可遍历对象

``` jsx
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>

<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>

<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

### 使用范围值

``` jsx
<span v-for="n in 10">{{ n }}</span>
```

### template上使用v-for

``` jsx
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### key

跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute：

``` jsx
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

### 过滤，排序

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

``` jsx
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})

<li v-for="n in evenNumbers">{{ n }}</li>

/* ------- */
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}

<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

## 事件处理

## 表单输入绑定

## 生命周期

## 侦听器

## 模板引用

## 组件基础
