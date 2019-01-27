require('./containers-man.less');

const addContainerDialog = require('../../dialogs/add-container/add-container');

const moduleName = 'containers-man';
const componentName = 'containersMan';

function Controller(
  $scope,
  $element,
  $http,
  $filter,
  ModalService,
  apiService
) {
  let self = this;

  this.$onInit = function() {
    self.title = 'Containers';
    self.headerList = ['Name', 'State', 'Image', 'Created', 'Ports'];
    self.actions = [
      {name: 'Start', handle: self.start},
      {name: 'Stop', handle: self.stop},
      {name: 'Restart', handle: self.restart}
      // {name: 'Pause', handle: self.pause},
      // {name: 'Resume', handle: self.resume},
      // {name: 'Remove', handle: self.remove}
      // {name: 'Add container', handle: self.addContainer}
    ];
    self.actionsTable = [{name: 'Add container', handle: self.addContainer}];

    self.listContainers();

    self.updateCtnListId = setInterval(function() {
      self.listContainers();
    }, 5000);
  };

  this.$onDestroy = function() {
    clearInterval(self.updateCtnListId);
  };

  this.listContainers = function() {
    apiService.listContainers(res => {
      self.itemList = res.data.map(elem => {
        let result = {
          Id: elem.Id,
          Name: elem.Names[0],
          State: elem.State,
          Image: elem.Image,
          Created: $filter('formatDate')(elem.Created),
          Ports:
            elem.Ports.length > 0
              ? `${elem.Ports[0].PublicPort ? elem.Ports[0].PublicPort : '-'}:${
                  elem.Ports[0].PrivatePort
                }`
              : '--'
        };
        return result;
      });
    });
  };
  this.addContainer = function() {
    addContainerDialog(ModalService);
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
      Image: '',
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
      Volumes: {}
    };
  };
  this.start = function(ctn) {
    if (!ctn) return;
    apiService.startContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.stop = function(ctn) {
    if (!ctn) return;
    apiService.stopContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.restart = function(ctn) {
    if (!ctn) return;
    apiService.restartContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.pause = function(ctn) {
    if (!ctn) return;
    apiService.pauseContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.resume = function(ctn) {
    if (!ctn) return;
    apiService.resumeContainer(ctn, res => {
      self.listContainers();
    });
  };
  this.remove = function(ctn) {
    if (!ctn) return;
    apiService.removeContainer(ctn, res => {
      self.listContainers();
    });
  };
}

let app = angular.module(moduleName, []);

app.component(componentName, {
  template: require('./containers-man.html'),
  controller: Controller,
  controllerAs: 'self',
  bindings: {}
});

module.exports.name = moduleName;
