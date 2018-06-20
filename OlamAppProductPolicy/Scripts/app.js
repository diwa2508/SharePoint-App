'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

    let clientContext = SP.ClientContext.get_current();
    let questListItems, choiceListItems, typeListItems, pageListItems;
    let questItems = [], choiceItems = [], typeItems = [], pageItems = [];

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        try {
            loadQuestions();
            loadChoices();
        }
        catch (ex) {
            alert('Error' + ex.message);
        }
    });

    //function load the list 
    function loadQuestions() {
        let questList = clientContext.get_web().get_lists().getByTitle('QuestionMaster');
        let camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
         "<View>" +
            "<viewFields>" +
                "<FieldRef Name='ID' />" +
                "<FieldRef Name='QuestionnaireSet' />" +
                "<FieldRef Name='Question' />" +
                "<FieldRef Name='AnswerTypeID' />" +
                "<FieldRef Name='OptionGroupID' />" +
            "</viewFields>"
         + "</View>");
        questListItems = questList.getItems(camlQuery);
        clientContext.load(questListItems);
        clientContext.executeQueryAsync(OnloadQuestSuccess, OnQueryError);
    }
    function OnloadQuestSuccess(sender, args) {
        let listItemEnumerator = questListItems.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let listItemInfo = {
                ID: oListItem.get_id(),
                QuestionnaireSet: oListItem.get_item('QuestionnaireSet').get_lookupValue(),
                Question: oListItem.get_item('Question'),
                AnswerTypeID: oListItem.get_item('AnswerTypeID').get_lookupValue(),
                OptionGroupID: (oListItem.get_item('OptionGroupID') != null) ? oListItem.get_item('OptionGroupID').get_lookupValue() : ""
            };
            questItems.push(listItemInfo);
        }
        alert(questItems.length);
    }
    //Get choices 
    function loadChoices() {
        let choiceList = clientContext.get_web().get_lists().getByTitle('Options');
        let camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
         "<View>" +
           "<viewFields>" +
                "<FieldRef Name='ID' />" +
                "<FieldRef Name='OptionGroupID' />" +
                "<FieldRef Name='Choice' />" +
            "</viewFields>"
         + "</View>");
        choiceListItems = choiceList.getItems(camlQuery);
        clientContext.load(choiceListItems);
        clientContext.executeQueryAsync(OnloadChoiceSuccess, OnQueryError);
    }
    function OnloadChoiceSuccess(sender, args) {
        let listItemEnumerator = choiceListItems.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            let oListItem = listItemEnumerator.get_current();
            let listItemInfo = {
                ID: oListItem.get_id(),
                OptionGroupID: oListItem.get_item('OptionGroupID').get_lookupValue(),
                Choice: oListItem.get_item('Choice')
            };
            choiceItems.push(listItemInfo);
        }
        alert(choiceItems.length);
    }

    //Query Erro Method
    function OnQueryError(sender, args) {
        alert('Unable to get items. Error:' + args.get_message() + '\n' + args.get_stackTrace());
    }
}




/* Sample HTML to be constructed
document.createElement('span')
elememt.setAttribute('',value)

div
ul
li
a
h3
span
input(checkbox)
br
button



        <ul class="nav nav-pills">
            <li class="active"><a href="#" data-toggle="tab">Home</a></li>
        </ul>

        <div class="tab-content clearfix">
            <div class="tab-pane active" id="#">
                <h3>RO Questionnaire</h3>
                <div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div>
                                <div>
                                    <span>1.</span>
                                    <span>Has the BU submitted detailed business plan and have obtained Management approval for the proposed Business / Product? </span>
                                    <input style="float: right" type="checkbox" />
                                </div>
                                <br />
                                <div>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown button
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">Action</a>
                                        </div>
                                    </div>
                                    <span class="comments" hidden></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <button type="button" class="btn btn-default">Submit</button>
                    <button type="button" class="btn btn-default">Cancel</button>
                </div>
            </div>
        </div>


*/