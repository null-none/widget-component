# widget-component
Small DOM manipulation library.


```javascript
const taskListContainer = HtmlElement.create('div')
    .addId('task-list-container')
    .addClass('list-wrapper')
    .addChild({
        elem: 'input',
        id: 'search-input',
        type: 'change',
        callback: function (event) {
            console.log(event.target.value);
        }
    })
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
        elem: 'li',
        id: 'task-1',
        classes: [
            'task-list-item',
            'card',
        ],
        textContent: 'Task 1',
        type: 'click',
        callback: function () {
            alert('Click event on Task 1');
        }
    }).
    addChild(
        {
            elem: 'li',
            id: 'task-2',
            classes: [
                'task-list-item',
                'card',
            ],
            type: 'click',
            textContent: 'Task 2',
            callback: function () {
                alert('Click event on Task 1');
            }
        });
taskListContainer.appendTo(document.querySelector('body'));
```