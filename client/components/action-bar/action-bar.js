require('./action-bar.less');

const moduleName = 'action-bar';
const componentName = 'actionBar';

function Controller($scope, $element) {
  let self = this;
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./action-bar.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    actions: '<',
    item: '<'
  }
});

module.exports.name = moduleName;
