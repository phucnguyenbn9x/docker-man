const helper = require('../dialog-helper');

module.exports = function(ModalService, apiService, ctnManCtrl, cb) {
	function modalCtrl($scope, close) {
		let self = this;

		this.closeModal = function() {
			close(null);
		};

		this.addContainer = function() {
			let colonIndex = self.image.lastIndexOf(':');
			let image = colonIndex > 0 ? self.image : `${self.image}:latest`;
			let network = '';

			let payload = apiService.getNewContainerPayload(self.name, image);
			if (self.privatePort) {
				payload.ExposedPorts[`${self.privatePort}/tcp`] = {};
				payload.HostConfig.PortBindings[`${self.privatePort}/tcp`] = [];
				payload.HostConfig.PortBindings[`${self.privatePort}/tcp`].push({
					HostPort: ''
				});
				if (self.publicPort) {
					payload.HostConfig.PortBindings[`${self.privatePort}/tcp`][0] = {
						HostPort: self.publicPort
					};
				}
			}

			apiService.listImages(res => {
				if (
					res.data.some(img => {
						if (!img.RepoTags) return false;
						return img.RepoTags.includes(image);
					})
				) {
					apiService.addContainer(payload, res => {
						ctnManCtrl.start(res.data);
					});
				} else {
					colonIndex = image.lastIndexOf(':');
					let imgInfo = {
						fromImage: colonIndex > 0 ? image.slice(0, colonIndex) : image,
						tag: colonIndex > 0 ? image.slice(colonIndex + 1) : 'latest'
					};
					apiService.createImage(imgInfo, res => {
						console.log('test');
						apiService.addContainer(payload, res => {
							ctnManCtrl.start(res.data);
						});
					});
				}
			});

			self.closeModal();
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
