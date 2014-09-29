'use strict';

angular.module('angular-point-seed', [
    //Angular Components
    'ngSanitize',
    'ngAnimate',

    //Angular UI
    'ui.router',
    'ui.bootstrap',
    'ui.date',
    'ui.utils',
    'ui.select',
    'ui.sortable',
    'ui.highlight',

//    //Plugins
    'ngTable',
    'googlechart',
    'firebase',
    'toastr',
    'angular-loading-bar',

    //SP-Angular
    'angularPoint',

    //Mock Support
    'ngMockE2E'


])
    .run(function ($httpBackend) {

        // Don't mock the html views
        $httpBackend.whenGET(/\.html$/).passThrough();

        $httpBackend.whenGET(/\.xml$/).passThrough();

    });

