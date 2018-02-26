'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else if (xhr.status === 404) {
          onError('Ресурс не найден. Ошибка: ' + xhr.status + '' + xhr.statusText);
        } else {
          onError('Неизвестный статус. Ошибка: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 30000;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else if (xhr.status === 400) {
          onError('Ошибка: ' + xhr.status + '' + xhr.statusText);
        } else if (xhr.status === 500) {
          onError('Не удалось загрузить ресурс. Ошибка: ' + xhr.status + '' + xhr.statusText);
        } else {
          onError('Неизвестный статус. Ошибка: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 30000;
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    onError: function (errorMessage) {
      var errorPopup = document.createElement('div');
      var message = document.createElement('p');
      errorPopup.style.position = 'absolute';
      errorPopup.style.top = '0';
      errorPopup.style.left = '0';
      errorPopup.style.width = '100%';
      errorPopup.style.margin = '0 auto';
      errorPopup.style.backgroundColor = 'rgba(255,255,255,0.7)';
      errorPopup.style.color = 'rgb(249,79,0)';
      errorPopup.style.fontSize = '30px';
      errorPopup.style.padding = '50px';
      errorPopup.style.border = '1px solid rgb(249,79,0)';
      errorPopup.style.zIndex = '100';
      errorPopup.style.textAlign = 'center';
      message.textContent = errorMessage;
      errorPopup.appendChild(message);
      document.body.appendChild(errorPopup);

      setTimeout(function () {
        errorPopup.style.display = 'none';
      }, 5000);
    }
  };

})();
