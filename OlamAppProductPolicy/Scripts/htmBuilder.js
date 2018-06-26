"use strict";
//all functions will have the below parametters in the given order
// id,class,href,
//data-toggle,aria-haspopup,aria-expanded


function div(id,className,datatoggle){
    this.element;
    this.createDiv=function(id,className,datatoggle){
        let element = document.createElement('div');
        element.setAttribute('id',id);
        element.setAttribute('class',className);
        element.setAttribute('data-toggle',datatoggle);
        this.element = element;
    };
    this.createDiv(id,className,datatoggle);
}

function ul(className){
    this.element;
    this.createDiv=function(className){
        let element = document.createElement('ul');    
        element.setAttribute('class',className);
        this.element = element;
    };
    this.createDiv(className);
}

function li(className){
    this.element;
    this.createDiv=function(className){
        let element = document.createElement('li');
        element.setAttribute('class',className);
        this.element = element;
    };
    this.createDiv(className);
}
function a(id,className,href,datatoggle){
    this.element;
    this.createDiv=function(id,className,href,datatoggle){
        let element = document.createElement('li');
        element.setAttribute('class',className);
        element.setAttribute('id',id);
        element.setAttribute('href',href);
        element.setAttribute('data-toggle',datatoggle);
        this.element = element;
    };
    this.createDiv(id,className,href,datatoggle);
}