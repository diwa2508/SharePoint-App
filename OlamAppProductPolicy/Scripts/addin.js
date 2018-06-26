"use strict";
let questionObj, optionObj, answerTypeObj, questionnaireObj, userObj;
ExecuteOrDelayUntilScriptLoaded(spInitialize, "sp.js");
//function spInitialize() {
//    SP.SOD.executeFunc("SP.js", "SP.ClientContext", function () {
//        SP.SOD.executeFunc("userprofile", "SP.UserProfiles.PeopleManager", function () {
//            initializePage();
//        });
//    });
//}
function spInitialize() {
    let clientContext = SP.ClientContext.get_current();
    // let peopleManager = new SP.UserProfiles.PeopleManager(clientContext);

    //export let questionLst = [], optionLst = [], answerTypeLst = [], questionnaireLst = [];
    let timeOut = 50, currentTime = 0;
    $(document).ready(function () {
        try {
            loadAlltheLists(clientContext);
        }
        catch (ex) {
            alert("Error" + ex.message);
        }
    });

    function loadAlltheLists(clientContext) {
        questionObj = new questionMaster(clientContext);
        return false;
    }
}

function constructHTML() {
    new buildSurvey(
                   questionObj.questionMasterList,
                   optionObj.optionsMasterList,
                   answerTypeObj.answerTypeList,
                   questionnaireObj.questionnaireTypeList,
                   document.getElementById("questionsContainer")
                   );

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
        case "dropdown": this.choices.push(choice); break;
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
