require('./tool-bar.less');

const moduleName = 'tool-bar';
const componentName = 'toolBar';

function Controller($scope, $element, $http) {
  let self = this;

  this.$onInit = function() {
    self.selectedTab = self.tabsName[0];
  };

  this.clickHandle = function(tab) {
    self.selectedTab = tab;
    self.selectTab && self.selectTab(tab);
  };
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./tool-bar.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    tabsName: '<',
    selectTab: '<'
  }
});

module.exports.name = moduleName;
