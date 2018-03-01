'use strict';

(function () {
  var TIMEOUT = 500;
  var lastTimeout;
  window.debounce = function (act) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(act, TIMEOUT);
  };

})();
