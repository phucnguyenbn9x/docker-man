const helper = require('../dialog-helper');

module.exports = function(ModalService, apiService, volManCtrl, cb) {
  function modalCtrl($scope, close) {
    let self = this;

    this.closeModal = function() {
      close(null);
    };

    this.addVolume = () => {
      let payload = {
        Driver: 'local',
        DriverOpts: {},
        Name: self.name
      };
      apiService.createVolume(payload, res => {
        console.log('---Created');
        volManCtrl.listVolumes();
      });
      self.closeModal();
    };
  }

  ModalService.showModal({
    template: require('./add-volume.html'),
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
