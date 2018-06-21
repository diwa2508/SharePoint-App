'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    let clientContext = SP.ClientContext.get_current();
    let questions =[],options=[];
    let timeOut =1000,currenTime =0;
    $(document).ready(function () {
        try {
            questions = new questionMaster(clientContext);            
            option = new options(clientContext);
            promise();
        }
        catch (ex) {
            alert('Error' + ex.message);
        }
    });

}
function promise(){
    if((questions.length && options.length) >=1){
        //build the HTML
        new Survey();
    }
    else if(currenTime < timeOut){
        currenTime += 100;
        setInterval(promise,100);
    }
    else{
        alert('Failed to load Questions');
    }

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
