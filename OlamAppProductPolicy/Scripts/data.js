"use strict";
function questionMaster(clientContext) {
    this.questionMasterList = [];
    this.clientContext = clientContext;
    this.loadQuestionMaster = function () {
        let list = this.clientContext.get_web().get_lists().getByTitle("QuestionMaster");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        this.clientContext.load(listItems);
        this.clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
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
            optionObj = new options(this.clientContext);
        },
        OnQueryError);
    };
    this.loadQuestionMaster();
}
function options(clientContext) {
    this.optionsMasterList = [];
    this.clientContext = clientContext;
    this.loadOptions = function () {
        let list = this.clientContext.get_web().get_lists().getByTitle("Options");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        this.clientContext.load(listItems);
        this.clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
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
            this.optionsMasterList = objArray;
            answerTypeObj = new answerTypeMaster(this.clientContext);
        },
        OnQueryError);
    };
    this.loadOptions();
}
function answerTypeMaster(clientContext) {
    this.answerTypeList = [];
    this.clientContext = clientContext;
    this.loadAnswerType = function () {
        let list = this.clientContext.get_web().get_lists().getByTitle("AnswerTypeMaster");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        this.clientContext.load(listItems);
        this.clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
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
            questionnaireObj = new questionnaireSet(this.clientContext);
        },
        OnQueryError);
    };
    this.loadAnswerType();
}
function questionnaireSet(clientContext) {
    this.questionnaireTypeList = [];
    this.clientContext = clientContext;
    this.loadQuestionnaireType = function () {
        let list = clientContext.get_web().get_lists().getByTitle("QuestionnaireSet");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        this.clientContext.load(listItems);
        this.clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
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
            constructHTML();
        },
        OnQueryError);
    };
    this.loadQuestionnaireType();
}
