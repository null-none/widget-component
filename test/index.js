const { JSDOM } = require("jsdom");

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

var should = require("chai").should(),
    app = require("../html-component.js");


describe("tests", function () {
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

    it("should create HtmlElement", function () {
        var element = new HtmlElement('div', { id: 'test-div' });
        should.exist(element);
    });
});