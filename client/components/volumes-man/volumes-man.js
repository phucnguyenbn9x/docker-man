require('./volumes-man.less');

const moduleName = 'volumes-man';
const componentName = 'volumesMan';

function Controller($scope, $element, $http, $filter, apiService) {
  let self = this;

  this.$onInit = function() {
    self.title = 'Volumes';
    self.headerList = ['Name', 'Mountpoint', 'CreatedAt'];
    self.actionsTable = [{name: 'Refresh', handle: self.listVolumes}];

    self.listVolumes();

    self.updateVolListId = setInterval(() => {
      self.listVolumes();
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
          Mountpoint: elem.Mountpoint,
          CreatedAt: $filter('formatDate')(elem.CreatedAt)
        };
        return result;
      });
    });
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
