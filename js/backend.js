'use strict';
(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    upload: function (data, onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },

    load: function (onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.timeout = 10000;
      xhr.open('GET', URL_LOAD);
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
