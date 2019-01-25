require('./volumes-man.less');

const apiServiceMd = require('../../services/api-service').name;

const dcFiltersMd = require('../../filters/dc-filters').name;

const toolBarMd = require('../tool-bar/tool-bar').name;
const actionBarMd = require('../action-bar/action-bar').name;
const mainTableMd = require('../main-table/main-table').name;

const moduleName = 'volumes-man';
const componentName = 'volumesMan';

function Controller($scope, $element, $http, $filter, apiService) {
  let self = this;

  this.$onInit = function() {
    apiService.baseUrl = self.endPoint;
    self.title = 'Volumes';
    self.headerList = ['Name', 'Mountpoint', 'CreatedAt'];
    self.actionsTable = [{name: 'Refresh', handle: self.listVolumes}];

    self.listVolumes();
  };

  this.listVolumes = function() {
    apiService.listVolumes(res => {
      self.itemList = res.data.Volumes.map(elem => {
        let result = {
          Name: elem.Name,
          Mountpoint: elem.Mountpoint,
          CreatedAt: $filter('formatDate')(elem.CreatedAt)
        };
        return result;
      });
    });
  };
}

let app = angular.module(moduleName, [
  toolBarMd,
  actionBarMd,
  mainTableMd,
  apiServiceMd,
  dcFiltersMd
]);

app.component(componentName, {
  template: require('./volumes-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    endPoint: '@'
  }
});

module.exports.name = moduleName;
