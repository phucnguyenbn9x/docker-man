const moduleName = 'api-service';
const serviceName = 'apiService';

let app = angular.module(moduleName, []);

app.service(serviceName, function($http) {
	let self = this;

	// Containers
	this.listContainers = function(cb) {
		const LIST_CONTAINER = this.baseUrl + '/containers/json?all=1';
		httpGet(LIST_CONTAINER, cb);
	};
	this.statusContainer = function(payload, cb) {
		const STATUS_CONTAINER =
			this.baseUrl + `/containers/${payload.Id}/stats?stream=false`;
		httpGet(STATUS_CONTAINER, cb);
	};
	this.inspectContainer = (payload, cb) => {
		const INSPECT_CONTAINER = this.baseUrl + `/containers/${payload.Id}/json`;
		httpGet(INSPECT_CONTAINER, cb);
	};
	this.addContainer = function(payload, cb) {
		const ADD_CONTAINER =
			this.baseUrl +
			`/containers/create${payload.name ? `?name=${payload.name}` : ''}`;
		httpPost(ADD_CONTAINER, payload, cb);
	};
	this.startContainer = function(payload, cb) {
		const START_CONTAINER = this.baseUrl + `/containers/${payload.Id}/start`;
		httpPost(START_CONTAINER, {}, cb);
	};
	this.stopContainer = function(payload, cb) {
		const STOP_CONTAINER = this.baseUrl + `/containers/${payload.Id}/stop`;
		httpPost(STOP_CONTAINER, {}, cb);
	};
	this.restartContainer = function(payload, cb) {
		const RESTART_CONTAINER =
			this.baseUrl + `/containers/${payload.Id}/restart`;
		httpPost(RESTART_CONTAINER, {}, cb);
	};
	this.pauseContainer = function(payload, cb) {
		const PAUSE_CONTAINER = this.baseUrl + `/containers/${payload.Id}/pause`;
		httpPost(PAUSE_CONTAINER, {}, cb);
	};
	this.resumeContainer = function(payload, cb) {
		const RESUME_CONTAINER = this.baseUrl + `/containers/${payload.Id}/unpause`;
		httpPost(RESUME_CONTAINER, {}, cb);
	};
	this.removeContainer = function(payload, cb) {
		const REMOVE_CONTAINER =
			this.baseUrl + `/containers/${payload.Id}?force=true&v=0`;
		httpDelete(REMOVE_CONTAINER, cb);
	};

	// Images
	this.listImages = function(cb) {
		const LIST_IMAGES = this.baseUrl + '/images/json?all=0';
		httpGet(LIST_IMAGES, cb);
	};
	this.createImage = function(payload, cb) {
		const CREATE_IMAGE =
			this.baseUrl +
			`/images/create?fromImage=${encodeURIComponent(
				payload.fromImage
			)}&tag=${encodeURIComponent(payload.tag)}`;
		httpPost(CREATE_IMAGE, payload, cb);
	};

	// Volumes
	this.listVolumes = function(cb) {
		const LIST_VOLUMES = this.baseUrl + '/volumes';
		httpGet(LIST_VOLUMES, cb);
	};
	this.createVolume = (payload, cb) => {
		const CREATE_VOLUME = this.baseUrl + '/volumes/create';
		httpPost(CREATE_VOLUME, payload, cb);
	};

	this.getNewContainerPayload = function(name = '', image, network = 'bridge', ports, env = []) {
		let result = {
			Cmd: [],
			Env: env,
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
				NetworkMode: network,
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
				EndpointsConfig: {}
			},
			OpenStdin: false,
			Tty: false,
			Volumes: {},
			name: name
		}
		result.NetworkingConfig.EndpointsConfig[network] = {
			IPAMConfig: {
				IPv4Address: '',
				IPv6Address: ''
			}
		};
		if (ports) {
			let exposedPort = `${ports.slice(ports.indexOf(':') + 1)}/tcp`;
			let hostPort = `${ports.slice(0, ports.indexOf(':'))}`;
			result.ExposedPorts[exposedPort] = {};
			result.HostConfig.PortBindings[exposedPort] = [{HostPort: hostPort}];
		}
		return result;
	}

	function httpGet(url, cb) {
		let reqOptions = {
			method: 'GET',
			url: url,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		$http(reqOptions).then(
			result => {
				cb(result);
			},
			err => {
				cb(null, err);
			}
		);
	}
	function httpPost(url, payload, cb) {
		let reqOptions = {
			method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json'
			},
			data: payload
		};
		$http(reqOptions).then(
			result => {
				cb(result);
			},
			err => {
				cb(null, err);
			}
		);
	}
	function httpDelete(url, cb) {
		let reqOptions = {
			method: 'DELETE',
			url: url,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		$http(reqOptions).then(
			result => {
				cb(result);
			},
			err => {
				cb(null, err);
			}
		);
	}
});

module.exports.name = moduleName;
