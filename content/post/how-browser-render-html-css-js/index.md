---
title: "Unveiling the Magic: How Web Browsers Render HTML, CSS, and JavaScript"
description: In this article, we will take a deep dive into the fascinating world of web browser rendering. Discover the intricate process that unfolds behind the scenes as your browser transforms HTML, CSS, and JavaScript code into the interactive web pages we know and love.
date: 2023-07-21T22:46:51+05:30
image: how-browser-render.png
math:
license:
hidden: false
comments: true
draft: false
tags: ["html", "javascript", "browser", "css"]
categories: ["Javascript", "Browser", "HTML", "CSS"]
---

## Parsing HTML

The rendering process begins with the parsing of the HTML code received in the HTTP response. Parsing is the process of analyzing the HTML markup and creating a tree-like structure called the Document Object Model (DOM). The DOM represents the structure and content of the web page, with each HTML element being represented as a node in the tree.
The parsing process includes the following steps:

1. **Tokenization**: The HTML code is broken down into tokens, such as tags, attributes, and text content.

2. **Lexing**: The tokens are converted into objects with additional information, like tag type and attributes.

3. **DOM Tree Construction**: The browser builds the DOM tree by arranging the objects in a hierarchical manner based on their nesting relationships.

Consider the following example HTML file named "index.html":

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Rendering Example</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a simple example of the rendering process.</p>
  </body>
</html>
```

When the browser receives this HTML file, it starts the parsing process and constructs the DOM tree. The resulting DOM tree will look like this: Just look at the tree.

```lua
Document
|
|-- html
|   |
|   |-- head
|   |   |
|   |   |-- title
|   |   |   |
|   |   |   |-- "Rendering Example"
|   |
|   |-- body
|       |
|       |-- h1
|       |   |
|       |   |-- "Hello, World!"
|       |
|       |-- p
|           |
|           |-- "This is a simple example of the rendering process."
|

```

## CSS Parsing and Styling

Once the browser constructs the DOM tree, it proceeds to parse and apply CSS styles to the elements. CSS parsing involves analyzing the CSS code received in the HTTP response and creating a data structure called the CSS Object Model (CSSOM). The CSSOM contains information about CSS rules and their specificity, inheritance, and other properties.
The styling process includes the following steps:

1. **Matching**: The browser matches each DOM node with the appropriate CSS rules based on selectors and specificity.
2. **Cascading**: The browser determines the final styles for each element by resolving conflicting CSS rules and handling inheritance.
3. **Style Calculations**: The browser computes the actual styles, such as colors, dimensions, and positions, for each element based on the matched CSS rules.

Let's add some CSS styles to the previous example. Create a file named "styles.css" with the following content:

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #336699;
}

p {
  font-size: 16px;
}
```

The browser will parse the CSS file and create the CSS Object Model (CSSOM). The styles will be applied to the corresponding elements in the DOM, resulting in the following styles:

The `body` will have a `font-family` of `Arial` or `sans-serif` and a background color of `#f0f0f0`.
The `h1` will have a `color` of `#336699.`
The `p` will have a `font-size` of `16px`.

### Layout
After the browser calculates the styles for all elements, it proceeds to the layout phase, also known as "CSS rendering" or "reflow." During this phase, the browser calculates the size and position of each element on the web page according to the box model defined by the CSS.
The layout process includes the following steps:

1. **Box Model**: Each element's size is calculated based on its content, padding, border, and margin specified in the CSS.
   
2. **Positioning**: The browser determines the positioning of each element relative to its parent and other elements on the page.
   
3. **Flow and Order**: Elements are arranged in the flow of the document according to the layout model defined by the display property (e.g., block, inline, flex, grid).

The layout process, also known as reflow in Firefox, is the browser's way of calculating the size and position of each visible element on the page. This process is based on the render tree and the CSS box model.

Here's a simplified example of how this might look in code:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        div {
            width: 50%;
            margin: 10px auto;
            padding: 20px;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <div>
        Hello, world!
    </div>
</body>
</html>
```

In this example, the browser would start by calculating the layout of the `body` element. Since it has no margins or padding, its size would be the same as the viewport size.

Next, the browser would calculate the layout of the `div` element. Its width would be 50% of the body's width, and it would be centered horizontally due to the `margin: auto` rule. The padding and border would be added to the width to calculate the total size of the box.

The layout process is recursive and continues in this way for each element in the render tree. The exact details of the layout process can vary depending on the CSS rules applied to each element.

It's important to note that the layout process can be quite expensive in terms of performance, especially for complex web pages with many elements. Therefore, browsers try to minimize the number of layouts they have to perform. For example, they might batch multiple changes together and perform a single layout at the end.

Also, it's worth mentioning that JavaScript can trigger a layout if it accesses certain properties that require layout information, such as `offsetWidth` or `offsetHeight`. This is known as forced synchronous layout, and it can be a performance bottleneck if not managed carefully.

Browsers use several strategies to minimize the number of layouts, also known as reflows, they have to perform. This is important because layouts can be computationally expensive and can lead to a slower, less responsive webpage. Here are some of the strategies:

1. **Batching changes**: Instead of making multiple changes to the DOM that could trigger multiple layouts, you can batch them together. 

```javascript
let elem = document.getElementById('myElement');

// Bad: This could cause two layouts if the browser doesn't batch the changes
elem.style.width = '100px';
elem.style.height = '100px';

// Better: This should only cause one layout
elem.style.cssText = 'width: 100px; height: 100px;';
```

2. **Avoiding forced synchronous layouts**: Reading certain properties can cause a layout. Try to avoid interspersing these with style changes.

```javascript
let elem = document.getElementById('myElement');

// Bad: This causes a forced synchronous layout
elem.style.width = '100px';
let width = elem.offsetWidth; // Reading this property forces a layout
elem.style.height = '100px';

// Better: Avoid forced synchronous layout by separating style changes and reads
elem.style.width = '100px';
elem.style.height = '100px';
let width = elem.offsetWidth; // Now it's OK to read this property
```

3. **Using layers**: Browsers can create separate layers for certain elements, especially those with complex styles like shadows or 3D transforms, or those that are frequently changing, like animations. Each layer can be laid out independently, which can reduce the overall number of layouts.


4. **Optimizing for common cases**: Some style changes don't affect layout. You can make these changes freely without worrying about causing a layout.

```javascript
let elem = document.getElementById('myElement');

// This doesn't cause a layout because it doesn't affect the box model
elem.style.color = 'blue';
```

5. **Async layout**: This is more of a browser implementation detail and not something you can control with code. However, you can help the browser by writing your code in a way that allows for more efficient layouts. For example, avoid deep nesting of elements, as this can make the layout process more complex.

6. **Layout throttling**: Browsers limit the frequency of layouts to a certain rate, typically matching the screen refresh rate (usually 60 times per second). This is known as layout throttling. It ensures that the browser doesn't spend too much time performing layouts and can keep up with other tasks, like handling user input or executing JavaScript.

Remember, these are just guidelines and the exact behavior can vary between different browsers and versions. Always test your webpage in multiple browsers to ensure it performs well.

### Paint

After the layout phase, the browser proceeds to the Paint or rendering phase. During this step, the browser traverses the DOM tree and paints each element on the screen based on its calculated size, position, and style.
The rendering process includes the following steps:

1. **Rasterization**: The browser converts the vector representation of each element into pixels for display on the screen.
2. **Compositing**: The browser combines the individual elements' rasterized layers to form the final visual representation of the web page.
3. **Display**: The composed image is then displayed on the user's screen, rendering the entire web page visible to the user.

## Javascript Execution

If the web page contains JavaScript code, the browser executes it during the rendering process. JavaScript can interact with the DOM, modify CSS styles, create dynamic content, and handle user interactions. JavaScript execution can trigger additional layout and rendering updates if it modifies the page's structure or styles.

For this example, let's add some JavaScript code to the HTML file. We'll add a simple script that changes the color of the `<h1>` element when the page is loaded:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Rendering Example</title>
</head>
<body>
    <h1 id="greeting">Hello, World!</h1>
    <p>This is a simple example of the rendering process.</p>

    <script>
        window.onload = function () {
            var heading = document.getElementById("greeting");
            heading.style.color = "red";
        };
    </script>
</body>
</html>

```

When the browser executes this JavaScript code, it will change the color of the `<h1>` element to red. This change will trigger additional layout and rendering updates, ensuring that the updated style is reflected on the screen.

When a web page is loading, and the browser encounters JavaScript code, it executes the JavaScript in a few different ways, depending on where the script is located and how it's referenced. Here's an overview of how browsers execute JavaScript during page loading:

1. **Synchronous JavaScript Execution:**

When the browser encounters a `<script>` tag in the HTML document without the `async` or `defer` attributes, it loads and executes the JavaScript code synchronously, meaning the code is executed immediately, and the browser halts parsing and rendering until the script has been executed completely.

Example of synchronous JavaScript:

```html
<script src="your-script.js"></script>
```

In this case, the browser fetches the "your-script.js" file and executes its code in order. If the script is large or takes a significant amount of time to run, it may delay the page loading and rendering, leading to slower perceived performance.

2. **Asynchronous JavaScript Execution:**  
   
When the browser encounters a `<script>` tag with the `async` attribute, it loads the JavaScript file asynchronously. The script is downloaded in the background while the HTML parsing and rendering continue. Once the script is fetched, it is executed immediately, potentially before the entire HTML page has finished loading.

Example of asynchronous JavaScript:

```html
<script src="your-script.js" async></script>
```

Asynchronous JavaScript is useful for non-blocking scripts that don't rely on the DOM being fully parsed or the page is completely loaded. However, the execution order of multiple asynchronous scripts is not guaranteed, which can lead to potential issues if scripts depend on each other.

3. **Deferred JavaScript Execution:**
   
When the browser encounters a `<script>` tag with the `defer` attribute, it also loads the script asynchronously. However, deferred scripts are guaranteed to execute in the order they appear in the HTML document, but only after the entire HTML document has been parsed.

Example of deferred JavaScript:

```html
<script src="your-script.js" defer></script>
```

Deferred JavaScript is particularly useful for scripts that need access to the fully parsed DOM or need to manipulate elements on the page. Since deferred scripts execute in order and after the page is parsed, they won't block the rendering process, leading to improved perceived page load speed.

By executing JavaScript in different ways, browsers can manage the loading and execution of scripts more efficiently, preventing them from blocking other critical resources and improving the overall performance and user experience of web pages. As a best practice, it's essential to use asynchronous or deferred JavaScript loading for non-essential scripts and place critical scripts near the end of the HTML document to ensure faster page rendering.

## Asynchronous Loading and Rendering Continuity:
During the rendering process, the browser may also asynchronously load additional resources, such as images, scripts, and stylesheets. Asynchronous loading allows the browser to continue rendering and displaying the page while fetching these additional resources in the background. This approach helps improve the perceived performance of the web page by reducing loading times.

## Conclusion
Overall, the rendering process in a web browser involves parsing the HTML and CSS, constructing the DOM and CSSOM, calculating styles and layout, painting elements on the screen, executing JavaScript, and continuously updating the display in response to user interactions and dynamic changes. This combination of steps creates a visual representation of a web page that users can interact with and enjoy.




