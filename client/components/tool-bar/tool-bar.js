require('./tool-bar.less');

const moduleName = 'tool-bar';
const componentName = 'toolBar';

function Controller($scope, $element, $http) {
  let self = this;
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./tool-bar.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    title: '<'
  }
});

module.exports.name = moduleName;
