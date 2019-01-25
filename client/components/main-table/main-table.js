require('./main-table.less');

const moduleName = 'main-table';
const componentName = 'mainTable';

function Controller($scope, $element) {
  let self = this;

  this.$onInit = function() {
    self.selectedList = [];
  };

  this.click = function(ctn, $event) {
    self.selectedList = [ctn];
    // let indexInSelectedList = self.selectedList.indexOf(ctn);

    // if ($event && $event.shiftKey) {
    //   let list = self.fileList;
    //   let indexInList = list.indexOf(ctn);
    //   let lastSelected = self.selectedList[0];
    //   let i = list.indexOf(lastSelected);
    //   let current = undefined;
    //   if (lastSelected && list.indexOf(lastSelected) < indexInList) {
    //     self.selectedList = [];
    //     while (i <= indexInList) {
    //       current = list[i];
    //       !self.isSelected(current) && self.selectedList.push(current);
    //       i++;
    //     }
    //     return;
    //   }
    //   if (lastSelected && list.indexOf(lastSelected) > indexInList) {
    //     $scope.temps = [];
    //     while (i >= indexInList) {
    //       current = list[i];
    //       !self.isSelected(current) && self.selectedList.push(current);
    //       i--;
    //     }
    //     return;
    //   }
    // }
    // if ($event && $event.ctrlKey) {
    //   self.isSelected(ctn)
    //     ? self.selectedList.splice(indexInSelectedList, 1)
    //     : self.selectedList.push(ctn);
    //   return;
    // }
    // self.selectedList = [ctn];
  };

  this.isSelected = function(item) {
    return self.selectedList.indexOf(item) !== -1;
  };
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./main-table.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {
    itemList: '<',
    headerList: '<',
    actions: '<',
    containerCtrl: '<'
  }
});

module.exports.name = moduleName;
