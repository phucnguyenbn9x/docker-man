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
