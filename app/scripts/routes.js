'use strict';

angular.module('angular-point-seed')
    .config(function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider
            //Default Route
            .otherwise('/');

        $stateProvider
        /**Empty Route**/
            .state('home', {
                url: '/',
                templateUrl: 'modules/main/views/main_view.html',
                controller: 'mainCtrl'
            })
            //Group Manager
            .state('groupmanager', {
                url: '/group_manager',
                templateUrl: 'bower_components/angular-point-group-manager/src/group_manager_view.html',
                controller: 'apGroupManagerCtrl'
            })

            //Offline
            .state('offline', {
                url: '/offline',
                templateUrl: 'bower_components/angular-point-offline-generator/src/ap-offline-generator-view.html',
                controller: 'generateOfflineCtrl'
            });


    });
