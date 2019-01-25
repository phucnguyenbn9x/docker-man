require('./images-man.less');

const apiServiceMd = require('../../services/api-service').name;

const dcFiltersMd = require('../../filters/dc-filters').name;

const toolBarMd = require('../tool-bar/tool-bar').name;
const actionBarMd = require('../action-bar/action-bar').name;
const mainTableMd = require('../main-table/main-table').name;

const moduleName = 'images-man';
const componentName = 'imagesMan';

function Controller($scope, $element, $http, $filter, apiService) {
  let self = this;

  this.$onInit = function() {
    apiService.baseUrl = self.endPoint;
    self.title = 'Images';
    self.headerList = ['Tags', 'Size', 'Created'];
    self.actions = [{name: 'Update', handle: self.update}];
    self.actionsTable = [{name: 'Refresh', handle: self.listImages}];

    self.listImages();
  };

  this.listImages = function() {
    apiService.listImages(res => {
      self.itemList = res.data.map(elem => {
        let result = {
          Tags: elem.RepoTags,
          Size: $filter('formatSize')(elem.Size),
          Created: $filter('formatDate')(elem.Created)
        };
        return result;
      });
    });
  };

  this.update = function() {};
}

let app = angular.module(moduleName, [
  toolBarMd,
  actionBarMd,
  mainTableMd,
  apiServiceMd,
  dcFiltersMd
]);

app.component(componentName, {
  template: require('./images-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    endPoint: '@'
  }
});

module.exports.name = moduleName;
