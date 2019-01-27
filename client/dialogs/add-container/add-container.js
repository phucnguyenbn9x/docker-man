const helper = require('../dialog-helper');
require('./add-container.less');

module.exports = function(ModalService, cb) {
  function modalCtrl($scope, close) {
    let self = this;

    this.closeModal = function() {
      close(null);
    };
  }

  ModalService.showModal({
    template: require('./add-container.html'),
    controller: modalCtrl,
    controllerAs: 'self'
  }).then(modal => {
    helper.initModal(modal);
    modal.close.then(data => {
      helper.removeBackdrop();
      if (cb) cb(data);
    });
  });
};
