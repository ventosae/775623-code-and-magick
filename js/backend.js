'use strict';

(function () {
  var witchers1 = [];
  var TIMEOUT_TIME = 10000;
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var xhr = new XMLHttpRequest();

  // var onSuccess = function (data) {
  //   witchers = data;
  // };

  var onErrory = function () {
    alert("sorry matey");
  };

  var sendXhrRequest = function (onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Упс. Ошибочка!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не пришел после' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      sendXhrRequest(onSuccess, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (onError, onSuccess, data) {
      sendXhrRequest(onSuccess, onError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    },
    onError: onErrory
  };

})();

