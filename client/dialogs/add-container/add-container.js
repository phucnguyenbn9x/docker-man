const helper = require('../dialog-helper');
require('./add-container.less');

module.exports = function(ModalService, apiService, ctnManCtrl, cb) {
  function modalCtrl($scope, close) {
    let self = this;

    this.closeModal = function() {
      close(null);
    };

    this.addContainer = function() {
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
        Image: self.image,
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

      apiService.addContainer(payload, res => {
        console.log(res.data);
        ctnManCtrl.start(res.data);
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
