# MiniFramework Documentation

## Introduction

MiniFramework is a lightweight JavaScript framework designed to simplify the process of creating dynamic web applications. It provides a set of tools and abstractions for common web development tasks, such as creating DOM elements, handling events, managing routes, and more. This documentation will guide you through the basic features of MiniFramework, including how to create elements, add events, nest elements, and add attributes to elements.

## Features

- **Abstracting the DOM Routing System**: Easily create and manipulate DOM elements with a simple API.
- **Event Handling**: Attach event listeners to elements with ease.
- **state Management**: Add attributes to elements in a straightforward manner.
- **Routing**: Simplify the process of managing routes in your application.



## Creating an Element

To create a DOM element, you can use the `createDomElement` method. This method takes an object that describes the element you want to create, including its tag name, attributes, event listeners, and children.

```javascript
const miniFramework = new MiniFramework();

const divElement = miniFramework.createDomElement({
 tag: 'div',
 attrs: {
    class: 'my-class',
    id: 'my-id'
 },
 children: ['Hello, World!']
});

document.body.appendChild(divElement);
```

In this example, a `div` element is created with the class `my-class` and the id `my-id`. The text content of the `div` is set to "Hello, World!".



### Nesting Elements

To nest elements, you can include them in the `children` array of the parent element. This allows you to create complex DOM structures with ease.

```javascript
const miniFramework = new MiniFramework();

const nestedElement = miniFramework.createDomElement({
 tag: 'div',
 children: [
    {
      tag: 'p',
      children: ['This is a paragraph.']
    },
    {
      tag: 'button',
      children: ['Click me']
    }
 ]
});

document.body.appendChild(nestedElement);
```

In this example, a `div` element contains a `p` element and a `button` element. The `p` element displays the text "This is a paragraph.", and the `button` element displays the text "Click me".

### Adding Attributes to an Element

To add attributes to an element, you can include them in the `attrs` object of the element description.

```javascript
const miniFramework = new MiniFramework();

const inputElement = miniFramework.createDomElement({
 tag: 'input',
 attrs: {
    type: 'text',
    placeholder: 'Enter your name'
 }
});

document.body.appendChild(inputElement);
```

In this example, an `input` element is created with the type `text` and a placeholder text "Enter your name".

### Adding an Event

To add an event listener to an element, you can use the `eventListener` method. This method takes an element, an event name, a callback function, and an optional options object.

```javascript
const miniFramework = new MiniFramework();

const buttonElement = miniFramework.createDomElement({
 tag: 'button',
 children: ['Click me']
});

miniFramework.eventListener(buttonElement, 'click', () => {
 console.log('Button clicked!');
});

document.body.appendChild(buttonElement);
```

In this example, a `click` event listener is added to a `button` element. When the button is clicked, "Button clicked!" is logged to the console.


## Routing

MiniFramework provides a simple API for managing routes in your application. You can use the `navigate` method to change the current route and execute a callback function.

```javascript
const miniFramework = new MiniFramework();

miniFramework.navigate('/new-route', () => {
 console.log('Navigated to new route');
});
```

In this example, the application navigates to "/new-route" and logs "Navigated to new route" to the console.

Certainly! Here's a documentation snippet for the `customBind` method, similar to the routing example you provided:

## customBind

MiniFramework provides a utility function for binding context to callback functions. This is particularly useful when you need to ensure that a function has the correct `this` context when it is called.

#### Usage

To use `customBind`, you pass in the function you want to bind and the context you want to bind it to. The method returns a new function that, when called, will execute the original function with the specified context.

#### Example

```javascript
const miniFramework = new MiniFramework();

// Define an object with a method
const myObject = {
 name: 'Alice',
 greet: function() {
    console.log(`Hello, ${this.name}!`);
 }
};

// Create a button element
const button = miniFramework.createDomElement({
 tag: 'button',
 children: ['Click me']
});

// Bind the greet method of myObject to the button's click event
miniFramework.eventListener(button, 'click', miniFramework.customBind(myObject.greet, myObject));

// Append the button to the document body
document.body.appendChild(button);
```

In this example, the `greet` method of `myObject` is bound to the `click` event of a `button` element using `customBind`. When the button is clicked, the `greet` method is called with `this` set to `myObject`, allowing it to access the `name` property of `myObject`. This ensures that the correct context is maintained when the method is executed as a result of the event.

## Why MiniFramework Works the Way It Does

MiniFramework is designed to be simple and intuitive, making it easy for developers to create dynamic web applications without needing to dive deep into the complexities of the DOM API. By providing a straightforward API for common tasks, MiniFramework allows developers to focus on the logic of their applications rather than the intricacies of the web platform.

The framework is built around the concept of creating and manipulating DOM elements in a declarative manner, similar to how you might define components in other frameworks. This approach makes it easier to reason about your application's structure and behavior, as the code closely mirrors the structure of the UI.

By providing abstractions for common tasks such as event handling and routing, MiniFramework aims to reduce the amount of boilerplate code developers need to write, allowing them to focus on the unique aspects of their applications.