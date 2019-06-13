const addVolumeDialog = require('../../dialogs/add-volume/add-volume');

const moduleName = 'volumes-man';
const componentName = 'volumesMan';

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
    self.title = 'Volumes';
    self.headerList = ['Name', 'Mountpoint'];
    self.actionsTable = [{name: 'Add volume', handle: self.addVolume}];

    self.listVolumes();

    self.updateVolListId = setInterval(() => {
      self.updateVolumes();
    }, 5000);
  };
  this.$onDestroy = function() {
    clearInterval(self.updateVolListId);
  };

  this.listVolumes = function() {
    apiService.listVolumes(res => {
      self.itemList = res.data.Volumes.map(elem => {
        let result = {
          Name: elem.Name,
          Mountpoint: elem.Mountpoint
          // CreatedAt: $filter('formatDate')(elem.CreatedAt)
        };
        return result;
      });
    });
  };
  this.updateVolumes = function() {
    apiService.listVolumes(res => {
      res.data.Volumes.forEach((elem, idx) => {
        let tmp = {
          Name: elem.Name,
          Mountpoint: elem.Mountpoint,
          CreatedAt: $filter('formatDate')(elem.CreatedAt)
        };
        angular.copy(tmp, self.itemList[idx]);
      });
    });
  };
  this.addVolume = () => {
    addVolumeDialog(ModalService, apiService, self);
  };
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./volumes-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {}
});

module.exports.name = moduleName;
