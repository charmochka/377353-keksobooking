'use strict';

(function () {
  window.MIN_X = 300;
  window.MAX_X = 900;
  window.MIN_Y = 150;
  window.MAX_Y = 500;

  var getDataFromServer = function (response) {

    window.promos = response;
  };

  window.addEventListener('load', function (evt) {
    evt.preventDefault();
    window.backend.load(getDataFromServer, window.backend.onError);
  });
})();
