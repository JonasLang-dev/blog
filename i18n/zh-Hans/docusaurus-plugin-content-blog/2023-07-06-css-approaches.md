---
slug: css-modules-vs-css-in-js-vs-atomic-css
title: CSS Modules vs CSS-in-JS vs Atomic CSS
authors: jonas
tags: [css, CSS-in-JS, CSS Modules CSS]
---

## CSS Modules vs CSS-in-JS vs Atomic CSS

在这篇博客中我想介绍在前端中不同的使用 CSS 的方法。绝大多数情况下，都是决定基于开发者的偏好，但是我们也需要考虑项目类型，开发人员，团队经验和工作流程。例如，后端或全栈在 CSS 开发方面没有太多经验。

我将围绕在 React 中分别介绍三种流行方案：模块化 CSS(CSS Module)、CSS-in-JS、原子化 CSS(Atomic CSS)。由于业务场景多种多样，我不可能告诉你什么是最佳的方案，但是我想带你从不同的视角了解他们，希望有助于你选择。

## CSS Module

在我最开始使用 React 开发的时候，最流行的解决方案是 Sass/Less 配合 BEM 命名方法。CSS 最初并不是为了 Single Application Page(SPA)单独设计的，不支持变量、嵌套。但是在那个时候 Sass/Less 是当时最好的选择。但是自从 SPA 流行起来，我们对实现 Web 程序样式的要求也发生了变化。

当我的一个 React 项目中需要进行大量布局修改的时候，我的 Less 代码将会很混乱。即使在今天，我在使用 Less 进行样式设置的时候依然有同样的问题。将 Less 和 BEM 或类似方法结合一起使用的时候，开发人员需要有 CSS 经验，并遵守相应规范以保持样式布局实现的可维护性和一致性。

> BEM 规范

```css
.block {
}

.block__element {
}

.block--modifier {
}
```

> 每一个块(block)名应该有一个命名空间（前缀）

- block 代表了更高级别的抽象或组件。
- block\_\_element 代表 .block 的后代，用于形成一个完整的 .block 的整体。
- block--modifier 代表 .block 的不同状态或不同版本。
- 使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。

React、Vue 项目中 CSS 常见的问题之一是组件导入 css 代码被**全局引用**，导致响应冲突 CSS Modules。使用命名空间和访问符进行限制。

Less 示例代码：

```css
@width: 10px;

.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

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
    .bordered();
  }
  .citation {
    width: @width;
  }
}
```

如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：

```css
#header a {
  color: orange;
  #bundle.button(); // 还可以书写为 #bundle > .button 形式
}
```

我将 Less 配合 BEM 使用归入 CSS Modules 的原因，他们本质都是在解决全局命名空间的相同问题。

这种方法仍然有效，但是如果开发人员没有**相关 CSS 开发经验**，很容易出各种问题。在简单项目中维护 CSS 也相对容易，即使大公司：阿里，Facebook...的工程师也在维护他们的 CSS 代码库。

使用 CSS module 作为样式开发方法，建议满足以下条件:

1. 使用 CSS 编码规范
2. 了解 BEM 规范
3. 开发团队具备 CSS 开发经验

## CSS in JS

后来，出现一种新的方法 CSS-in-JS，现在依然流行。我第一次使用的时候，在没有任何学习曲线的情况下，便能写出易于维护的代码。即使没有任何前端开发经验的后端开发人员也可以实现可维护的布局。这种方式的好处之一便是通过 props 实现动态样式，并且易于 Typescript 集成。

```ts
import styled from "@emotion/styled/macro";

import { theme } from "../../../styles/theme";

const { sizes, colors } = theme;

type Side = "bottom" | "left" | "right" | "top";

interface ArrowProps {
  arrowX: number;
  arrowY: number;
  staticSide: Side;
}

const gapFromAnchorElement = 4;

export const Arrow = styled.div<ArrowProps>`
  position: absolute;
  pointer-events: none;

  left: ${({ arrowX }) => `${arrowX}px`};
  top: ${({ arrowY }) => `${arrowY}px`};
  ${({ staticSide }) => ({
    [staticSide]: `-${sizes.gap - gapFromAnchorElement - 2}px`,
    ...(staticSide === "left" || staticSide === "right"
      ? {
          borderTop: `${sizes.gap - gapFromAnchorElement}px solid transparent`,
          borderBottom: `${
            sizes.gap - gapFromAnchorElement
          }px solid transparent`,
        }
      : {}),
    ...(staticSide === "left"
      ? {
          borderRight: `${sizes.gap - gapFromAnchorElement}px solid ${
            colors.White
          };`,
        }
      : {}),
    ...(staticSide === "right"
      ? {
          borderLeft: `${sizes.gap - gapFromAnchorElement}px solid ${
            colors.White
          };`,
        }
      : {}),
  })};
`;
```

此方法存在两个问题:

1. 即使再简单的样式也需要很多重复的模板代码。这种方法会导致生产率下降
2. SEO 优化不是很好的选择。大多数 CSS-in-JS 库在运行时将生成的样式表注入倒文档头部的末尾。他们无法将样式提取到 css 文件中。无法缓存 CSS。有人试图用[Linaria](https://github.com/callstack/linaria)来解决这个问题。但无法进一步优化，如内联关键 CSS 和 lazy loading。由于这个问题, CSS-in-JS 对于需要优化 First Contentful Paint 和 SEO 性能指标的项目来说，并不是明智的选择。例如在 E-Commerce Next.js 项目中使用 CSS-in-JS。

另外一方面，CSS-in-JS 对于需要深度 Typescript 集成且 SEO 性能指标无关紧要的项目来说是不错的选择。企业或者面向数据的项目非常合适，因为它们需要 Typescript 集成，而且不关心缓存 CSS 和 SEO 性能指标，同时也适用于 React Native。

> 简单的 CSS-in-JS 组件示例(emotion js)

```tsx
import styled from "@emotion/styled";

const Button = styled("button")`
  padding: 20px;
  background-color: ${(props) => props.theme.someLibProperty};
  border-radius: 3px;
`;

export default Button;
```

```ts
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends Record<string, any> {}
}
```

## 原子化 CSS

然后，又出现了一个非常流行的方案，称为原子化。 样式开发维护非常容易，且无需任何学习曲线。与 CSS-in-JS 相比，它的优点是显著提升了生产力。缺点也很明显，代码可读性较差，这也是许多开发人员不喜欢这种方法的关键原因。

```tsx
import { ICard, SearchItemStatus } from "../SearchResults";

export function ResultCard({
  title,
  snippet,
  url,
  status,
  isFocused,
}: ICard & {
  isFocused: boolean;
}) {
  const cardColor =
    status === SearchItemStatus.ACCEPTED
      ? "bg-green-100 border-green-300"
      : status === SearchItemStatus.REFUSED
      ? "bg-yellow-100 border-yellow-300"
      : status === SearchItemStatus.BANNED
      ? "bg-red-100 border-red-300"
      : "bg-white border-gray-200";

  return (
    <div
      className={`flex justify-start items-center ${cardColor} rounded-md border py-7 px-7 ${
        isFocused ? "outline-blue" : ""
      }`}>
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-1 text-sm text-left">
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
        <div className="mb-1 text-lg text-blue-700">{title}</div>
        <p className="text-sm text-left">{snippet}</p>
      </div>
    </div>
  );
}
```

最流行的原子化 CSS 框架是 Tailwind，它有预配置涉及系统和主题配置，可根据需求进行自定义。

## 结论

在这篇博客中，我讲了在项目中使用 CSS Modules、CSS-in-JS 和原子化 CSS 的优缺点。如果在 React 中需要配合 Typescript 并在项目中需要着重需要定义组件特定类型。甚至更进一步在 React Native 项目中，CSS-in-JS 就是最佳选择。
但是如果在 CSS Module 和原子化 CSS 之前做选择就需要多方面考虑了。需要从团队 CSS 开发经验，以及可以从原子化 CSS 框架(例如 Tailwind 中)受益等多方面考虑。
