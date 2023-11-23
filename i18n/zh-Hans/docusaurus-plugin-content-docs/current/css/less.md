# Less

## 特性

### 变量（Variables）

```css
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

### 混合（Mixins）

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

/* 在下面对bordered混合使用 */
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

### 嵌套（Nesting）

```css
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }

  &:after {
    font-size: 0;
    height: 0;
  }
}
```

### 运算（Operations）

```css
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm

@incompatible-units: 2 + 5px - 3cm; // 4px

@base: 5%;
@filler: @base * 2; // 10%
@other: @base + @filler; // 15%

@var: 50vh/2;
width: calc(50% + (@var - 20px)); // calc(50% + (25vh - 20px))
```

### 转义（Escaping）

```css
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

### 函数（Functions）

```css
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

### 命名空间和访问符

```css
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab {
    ...;
  }
  .citation {
    ...;
  }
}
```

现在，如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：

```css
#header a {
  color: orange;
  #bundle.button(); // 还可以书写为 #bundle > .button 形式
}
```

### 映射（Maps）

```css
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

### 作用域（Scope）

```css
/* 在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。 */
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

### 注释（Comments）

```css
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```

### 导入（Importing）

```css
@import "library"; // library.less
@import "typo.css";
```
