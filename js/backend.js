'use strict';

(function () {
  var TIMEOUT_TIME = 10000;
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';


  var onErrorResponse = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: pink; color: white;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var sendXhrRequest = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('У нас ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      sendXhrRequest(xhr, onSuccess, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();
      sendXhrRequest(xhr, onSuccess, onError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    },
    onErrorResponse: onErrorResponse
  };

})();

