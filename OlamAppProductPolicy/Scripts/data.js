function questionMaster() {
    this.questionMasterList = [];
    this.loadQuestionMaster = function (clientContext) {
        let list = clientContext.get_web().get_lists().getByTitle("QuestionMaster");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        clientContext.load(listItems);
        clientContext.executeQueryAsync(
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
                }
                objArray.push(obj);
            }
            this.questionMasterList = objArray;
        },
        OnQueryError);
    };
    this.loadQuestionMaster(clientContext);
}
function options() {
    this.optionsList = [];
    this.loadOptions = function (clientContext) {
        let list = clientContext.get_web().get_lists().getByTitle("Options");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        clientContext.load(listItems);
        clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
            let objArray = [];
            while (listItemEnumerator.moveNext()) {
                let oListItem = listItemEnumerator.get_current();
                let obj = {
                    id: oListItem.get_id(),
                    choice: oListItem.get_item("Choice"),
                    optionGroupID: oListItem.get_item("OptionGroupID").get_lookupValue()
                }
                objArray.push(obj);
            }
            this.optionsList = objArray;
        },
        OnQueryError);
    };
    this.loadOptions(clientContext);
}
function answerTypeMaster() {
    this.answerTypeList = [];
    this.loadAnswerType = function (clientContext) {
        let list = clientContext.get_web().get_lists().getByTitle("AnswerTypeMaster");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        clientContext.load(listItems);
        clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
            let objArray = [];
            while (listItemEnumerator.moveNext()) {
                let oListItem = listItemEnumerator.get_current();
                let obj = {
                    id: oListItem.get_id(),
                    answerType: oListItem.get_item("AnswerType")
                }
                objArray.push(obj);
            }
            this.answerTypeList = objArray;
        },
        OnQueryError);
    }
    this.loadAnswerType(clientContext);
}
function questionnaireSet() {
    this.questionnaireTypeList = [];
    this.loadQuestionnaireType = function (clientContext) {
        let list = clientContext.get_web().get_lists().getByTitle("QuestionnaireSet");
        let camlQuery = new SP.CamlQuery();
        let queryString = "<View><Query><OrderBy><FieldRef Name=\"ID\" Ascending=\"True\" /></OrderBy></Query></View>";
        camlQuery.set_viewXml(queryString);
        let listItems = list.getItems(camlQuery);
        clientContext.load(listItems);
        clientContext.executeQueryAsync(
        (sender, args) => {
            let listItemEnumerator = listItems.getEnumerator();
            let objArray = [];
            while (listItemEnumerator.moveNext()) {
                let oListItem = listItemEnumerator.get_current();
                let obj = {
                    id: oListItem.get_id(),
                    questionnaireType: oListItem.get_item("QuestionnaireType")
                }
                objArray.push(obj);
            }
            this.questionnaireTypeList = objArray;
        },
        OnQueryError);
    }
    this.loadQuestionnaireType(clientContext);
}

function OnQueryError(sender, args) {
    alert("Unable to get items. Error:" + args.get_message() + "\n" + args.get_stackTrace());
}

