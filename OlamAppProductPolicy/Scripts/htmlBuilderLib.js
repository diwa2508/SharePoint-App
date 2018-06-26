"use strict";

//all functions will have the below parametters in the given order
//id,class,href,
//data-toggle,aria-haspopup,aria-expanded

function div(id, className, datatoggle) {
    this.element;
    this.id = id;
    this.className = className;
    this.datatoggle = datatoggle;
    this.createDiv = function () {
        let element = document.createElement("div");
        element.setAttribute("id", this.id);
        element.setAttribute("class", this.className);
        element.setAttribute("data-toggle", this.datatoggle);
        this.element = element;
    };
    this.createDiv();
}
function ul(className) {
    this.element;
    this.className = className;
    this.createUl = function () {
        let element = document.createElement("ul");
        element.setAttribute("class", this.className);
        this.element = element;
    };
    this.createUl();
}
function li(className) {
    this.element;
    this.className = className;
    this.createLi = function () {
        let element = document.createElement("li");
        element.setAttribute("class", this.className);
        this.element = element;
    };
    this.createLi();
}
function aTag(id, className, href, datatoggle) {
    this.element;
    this.id = id;
    this.className = className;
    this.datatoggle = datatoggle;
    this.href = href;
    this.createA = function () {
        let element = document.createElement("a");
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.id);
        element.setAttribute("href", this.href);
        element.setAttribute("data-toggle", this.datatoggle);
        this.element = element;
    };
    this.createA();
}

function span(id, className) {
    this.element;
    this.id = id;
    this.className = className;
    this.createSpan = function () {
        let element = document.createElement("span");
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.id);
        this.element = element;
    };
    this.createSpan();
}

function header(id,className,size) {
    this.element;
    this.id = id;
    this.size = size;
    this.className = className;
    this.createH = function () {
        let element = document.createElement("h"+this.size);
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.id);
        this.element = element;
    };
    this.createH();
}

function button(id, className,dataToggle,isDDBtn) {
    this.element;
    this.isDDBtn = isDDBtn;
    this.id = id;
    this.className = className;
    this.datatoggle = dataToggle;
    this.createButton= function () {
        let element = document.createElement("button");
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.id);
        element.setAttribute("type", "button");
        if (this.isDDBtn) {
            element.setAttribute("data-toggle", this.datatoggle);
            element.setAttribute("aria-haspopup", "true");
            element.setAttribute("aria-expanded", "flase");
        }
        this.element = element;
    };
    this.createButton();
}
function input(id,className,type) {
    this.element;
    this.id = id;
    this.className = className;
    this.type = type;
    this.createInput = function () {
        let element = document.createElement("input");
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.id);
        element.setAttribute("type", this.type);        
        this.element = element;
    };
    this.createInput();
}