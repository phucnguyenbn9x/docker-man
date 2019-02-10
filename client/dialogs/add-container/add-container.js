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

      let payload = {
        Cmd: [],
        Env: [],
        ExposedPorts: {},
        HostConfig: {
          Binds: [],
          CapAdd: [
            'AUDIT_WRITE',
            'CHOWN',
            'DAC_OVERRIDE',
            'FOWNER',
            'FSETID',
            'KILL',
            'MKNOD',
            'NET_BIND_SERVICE',
            'NET_RAW',
            'SETFCAP',
            'SETGID',
            'SETPCAP',
            'SETUID',
            'SYS_CHROOT'
          ],
          CapDrop: [
            'AUDIT_CONTROL',
            'BLOCK_SUSPEND',
            'DAC_READ_SEARCH',
            'IPC_LOCK',
            'IPC_OWNER',
            'LEASE',
            'LINUX_IMMUTABLE',
            'MAC_ADMIN',
            'MAC_OVERRIDE',
            'NET_ADMIN',
            'NET_BROADCAST',
            'SYSLOG',
            'SYS_ADMIN',
            'SYS_BOOT',
            'SYS_MODULE',
            'SYS_NICE',
            'SYS_PACCT',
            'SYS_PTRACE',
            'SYS_RAWIO',
            'SYS_RESOURCE',
            'SYS_TIME',
            'SYS_TTY_CONFIG',
            'WAKE_ALARM'
          ],
          Devices: [],
          NetworkMode: 'bridge',
          PortBindings: {},
          Privileged: false,
          PublishAllPorts: false,
          RestartPolicy: {
            Name: 'no'
          }
        },
        Image: image,
        Labels: {},
        MacAddress: '',
        NetworkingConfig: {
          EndpointsConfig: {
            bridge: {
              IPAMConfig: {
                IPv4Address: '',
                IPv6Address: ''
              }
            }
          }
        },
        OpenStdin: false,
        Tty: false,
        Volumes: {},
        name: self.name
      };

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
