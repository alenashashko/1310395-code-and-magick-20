'use strict';
window.backend = (function () {
  var TIMEOUT_IN_MS = 10000;

  var URLs = {
    URL_LOAD: 'https://javascript.pages.academy/code-and-magick/data',
    URL_SAVE: 'https://javascript.pages.academy/code-and-magick'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var makeRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка запроса');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var saveData = function (onLoad, onError, data) {
    var xhr = makeRequest(onLoad, onError);
    xhr.open('POST', URLs.URL_SAVE);
    xhr.send(data);
  };

  var loadData = function (onLoad, onError) {
    var xhr = makeRequest(onLoad, onError);
    xhr.open('GET', URLs.URL_LOAD);
    xhr.send();
  };

  return {
    saveData: saveData,
    loadData: loadData
  };
})();
