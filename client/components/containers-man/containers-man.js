require('./containers-man.less');

const apiServiceMd = require('../../services/api-service').name;

const dcFiltersMd = require('../../filters/dc-filters').name;

const toolBarMd = require('../tool-bar/tool-bar').name;
const actionBarMd = require('../action-bar/action-bar').name;
const mainTableMd = require('../main-table/main-table').name;

const moduleName = 'containers-man';
const componentName = 'containersMan';

function Controller($scope, $element, $http, $filter, apiService) {
  let self = this;

  this.$onInit = function() {
    apiService.baseUrl = self.endPoint;
    self.title = 'Containers';
    self.headerList = ['Name', 'State', 'Image', 'Created', 'Ports'];
    self.actions = [
      {name: 'Start', handle: self.start},
      {name: 'Stop', handle: self.stop},
      {name: 'Restart', handle: self.restart}
      // {name: 'Pause', handle: self.pause},
      // {name: 'Resume', handle: self.resume},
      // {name: 'Remove', handle: self.remove}
      // {name: 'Add container', handle: self.addContainer}
    ];
    self.actionsTable = [{name: 'Refresh', handle: self.listContainers}];

    self.listContainers();

    self.updateCtnListId = setInterval(function() {
      self.listContainers();
    }, 5000);
  };

  this.$onDestroy = function() {
    clearInterval(self.updateCtnListId);
  };

  this.listContainers = function() {
    apiService.listContainers(res => {
      self.itemList = res.data.map(elem => {
        let result = {
          Id: elem.Id,
          Name: elem.Names[0],
          State: elem.State,
          Image: elem.Image,
          Created: $filter('formatDate')(elem.Created),
          Ports:
            elem.Ports.length > 0
              ? `${elem.Ports[0].PublicPort ? elem.Ports[0].PublicPort : '-'}:${
                  elem.Ports[0].PrivatePort
                }`
              : '--'
        };
        return result;
      });
    });
  };
  this.start = function(ctn) {
    if (!ctn) return;
    apiService.startContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.stop = function(ctn) {
    if (!ctn) return;
    apiService.stopContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.restart = function(ctn) {
    if (!ctn) return;
    apiService.restartContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.pause = function(ctn) {
    if (!ctn) return;
    apiService.pauseContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.resume = function(ctn) {
    if (!ctn) return;
    apiService.resumeContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.remove = function(ctn) {
    if (!ctn) return;
    apiService.removeContainer(ctn, res => {
      self.listContainers();
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
  template: require('./containers-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    endPoint: '@'
  }
});

module.exports.name = moduleName;
