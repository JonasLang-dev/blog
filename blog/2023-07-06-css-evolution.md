---
slug: css_evolution
title: History of CSS evolution
authors: jonas
tags: [css, css-in-js, css-module]
---

## CSS development process

There are three treasures (JS, Html, CSS) on the front end. The full name of CSS is Cascading Style Sheets, which is translated into cascading style sheets. As the name suggests, it is used to describe the presentation of documents such as HTML or XML. Style sheet language. CSS describes how elements should be rendered.

The CSS version has also been iterated. After CSS1, CSS2.1, and after 2.1, the specified range of the specification has continued to increase. Although there is no version number iteration, it is still being updated.

With the gradual development of today's front-end engineering, many shortcomings of CSS are also increasingly exposed (mainly CSS files are often filled with a large number of repeated definitions, as the project becomes more and more complex, writing is difficult to organize, the amount of code is huge, and as the scale expands, It's getting harder to maintain):

1. Unable to customize variables;
2. Duplicate code - The CSS inheritance relationship can only be determined according to the hierarchical relationship. This inheritance relationship only includes father, son and descendants, and no kinship relationship cannot be inherited;
3. Scope - Because many attributes of CSS will be inherited to descendant elements, it will cause a lot of unnecessary pollution and conflicts.

## Modern CSS

### CSS preprocessor

Surrounding the shortcomings of CSS, CSS preprocessors such as CSS preprocessors, less scss, etc. have been derived. Add new features on the basis of the original CSS, and finally compile it into a CSS file.

Mainly improve and enhance into ability, reusability, maintainability and compatibility, etc.
Different precompilers may have different features, but the core is similar: nested styles, variables, mixin/inheritance, computing power, and modularization.

### CSS in Js

CSS-in-JS was proposed in 2014. JS can solve many "flaws" in CSS itself, such as global scope, dead code removal, effective order depends on loading order, constant sharing, etc. There are mainly styled-components and Emotion. The disadvantage mainly lies in the performance loss at runtime.

### Atomized

Today's popular Tailwind CSS is the representative. A popular solution for using pure CSS when CSS atomization

Atomization does not conflict with the first two

### CSS Module

Unlike transforming into a new language, this function is very simple, only adding local scope and module dependencies, which is also an urgently needed function in today's componentized development.
