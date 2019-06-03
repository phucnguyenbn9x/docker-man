const pullImageDialog = require('../../dialogs/pull-image/pull-image');
const config = require('../../../config/config.json');

const moduleName = 'images-man';
const componentName = 'imagesMan';

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
    self.title = 'Images';
    self.headerList = ['Tags', 'Size', 'Created'];
    self.actions = [{name: 'Update', handle: self.update}];
    self.actionsTable = [
		// {name: 'Pull image', handle: self.pullImage},
		{name: 'Update all', handle: self.updateAllImage}
	];

    self.listImages();

    self.updateImgListId = setInterval(function() {
      self.updateImages();
    }, 5000);
  };
  this.$onDestroy = function() {
    clearInterval(self.updateImgListId);
  };

  this.listImages = function() {
    apiService.listImages(res => {
      self.itemList = res.data.map(elem => {
        let result = {
			Tags: elem.RepoTags && Array.isArray(elem.RepoTags) && elem.RepoTags.length > 0 ? elem.RepoTags[0] : '',
          Size: $filter('formatSize')(elem.Size),
          Created: $filter('formatDate')(elem.Created)
        };
        return result;
      });
		self.itemList = self.itemList.filter(item => {
			return config.some(elem => {
				return elem.registry === item.Tags;
			});
		})
    });
  };
  this.updateImages = function() {
    self.listImages();
  };
  this.pullImage = function() {
    pullImageDialog(ModalService, apiService, self);
  };

  this.update = function(image) {
    let tag = image.Tags;
    let colonIndex = tag.lastIndexOf(':');
    let payload = {
      fromImage: tag.slice(0, colonIndex),
      tag: tag.slice(colonIndex + 1)
    };
    apiService.createImage(payload, res => {
      console.log('---Updated');
    });
  };

	this.updateAllImage = function() {
		self.itemList.forEach(img => {
			self.update(img);
		})
	}
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./images-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {}
});

module.exports.name = moduleName;
