'use strict';
(function () {
  var PINS = 5;
  // Функция, которая создает пин на основе шаблона
  var createPin = function (promo, index) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    pinTemplate.querySelector('img').src = promo.author.avatar;
    pinTemplate.querySelector('img').style.pointerEvents = 'none';
    pinTemplate.style.left = promo.location.x + 'px';
    pinTemplate.style.top = promo.location.y + 'px';
    var pindElement = pinTemplate.cloneNode(true);
    pindElement.dataset.promoIndex = index;

    document.querySelector('.map').insertBefore(pindElement, document.querySelector('.map__filters-container'));
  };

  // Выводит все pin объявления на экран
  window.createPins = function (promosArr) {
    if (PINS > promosArr.length) {
      PINS = promosArr.length;
    }
    for (var i = 0; i < PINS; i++) {
      createPin(promosArr[i], i);
    }
    PINS = 5;
  };

  // Удаляет открытое объявления при клике на новый пин
  window.clearOldPromo = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map').removeChild(document.querySelector('.map__card'));
    }

  };

})();

