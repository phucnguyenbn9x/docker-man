require('../../vendor/js/angular-modal-service.min');

const apiServiceMd = require('../../services/api-service').name;

const dcFiltersMd = require('../../filters/dc-filters').name;

const toolBarMd = require('../tool-bar/tool-bar').name;
const actionBarMd = require('../action-bar/action-bar').name;
const mainTableMd = require('../main-table/main-table').name;
const containersManMd = require('../containers-man/containers-man').name;
const imagesManMd = require('../images-man/images-man').name;
const volumesManMd = require('../volumes-man/volumes-man').name;
const wiLoadingMd = require('../wi-loading').name;

const moduleName = 'docker-man';
const componentName = 'dockerMan';

function Controller($scope, $element, $http, $filter, apiService, wiLoading) {
    let self = this;

    this.$onInit = () => {
        apiService.baseUrl = self.endPoint;
        self.tabsName = ['Containers', 'Images', 'Volumes'];
        self.selectedTab = self.tabsName[0];
    };

    this.selectTab = function(tab) {
        self.selectedTab = tab;
    };
}

let app = angular.module(moduleName, [
    'angularModalService',
    toolBarMd,
    actionBarMd,
    mainTableMd,
    apiServiceMd,
    dcFiltersMd,
    containersManMd,
    imagesManMd,
    volumesManMd,
    wiLoadingMd
]);

app.component(componentName, {
    template: require('./docker-man.html'),
    controller: Controller,
    controllerAs: 'self',
    bindings: {
        endPoint: '@'
    }
});

module.exports.name = moduleName;
