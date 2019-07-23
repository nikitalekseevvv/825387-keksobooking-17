'use strict';
(function () {
  window.backend = {
    upload: function (url, data, onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.open('POST', url);
      xhr.send(data);
    },

    load: function (url, onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.timeout = 10000;
      xhr.open('GET', url);
      xhr.send();
    }
  };

  var createRequest = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };
})();
