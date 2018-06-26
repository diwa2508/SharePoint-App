"user strict";
function buildSurvey(questionArr, optionArr, ansTypeArr, questSetArr, divElement) {
    this.questList = questionArr;
    this.optionList = optionArr;
    this.ansTypeList = ansTypeArr;
    this.questSetList = questSetArr;
    this.div = divElement;
    this.buildSurveyHTML = function () {
        debugger;
        let questionArr = this.questList;
        let optionArr = this.optionList;
        let ansTypeArr = this.ansTypeList;
        let questSetArr = this.questSetList;
        let divElement = this.div;
        //Build tab menu
        let ulHeader = new ul("nav nav-pills");

        questSetArr.forEach(function (eleHeader, ixHeader) {
            let liHeader;
            if (ixHeader === 0) {
                liHeader = new li("active");
            }
            else {
                liHeader = new li("");
            }
            let a = new aTag(eleHeader.id, "", "#" + eleHeader.id + findAndReplace(eleHeader.questionnaireType, " ", ""), "tab");
            a.element.innerHTML = eleHeader.questionnaireType;
            liHeader.element.appendChild(a.element);
            ulHeader.element.appendChild(liHeader.element);
        });
        divElement.appendChild(ulHeader.element);
        //build page contents - page by page

        let tabContentDiv = new div("", "tab-content clearfix", "");
        questSetArr.forEach(function (elePage, ixPage) {
            let divPaneClass = "tab-pane";
            if (ixPage === 0) {
                divPaneClass += " active"
            }

            let tabPaneDiv = new div(elePage.id + findAndReplace(elePage.questionnaireType," ",""), divPaneClass, "");
            //page header name h3
            let hElement = new header("", "", 2);
            hElement.element.innerHTML = elePage.questionnaireType;
            tabPaneDiv.element.appendChild(hElement.element);

            //Questions of the page
            let emptyDivUp = new div("", "", "", "");
            let ulQuesGrp = new ul("list-group");

            //Questions & answer in a set
            let questOfPage = [];
            questionArr.filter(function (eleQuesPage) {
                if (eleQuesPage.questionnaireSetID == elePage.id) {
                    questOfPage.push(eleQuesPage);
                }
            });
            questOfPage.forEach(function (eleQues, ixQues) {
                let liQuesGrp = new li("list-group-item");
                let emptyDiv1 = new div("question-" + eleQues.id, "", "", "");

                let emptyDiv2 = new div("question-" + eleQues.id + "-in", "", "", "");
                let hideDetailsClssName = "detailshidden";

                let questNoSpan = new span("", "");
                questNoSpan.element.innerHTML = (ixQues + 1).toString() + ". ";
                let questSpan = new span("", "");
                questSpan.element.innerHTML = eleQues.question;

                let questSetSpan = new span("", hideDetailsClssName + " questSet");
                let questIDSpan = new span("", hideDetailsClssName + " questID");
                let mandatorySpan = new span("", hideDetailsClssName + " mandatory");
                let ruleSpan = new span("", hideDetailsClssName + " rule");
                let validitySpan = new span("", hideDetailsClssName + " validity");
                let checkBox = new input("", "checkbox", "checkbox")

                emptyDiv2.element.appendChild(questNoSpan.element);
                emptyDiv2.element.appendChild(questSpan.element);
                emptyDiv2.element.appendChild(questSetSpan.element);
                emptyDiv2.element.appendChild(mandatorySpan.element);
                emptyDiv2.element.appendChild(ruleSpan.element);
                emptyDiv2.element.appendChild(validitySpan.element);
                emptyDiv2.element.appendChild(checkBox.element);

                let emptyDiv3 = new div("question-" + eleQues.id + "-ans", "", "", "");
                let answerType = "";
                ansTypeArr.filter(function (ansTypeQues) {
                    if (ansTypeQues.id == eleQues.answerTypeID) {
                        answerType = ansTypeQues.answerType;
                    }
                });
                switch (answerType.toLowerCase()) {
                    case "dropdown":
                        let ddDiv = new div("", "dropdown", "", "");
                        let ddButton = new button("", "btn btn-secondary dropdown-toggle", "dropdown", true);
                        ddButton.element.innerHTML = "Choices";
                        let ddmenuDiv = new div("", "dropdown-menu", "", "");
                        ddmenuDiv.element.setAttribute("aria-labelledby", "dropdownMenuButton");

                        let ddValues = [];
                        optionArr.filter(function (ddValue) {
                            if (ddValue.optionGroupID == eleQues.optionGroupID) {
                                ddValues.push(ddValue.choice);
                            }
                        });
                        ddValues.forEach(function (ddval) {
                            let ddValA = new aTag("", "dropdown-item", "#", "");
                            ddValA.element.innerHTML = ddval;
                            ddmenuDiv.element.appendChild(ddValA.element);
                        });
                        ddDiv.element.appendChild(ddButton.element);
                        ddDiv.element.appendChild(ddmenuDiv.element);
                        emptyDiv3.element.appendChild(ddDiv.element);
                        break;
                    case "file":
                        let fileDiv = new div("", "file", "", "");
                        let fileInput = new input("", "", "file");
                        fileDiv.element.appendChild(fileInput.element);
                        emptyDiv3.element.appendChild(fileDiv.element);
                        break;
                    case "text":
                        let textDiv = new div("", "anstext", "", "");
                        let textInput = new input("", "", "text");
                        textDiv.element.appendChild(textInput.element);
                        emptyDiv3.element.appendChild(textDiv.element);
                        break;
                    default:
                        emptyDiv3.element.innerHTML = "-";
                        break;
                }

                let commentSpan = new span("", hideDetailsClssName + " comment");
                let warningDiv = new div("", "alert alert-warning errorMessage", "");
                emptyDiv3.element.appendChild(warningDiv.element);

                emptyDiv1.element.appendChild(emptyDiv2.element);
                let brElement = document.createElement("br");
                emptyDiv1.element.appendChild(brElement);
                emptyDiv1.element.appendChild(emptyDiv3.element);

                liQuesGrp.element.appendChild(emptyDiv1.element);
                ulQuesGrp.element.appendChild(liQuesGrp.element);
            });
            emptyDivUp.element.appendChild(ulQuesGrp.element);

            let emptyDivButtons = new div("", "", "", "");
            let submitButton = new button("", "btn btn-default", "", false);
            let cancelButton = new button("", "btn btn-default", "", false);
            submitButton.element.innerHTML = "Submit";
            cancelButton.element.innerHTML = "Cancel";
            emptyDivButtons.element.appendChild(submitButton.element);
            emptyDivButtons.element.appendChild(cancelButton.element);

            tabPaneDiv.element.appendChild(emptyDivUp.element);
            tabPaneDiv.element.appendChild(emptyDivButtons.element);
            tabContentDiv.element.appendChild(tabPaneDiv.element);
        });
        divElement.appendChild(tabContentDiv.element);
    }
    this.buildSurveyHTML();
    function findAndReplace(string, target, replacement) {
        var i = 0, length = string.length;
        for (i; i < length; i++) {
            string = string.replace(target, replacement);
        }
        return string;
    }
}


