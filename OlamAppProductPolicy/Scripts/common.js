"use strict";
function OnQueryError(sender, args) {
    alert("Unable to get items. Error:" + args.get_message() + "\n" + args.get_stackTrace());
}

/* Sample HTML to be constructed

add badge for the tabs
add hidden error field under questions

issues
full page view
upload files (file validation)

validation
Auto-save
Hidden fields for question id,questionnaire set,option set,
create transaction list
query string for the submitted user
readonly for the reviwer and accpetor
get current userinfo

*/