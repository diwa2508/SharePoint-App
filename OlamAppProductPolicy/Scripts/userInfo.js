"use strict";
function userProperties(clientContext, peopleManager) {
    this.userProfileProperties = [];
    this.loginName = "";
    this.getUserProperties = function (clientContext, peopleManager) {
        let currentUser = clientContext.get_web().get_currentUser();
        clientContext.load(currentUser);
        clientContext.executeQueryAsync(function () {
            this.loginName = currentUser.get_loginName();
            //this.profilePropertyNames = [];
            //let userProfilePropertiesForUser =
            //        new SP.UserProfiles.UserProfilePropertiesForUser(
            //        clientContext,
            //        this.loginName,
            //        this.profilePropertyNames);
            //this.userProfileProperties = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
            //clientContext.load(userProfilePropertiesForUser);
            //clientContext.executeQueryAsync(function () {
            //}, OnQueryError);
        }, OnQueryError);
    };  
    this.getUserProperties(clientContext, peopleManager);
}

