const helper = require('../dialog-helper');

module.exports = function(ModalService, apiService, ctn, ctnManCtrl, cb) {
  function modalCtrl($scope, close) {
    let self = this;

    this.title = ctn.Name;
    this.inspect =
      JSON.stringify(ctn.stats, null, 2).trim() +
      '\n' +
      JSON.stringify(ctn.inspect, null, 2).trim();

    this.closeModal = function() {
      close(null);
    };
  }

  ModalService.showModal({
    template: require('./container-info.html'),
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
