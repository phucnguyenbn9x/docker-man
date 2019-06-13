const moduleName = 'dc-filter';

let app = angular.module(moduleName, []);

app.filter('formatDate', [
  '$filter',
  function() {
    return function(input) {
      return Number.isInteger(input)
        ? new Date(
            input * 1000 - (new Date().getTimezoneOffset() / 60) * 3600 * 1000
          )
            .toISOString()
            .substring(0, 19)
            .replace('T', ' ')
        : input.substring(0, 19).replace('T', ' ');
    };
  }
]);

app.filter('formatSize', [
  '$filter',
  function($filter) {
    let decimalByteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    let binaryByteUnits = [
      'KiB',
      'MiB',
      'GiB',
      'TiB',
      'PiB',
      'EiB',
      'ZiB',
      'YiB'
    ];

    return function(input) {
      let i = -1;
      let fileSizeInBytes = input;

      do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
      } while (fileSizeInBytes > 1024);

      let result = false ? binaryByteUnits[i] : decimalByteUnits[i];
      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + ' ' + result;
    };
  }
]);

module.exports.name = moduleName;
