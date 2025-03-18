# widget-component
Small DOM manipulation library.


```javascript
const taskListContainer = WidgetElement.create('div')
  .addId('task-list-container')
  .addClass('list-wrapper')
  .addChild({
    elem: 'ul',
    id: 'task-list',
    classes: [
        'list',
        'card-container',
    ],
});
taskListContainer.getChild('#task-list')
    .addChild({
       element: 'li',
        classes: [
          'task-list-item',
         'card',
        ],
        textContent: 'Task 1',
    })
    .addEventListener("click", (event) => {
        alert("Task 1");
    })
    .addChild({
        element: 'li',
        classes: [
            'task-list-item',
            'card',
        ],
        textContent: 'Task 2',
    })
    .addEventListener("click", (event) => {
        alert("Task 2");
    });


taskListContainer.appendTo(document.querySelector('body'));
```