"use strict";
function fetchList(clientContext, listTitle) {
    let list = clientContext.get_web().get_lists().getByTitle(listTitle);
    let camlQuery = new SP.CamlQuery();
    let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
    camlQuery.set_viewXml(queryString);
    let listItems = list.getItems(camlQuery);
    clientContext.load(listItems);
    clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
            let listObj;
            switch (listTitle) {
                case "QuestionMaster":
                    listObj = new questionMaster(listItemEnumerator);
                    return listObj.questionMasterList;
                case "AnswertTypeMaster":
                    listObj = new answerTypeMaster(listItemEnumerator);
                    return listObj.answerTypeList;
                case "Options":
                    listObj = new options(listItemEnumerator);
                    return listObj.optionsList;
                case "QuestionnaireSet":
                    listObj = new questionnaireSet(listItemEnumerator);
                    return listObj.questionnaireTypeList;
                default: throw new Error("some error occurred");
            }
        },
        OnQueryError);
}


//List objects
function questionMaster(listItemEnumerator) {
    this.questionMasterList = [];
    this.loadQuestionMaster = function (listItemEnumerator) {
        let objArray = [];
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let obj = {
                id: oListItem.get_id(),
                question: oListItem.get_item("Question"),
                answerTypeID: oListItem.get_item("AnswerTypeID").get_lookupValue(),
                questionnaireSetID: oListItem.get_item("QuestionnaireSet").get_lookupValue(),
                isRequired: oListItem.get_item("IsRequired"),
                validation: oListItem.get_item("Validation"),
                optionGroupID: (oListItem.get_item("OptionGroupID") !== null) ? oListItem.get_item("OptionGroupID").get_lookupValue() : ""
            };
            objArray.push(obj);
        }
        this.questionMasterList = objArray;
    };
    this.loadQuestionMaster(listItemEnumerator);
}
function options() {
    this.optionsList = [];
    this.loadOptions = function (listItemEnumerator) {
        let objArray = [];
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let obj = {
                id: oListItem.get_id(),
                choice: oListItem.get_item("Choice"),
                optionGroupID: oListItem.get_item("OptionGroupID").get_lookupValue()
            };
            objArray.push(obj);
        }
        this.optionsList = objArray;
    };
    this.loadOptions(listItemEnumerator);
}
function answerTypeMaster() {
    this.answerTypeList = [];
    this.loadAnswerType = function (listItemEnumerator) {
        let objArray = [];
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let obj = {
                id: oListItem.get_id(),
                answerType: oListItem.get_item("AnswerType")
            };
            objArray.push(obj);
        }
        this.answerTypeList = objArray;
    };
    this.loadAnswerType(listItemEnumerator);
}
function questionnaireSet() {
    this.questionnaireTypeList = [];
    this.loadQuestionnaireType = function (listItemEnumerator) {
        let objArray = [];
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let obj = {
                id: oListItem.get_id(),
                questionnaireType: oListItem.get_item("QuestionnaireType")
            };
            objArray.push(obj);
        }
        this.questionnaireTypeList = objArray;
    };
    this.loadQuestionnaireType(listItemEnumerator);
}