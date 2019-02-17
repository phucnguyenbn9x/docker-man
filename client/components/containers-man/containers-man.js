const addContainerDialog = require('../../dialogs/add-container/add-container');
const containerInfoDialog = require('../../dialogs/container-info/container-info');

const moduleName = 'containers-man';
const componentName = 'containersMan';

function Controller(
  $scope,
  $element,
  $http,
  $filter,
  ModalService,
  apiService
) {
  let self = this;

  this.$onInit = function() {
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
    self.actionsTable = [{name: 'Add container', handle: self.addContainer}];

    self.listContainers();

    self.updateCtnListId = setInterval(function() {
      self.updateContainers();
    }, 5000);
  };

  this.$onDestroy = function() {
    clearInterval(self.updateCtnListId);
  };

  this.updateContainers = function() {
    apiService.listContainers(res => {
      self.itemList = res.data.map((elem, idx) => {
        let tmp = {
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
              : '--',
          selected: self.itemList[idx]
            ? self.itemList[idx].selected || false
            : false,
          Stats: self.itemList[idx] ? self.itemList[idx].Stats : []
        };
        return tmp;
      });
    });
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
              : '--',
          selected: false
        };
        return result;
      });
    });
  };
  this.clickContainer = function(ctn) {
    apiService.statusContainer(ctn, res => {
      let stats = {};
      stats.Memory = $filter('formatSize')(res.data.memory_stats.usage || 0);
      stats.Cache = res.data.memory_stats.stats
        ? $filter('formatSize')(res.data.memory_stats.stats.cache)
        : 0;
      ctn.stats = stats;
      apiService.inspectContainer(ctn, res => {
        ctn.inspect = res.data;
        containerInfoDialog(ModalService, apiService, ctn, self, () => {});
      });
    });
  };
  this.getStatusContainer = function(ctn, cb) {
    let idx = self.itemList.indexOf(ctn);
    if (ctn.State != 'running') {
      delete self.itemList[idx].selected;
      return;
    }
    if (!ctn.selected) {
      apiService.statusContainer(ctn, res => {
        self.itemList[idx].Stats = [];
        self.itemList[idx].Stats.push([
          'Memory',
          res.data.memory_stats.usage || ''
        ]);
        self.itemList[idx].Stats.push([
          'Cache',
          res.data.memory_stats.stats ? res.data.memory_stats.stats.cache : ''
        ]);
        cb && cb();
      });
    }
  };
  this.addContainer = function() {
    addContainerDialog(ModalService, apiService, self);
  };
  this.start = function(ctn) {
    if (!ctn) return;
    apiService.startContainer(ctn, res => {
      self.updateContainers();
    });
  };
  this.stop = function(ctn) {
    if (!ctn) return;
    ctn.selected = false;
    apiService.stopContainer(ctn, res => {
      self.updateContainers();
    });
  };
  this.restart = function(ctn) {
    if (!ctn) return;
    apiService.restartContainer(ctn, res => {
      self.updateContainers();
    });
  };
  this.pause = function(ctn) {
    if (!ctn) return;
    apiService.pauseContainer(ctn, res => {
      self.updateContainers();
    });
  };
  this.resume = function(ctn) {
    if (!ctn) return;
    apiService.resumeContainer(ctn, res => {
      self.updateContainers();
    });
  };
  this.remove = function(ctn) {
    if (!ctn) return;
    apiService.removeContainer(ctn, res => {
      self.updateContainers();
    });
  };
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./containers-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {}
});

module.exports.name = moduleName;
