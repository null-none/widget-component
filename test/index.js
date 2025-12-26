const { JSDOM } = require("jsdom");

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

var should = require("chai").should(),
  app = require("../html-component.js");

describe("Basic tests", function () {
  HtmlElement = app.htmlComponent.HtmlElement;
  includeFileCSS = app.htmlComponent.includeFileCSS;
  includeFileJS = app.htmlComponent.includeFileJS;

  it("should exist HtmlElement", function () {
    should.exist(HtmlElement);
  });

  it("should exist includeFileCSS", function () {
    should.exist(includeFileCSS);
  });

  it("should exist includeFileJS", function () {
    should.exist(includeFileJS);
  });
});

describe("HtmlElement.create method:", function () {
  it("сreates HtmlElement by tag name", function () {
    const element = HtmlElement.create("div");
    should.exist(element);
  });

  it("creates HtmlElement by JSON", function () {
    const element = HtmlElement.create({
      type: "div",
      id: "test-div",
    });
    element.appendTo(document.body);
    should.exist(element);
  });

  it("creates HtmlElement by nodeType", function () {
    const existedElem = document.getElementById("test-div");
    const element = HtmlElement.create(existedElem);
    should.exist(element);
  });
});

describe('HtmlElement "get..." methods:', function () {
  it(".getById", function () {
    const element = HtmlElement.getById("test-div");
    should.exist(element);
  });

  it(".getBySelector", function () {
    const element = HtmlElement.getBySelector("#test-div");
    should.exist(element);
  });

  it(".getBySelectorAll", function () {
    const element = HtmlElement.getBySelectorAll("#test-div")[0];
    should.exist(element);
  });
});

describe("inserting HtmlElement in DOM:", function () {
  const element = HtmlElement.create({ type: "div", id: "parentDiv" });

  it(".appendTo(HtmlElement or domElement)", function () {
    element.appendTo(document.body);
    document.getElementById("parentDiv").should.exist;
  });

  it("this.append(htmlElement) - appending htmlElement to this", function () {
    const element_2 = HtmlElement.create({ type: "div", id: "childDiv_1" });
    element.append(element_2);
    document.querySelector("#parentDiv #childDiv_1").should.exist;
  });

  it(".prependTo(HtmlElement or domElement) - appending before first child", function () {
    const element_3 = HtmlElement.create({ type: "div", id: "childDiv_3" });
    element_3.prependTo(element);
    element.element.firstChild.id.should.equal("childDiv_3");
  });
});

describe("HtmlElement removing methods:", function () {
  it(".remove removes HtmlElement.element from DOM", function () {
    const element = HtmlElement.create({
      type: "div",
      id: "temp-div",
    });
    element.appendTo(document.body);
    element.remove();
    should.not.exist(document.getElementById("temp-div"));
  });

  it(".destroy removes element from DOM and clears references", function () {
    const element = HtmlElement.create({
      type: "div",
      id: "temp-div",
    });
    element.appendTo(document.body);
    element.destroy();

    should.not.exist(document.getElementById("temp-div"));
    should.not.exist(element?.bindValue);
  });
});

describe("HtmlElement managing attributes:", function () {
  describe("classes:", function () {
    it(".addClass", function () {
      const element = HtmlElement.getById("test-div");
      element.addClass("class_1");
      element.element.classList.contains("class_1").should.be.true;
    });
    it(".removeClass", function () {
      const element = HtmlElement.getById("test-div");
      element.removeClass("class_1");
      element.element.classList.contains("class_1").should.not.be.true;
    });
    it(".addClasses", function () {
      const element = HtmlElement.getById("test-div");
      element.addClasses("class_1", "class_2");
      (
        element.element.classList.contains("class_1") &&
        element.element.classList.contains("class_2")
      ).should.be.true;
    });
  });

  describe("styles:", function () {
    it(".setStyle({display: 'block', ...})", function () {
      const element = HtmlElement.getById("test-div");
      element.setStyle({
        "border-width": "5px",
        position: "absolute",
      });

      element.element.style.position.should.equal("absolute");
      element.element.style.borderWidth.should.equal("5px");
    });
  });

  describe("other attributes:", function () {
    it(".addId", function () {
      const element = HtmlElement.create("div");
      element.appendTo(document.body);
      element.addId("test-div-2");
      should.exist(document.getElementById("test-div-2"));
    });

    it(".setValue sets value, textContent or checked depending on element type", function () {
      const element = HtmlElement.getById("test-div");
      element.setValue("test_value");
      element.element.textContent.should.equal("test_value");

      const element_2 = HtmlElement.create({
        type: "input",
        id: "elem_2",
      }).appendTo(document.body);
      element_2.setValue("test_value");
      element_2.element.value.should.equal("test_value");

      const element_3 = HtmlElement.create({
        type: "input",
        id: "elem_3",
        attrs: {
          type: "checkbox",
        },
      }).appendTo(document.body);
      element_3.setValue("checked");
      element_3.element.checked.should.be.true;
    });

    it(".getValue gets value, textContent or checked depending on element type", function () {
      const element = HtmlElement.getById("test-div");
      element.getValue().should.equal("test_value");
      const element_2 = HtmlElement.getById("elem_2");
      element_2.getValue().should.equal("test_value");
      const element_3 = HtmlElement.getById("elem_3");
      element_3.getValue().should.equal(true);
    });

    it(".setAttr (any other attributes)", function () {
      const element = HtmlElement.getById("test-div");
      element.setAttr("data-attr", "some_data");
      element.element.getAttribute("data-attr").should.equal("some_data");
    });
  });
});

describe("HtmlElement managing events:", function () {
  const element = HtmlElement.create({
    type: "button",
    id: "test-events",
  });
  const myFunc = function () {
    element.setValue("event-test-1");
  };
  const event = new window.Event("click", {
    bubbles: true,
    cancelable: true,
  });

  it(".addEventListener(event, callback)", function () {
    element.addEventListener("click", myFunc);
    element.element.dispatchEvent(event);
    element.getValue().should.equal("event-test-1");
  });

  it(".removeEventListener(event, callback)", function () {
    element.removeEventListener("click", myFunc);
    element.setValue("not event-test-1");
    element.element.dispatchEvent(event);
    element.getValue().should.not.equal("event-test-1");
  });
});

describe("HtmlElement managing children:", function () {
  it(".addChild", function () {
    const element = HtmlElement.getById("test-div");
    element.addChild({ type: "div", id: "first-child" });
    document.querySelector("#test-div #first-child").should.exist;
  });

  it(".addAndReturnChild add child and return reference on it", function () {
    const element = HtmlElement.getById("test-div");
    const childElement = element.addAndReturnChild({
      type: "div",
      id: "second-child",
    });
    childElement.element.id.should.equal("second-child");
  });

  it(".addChildren adds children using array of JSONs as the parameter", function () {
    const element = HtmlElement.getById("test-div");
    element.addChildren([
      { type: "div", id: "child-4" },
      { type: "div", id: "child-5" },
    ]);
    document.querySelector("#test-div #child-5").should.exist;
  });

  it(".getChild(selector) returns child by selector", function () {
    const element = HtmlElement.getById("test-div");
    element.getChild("#first-child").should.exist;
  });

  it(".removeChildren removing all children", function () {
    const element = HtmlElement.getById("test-div");
    element.removeChildren();
    const removedChild = document.querySelector("#test-div #child-5");
    should.not.exist(removedChild);
  });
});

describe("HtmlElement cloning:", function () {
  it(".clone(withEvents = false) cloning HtmlElement with or whithout events", function () {
    const element = HtmlElement.getById("test-div");
    const clone_1 = element.clone();
    clone_1.tagName.should.equal("DIV");
  });
});

describe("HtmlElement reactivity: value synchronization between elements", function () {
  const element = HtmlElement.create({
    type: "div",
    id: "source-div",
  }).appendTo(document.body);

  const element_client = HtmlElement.create({
    type: "div",
    id: "client-div",
  }).appendTo(document.body);

  const myFunc = function () {
    element.setValue("client-test-1");
  };
  const event = new window.Event("change", {
    bubbles: true,
    cancelable: true,
  });

  element.addEventListener("change", myFunc);

  it(".addClient(HtmlElement) - adding recipient HtmlElement", function () {
    element.addClient(element_client);
    element.element.dispatchEvent(event);

    element_client.getValue().should.equal("client-test-1");
  });

  it(".removeClient(HtmlElement)", function () {
    element.removeClient(element_client);
    element_client.setValue("new-value");
    element.element.dispatchEvent(event);

    element_client.getValue().should.not.equal("client-test-1");
  });

  it(".clearClients() remove all clients", function () {
    element.addClient(element_client);
    element.clearClients();
    element_client.setValue("new-value");
    element.element.dispatchEvent(event);

    element_client.getValue().should.not.equal("client-test-1");
  });
});
