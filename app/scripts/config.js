angular.module('angular-point-seed')
    .config(function (apConfig, toastrConfig, uiSelectConfig) {
        /** Set the default toast location */
        toastrConfig.positionClass = 'toast-bottom-right';

        uiSelectConfig.theme = 'bootstrap';

        apConfig.defaultUrl = 'My Site URL <CHANGE ME>';

    });
