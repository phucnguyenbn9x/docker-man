const helper = require('../dialog-helper');

module.exports = function(ModalService, apiService, imgManCtrl, cb) {
  function modalCtrl($scope, close) {
    let self = this;

    this.closeModal = function() {
      close(null);
    };

    this.pullImage = () => {
      let image = self.image;
      let colonIndex = image.lastIndexOf(':');
      let payload = {
        fromImage: `${(colonIndex > 0 ? image.slice(0, colonIndex) : image)}`,
        tag: colonIndex > 0 ? image.slice(colonIndex + 1) : 'latest'
      };
      apiService.createImage(payload, res => {
        console.log('---Pulled');
        imgManCtrl.listImages();
      });
      self.closeModal();
    };
  }

  ModalService.showModal({
    template: require('./pull-image.html'),
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
