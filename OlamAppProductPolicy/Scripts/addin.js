'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    let clientContext = SP.ClientContext.get_current();
    $(document).ready(function () {
        try {
            let questions = new questionMaster(clientContext);            
            let option = new options(clientContext);
        }
        catch (ex) {
            alert('Error' + ex.message);
        }
    });

}

//Construct survey object
function pages() {
    this.pages = [];
}
function page(name) {
    this.name = name;
    this.elements = [];

}
function question(type, label, question, choices) {
    this.type = type;
    this.name = name;
    this.title = title;
    this.choices = [];
    switch (type) {
        case 'dropdown': this.choices.push(choice); break;
        default: break;
    }

}
function choices(choice) {
    this.choice.push(choice);
}
function choice(text, value) {
    this.text = text;
    this.value = value;
}
