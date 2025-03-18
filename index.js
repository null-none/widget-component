function HtmlElement(elem) {
    this.element = (elem instanceof HTMLElement) ? elem : document.createElement(elem);
};

HtmlElement.create = function(elem) {
    return new HtmlElement(elem);
};


HtmlElement.prototype.addId = function(id) {
    this.element.id = id || '';
    return this;
};

HtmlElement.prototype.addClass = function(className) {
    className && this.element.classList.add(className);
    return this;
};

HtmlElement.prototype.removeClass = function(className) {
    className && this.element.classList.remove(className);
    return this;
};

HtmlElement.prototype.addClasses = function(...classNames) {
    for (className of classNames) {
        this.addClass(className);
    }
    return this;
};

HtmlElement.prototype.setTextContent = function(text = '') {
    this.element.textContent = text;
    return this;
};

HtmlElement.prototype.addChild = function(args = {}) {
    const child = HtmlElement.create(args.elem)
      .addId(args.id)
      .addClasses(args.classes) // addClasses can take an array or a comma-separated list
      .setTextContent(args.textContent);
    if (args.type) {
        child.addListener(args.type, args.callback);
    }
    this.append(child);
    return this;
};

HtmlElement.prototype.addChildren = function(children = []) {
    for (child of children) {
        this.addChild(child);
    }
    return this;
};

HtmlElement.prototype.getChild = function(selector) {
    return new HtmlElement(this.element.querySelector(selector));
};

HtmlElement.prototype.append = function(htmlElement) {
    this.element.appendChild(htmlElement.element);
};

HtmlElement.prototype.appendTo = function(domElement) {
    domElement.appendChild(this.element);
};

HtmlElement.prototype.addListener = function(type, callback) {
    this.element.addEventListener(type, callback);
};
