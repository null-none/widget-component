## widget-component

Small DOM manipulation library.

### Example

```js

// You can create HtmlElement with its classes, styles, events etc.

const myDiv = HtmlElement.create({
    type: 'div',
    id: 'div_1',
    value: 'Sample div',
    classes: 'roundedBox smallShadow',
    styles: {
        background: "lawngreen",
    },
    events: {
      click: () => someFunc(),
    }
});

// Append it to an element on the page or another HtmlElement

myDiv.appendTo(document.body);
//or
myDiv.appendTo(someHtmlElement);


// Add children to it

myDiv.addChildren([{type:'input', id: 'myInput'},{type:'button', value:'press me', events: {click: someFunc_2}}]);

// Modify it as you like

myDiv.addClass('someClass')
     .setStyle({display: 'block'})
     .addListener('mouseenter', someFunc_3);

```
